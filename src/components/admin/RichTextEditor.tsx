import { useCallback, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Bold, Italic, Heading2, List, ImagePlus, Quote, Minus } from "lucide-react";

const SIGNED_URL_TTL = 315_360_000; // ~10 years

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

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: "max-w-full h-auto my-4" } }),
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
      <EditorContent editor={editor} />
    </div>
  );
}
