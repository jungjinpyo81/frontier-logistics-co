import { useCallback, useRef, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyle, Color, FontSize } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { Node, mergeAttributes } from "@tiptap/core";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Bold,
  Italic,
  Heading2,
  List,
  ImagePlus,
  Quote,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Link2Off,
  Youtube,
  Palette,
} from "lucide-react";

const SIGNED_URL_TTL = 315_360_000; // ~10 years

const COLORS = [
  "#0b1f3a",
  "#334155",
  "#64748b",
  "#c9a227",
  "#b91c1c",
  "#ea580c",
  "#047857",
  "#1d4ed8",
  "#7e22ce",
  "#111111",
];

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "32px", "40px"];

/** Responsive video embed node (YouTube / Vimeo / any iframe URL). */
const VideoEmbed = Node.create({
  name: "videoEmbed",
  group: "block",
  atom: true,
  draggable: true,
  addAttributes() {
    return { src: { default: null } };
  },
  parseHTML() {
    return [{ tag: "div[data-video-embed]" }];
  },
  renderHTML({ HTMLAttributes }) {
    const { src, ...rest } = HTMLAttributes;
    return [
      "div",
      mergeAttributes(rest, { "data-video-embed": "", class: "video-embed" }),
      [
        "iframe",
        {
          src,
          frameborder: "0",
          allow: "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media",
          allowfullscreen: "true",
        },
      ],
    ];
  },
  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("data-video-embed", "");
      wrapper.className = "video-embed";
      const iframe = document.createElement("iframe");
      iframe.src = String(node.attrs.src ?? "");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "true");
      wrapper.appendChild(iframe);
      return { dom: wrapper };
    };
  },
});

/** Image with width + alignment support. */
const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (el) => el.getAttribute("width") || el.style.width || null,
        renderHTML: (attrs) =>
          attrs.width ? { style: `width:${attrs.width}`, width: attrs.width } : {},
      },
      align: {
        default: "center",
        parseHTML: (el) => el.getAttribute("data-align") || "center",
        renderHTML: (attrs) => ({ "data-align": attrs.align ?? "center" }),
      },
    };
  },
});

export function toEmbedUrl(raw: string): string | null {
  const url = raw.trim();
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  if (/^https:\/\/(www\.youtube\.com\/embed\/|player\.vimeo\.com\/video\/)/.test(url)) return url;
  return null;
}

export async function uploadInlineImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("이미지 파일만 업로드할 수 있습니다");
  if (file.size > 10 * 1024 * 1024) throw new Error("10MB 이하 이미지를 올려주세요");

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("article-images").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from("article-images")
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (signErr || !data) throw signErr ?? new Error("URL 생성 실패");
  return data.signedUrl;
}

