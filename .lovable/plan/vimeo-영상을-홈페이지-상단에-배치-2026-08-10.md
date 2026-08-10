# Vimeo 영상을 홈페이지 상단에 배치

## 목표
Vimeo 영상(https://vimeo.com/1217004087, 비디오 ID: 1217004087)을 홈페이지(`/`) 네비게이션 바 바로 아래에 배치합니다.

## 구현

### `src/routes/index.tsx` 수정
- 기존 히어로 섹션 앞에 새로운 비디오 섹션 추가
- Vimeo iframe embed 사용: `https://player.vimeo.com/video/1217004087`
- `aspect-video`로 16:9 반응형 비디오 컨테이너
- 네비게이션 바(fixed) 공간 확보를 위해 상단 패딩(`pt-32 md:pt-36`) 적용
- 사이트 디자인 시스템에 맞춰 네이비 배경, 골드 톤 보더, 그림자 스타일 적용

### 변경 후 홈페이지 구조
```
네비게이션 바 (fixed, overlay)
├── Vimeo 영상 섹션 (신규)
├── 히어로 섹션 (기존)
└── LocationMap (기존)
```

## 기술 고려사항
- iframe에 `allow="autoplay; fullscreen; picture-in-picture"` 및 `allowFullScreen` 속성 추가
- `title` 속성으로 접근성 확보
- `absolute inset-0 size-full`로 iframe이 컨테이너에 꽉 차도록 설정