export function firstImageUrl(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showColors, setShowColors] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: "noopener noreferrer nofollow" },
        },
      }),
      TextStyle,
      Color,
      FontSize,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      ResizableImage.configure({ HTMLAttributes: { class: "editor-image" } }),
      VideoEmbed,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose-editor min-h-[420px] w-full max-w-none border border-border px-4 py-3 text-base leading-relaxed focus:outline-none focus:border-navy",
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((f) =>
          f.type.startsWith("image/")
        );
        if (!files.length) return false;
        event.preventDefault();
        void insertFiles(files);
        return true;
      },
      handleDrop: (_view, event) => {
        const files = Array.from((event as DragEvent).dataTransfer?.files ?? []).filter((f) =>
          f.type.startsWith("image/")
        );
        if (!files.length) return false;
        event.preventDefault();
        void insertFiles(files);
        return true;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const insertFiles = useCallback(
    async (files: File[]) => {
      if (!editor) return;
      setUploading(true);
      try {
        for (const file of files) {
          const url = await uploadInlineImage(file);
          editor.chain().focus().setImage({ src: url }).createParagraphNear().run();
        }
        toast.success("이미지가 삽입되었습니다");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "업로드 실패");
      } finally {
        setUploading(false);
      }
    },
    [editor]
  );

  if (!editor) return <div className="min-h-[420px] border border-border" />;

  const btn = (active: boolean) =>
    `p-2 border text-navy transition-colors ${
      active ? "bg-navy text-white border-navy" : "border-border hover:bg-mist"
    }`;

  const imageSelected = editor.isActive("image");

  function setLink() {
    const prev = editor!.getAttributes("link").href as string | undefined;
    const input = window.prompt("링크 URL을 입력하세요", prev ?? "https://");
    if (input === null) return;
    const href = input.trim();
    if (!href) {
      editor!.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    if (!/^https?:\/\//i.test(href) && !href.startsWith("mailto:")) {
      toast.error("http(s):// 로 시작하는 URL을 입력하세요");
      return;
    }
    const newTab = window.confirm("새 탭에서 열까요?");
    editor!
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href, target: newTab ? "_blank" : null })
      .run();
  }

  function insertVideo() {
    const input = window.prompt("YouTube 또는 Vimeo URL을 입력하세요", "https://");
    if (!input) return;
    const src = toEmbedUrl(input);
    if (!src) return toast.error("유효한 YouTube / Vimeo URL이 아닙니다");
    editor!.chain().focus().insertContent({ type: "videoEmbed", attrs: { src } }).run();
  }

  function updateImage(attrs: Record<string, unknown>) {
    editor!.chain().focus().updateAttributes("image", attrs).run();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 border border-border border-b-0 bg-mist/40 p-2">
        <button type="button" title="Bold" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={15} />
        </button>
        <button type="button" title="Italic" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={15} />
        </button>
        <button type="button" title="Heading" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 size={15} />
        </button>
        <button type="button" title="Bullet list" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={15} />
        </button>
        <button type="button" title="Quote" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={15} />
        </button>
        <button type="button" title="Divider" className={btn(false)} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={15} />
        </button>

        <span className="mx-1 h-5 w-px bg-border" />

        {/* Font size */}
        <select
          title="Font size"
          value={(editor.getAttributes("textStyle").fontSize as string) || ""}
          onChange={(e) => {
            const v = e.target.value;
            if (!v) editor.chain().focus().unsetFontSize().run();
            else editor.chain().focus().setFontSize(v).run();
          }}
          className="border border-border bg-white px-2 py-1.5 text-xs text-navy focus:outline-none"
        >
          <option value="">기본 크기</option>
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Text color */}
        <div className="relative">
          <button
            type="button"
            title="Text color"
            className={btn(showColors)}
            onClick={() => setShowColors((s) => !s)}
          >
            <Palette size={15} />
          </button>
          {showColors && (
            <div className="absolute z-20 mt-1 flex w-44 flex-wrap gap-1 border border-border bg-white p-2 shadow-lg">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={c}
                  onClick={() => {
                    editor.chain().focus().setColor(c).run();
                    setShowColors(false);
                  }}
                  className="h-5 w-5 border border-border"
                  style={{ backgroundColor: c }}
                />
              ))}
              <input
                type="color"
                className="h-5 w-10 border border-border"
                onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              />
              <button
                type="button"
                className="w-full text-[10px] text-muted-foreground hover:text-navy"
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setShowColors(false);
                }}
              >
                색상 초기화
              </button>
            </div>
          )}
        </div>

        <span className="mx-1 h-5 w-px bg-border" />

        {/* Alignment */}
        <button type="button" title="Align left" className={btn(editor.isActive({ textAlign: "left" }))} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft size={15} />
        </button>
        <button type="button" title="Align center" className={btn(editor.isActive({ textAlign: "center" }))} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter size={15} />
        </button>
        <button type="button" title="Align right" className={btn(editor.isActive({ textAlign: "right" }))} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight size={15} />
        </button>
        <button type="button" title="Justify" className={btn(editor.isActive({ textAlign: "justify" }))} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
          <AlignJustify size={15} />
        </button>

        <span className="mx-1 h-5 w-px bg-border" />

        <button type="button" title="Insert link" className={btn(editor.isActive("link"))} onClick={setLink}>
          <Link2 size={15} />
        </button>
        <button type="button" title="Remove link" className={btn(false)} onClick={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}>
          <Link2Off size={15} />
        </button>
        <button type="button" title="Embed video" className={btn(false)} onClick={insertVideo}>
          <Youtube size={15} />
        </button>
        <button
          type="button"
          title="Insert image"
          className={btn(false)}
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          <ImagePlus size={15} />
        </button>
        <span className="ml-auto text-[10px] text-muted-foreground">
          {uploading ? "이미지 업로드 중..." : "드래그 & 드롭 또는 붙여넣기로 이미지 삽입"}
        </span>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length) void insertFiles(files);
            e.target.value = "";
          }}
        />
      </div>

      {imageSelected && <ImageToolbar editor={editor} onUpdate={updateImage} />}

      <EditorContent editor={editor} />
    </div>
  );
}

function ImageToolbar({
  editor,
  onUpdate,
}: {
  editor: Editor;
  onUpdate: (attrs: Record<string, unknown>) => void;
}) {
  const attrs = editor.getAttributes("image");
  const width = (attrs.width as string) || "100%";
  const align = (attrs.align as string) || "center";
  const pct = parseInt(String(width), 10) || 100;

  return (
    <div className="flex flex-wrap items-center gap-3 border border-border border-b-0 bg-navy/5 px-3 py-2 text-xs text-navy">
      <span className="uppercase tracking-wider text-[10px] text-muted-foreground">이미지</span>
      <label className="flex items-center gap-2">
        크기
        <input
          type="range"
          min={20}
          max={100}
          step={5}
          value={pct}
          onChange={(e) => onUpdate({ width: `${e.target.value}%` })}
        />
        <span className="w-10 tabular-nums">{pct}%</span>
      </label>
      <div className="flex items-center gap-1">
        {(["left", "center", "right"] as const).map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => onUpdate({ align: a })}
            className={`p-1.5 border ${align === a ? "bg-navy text-white border-navy" : "border-border bg-white hover:bg-mist"}`}
            title={a}
          >
            {a === "left" ? <AlignLeft size={13} /> : a === "center" ? <AlignCenter size={13} /> : <AlignRight size={13} />}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="ml-auto text-[11px] text-muted-foreground hover:text-navy"
        onClick={() => onUpdate({ width: null, align: "center" })}
      >
        원래 크기
      </button>
    </div>
  );
}
