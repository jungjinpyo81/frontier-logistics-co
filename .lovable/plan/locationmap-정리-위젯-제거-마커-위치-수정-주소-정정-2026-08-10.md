# LocationMap 정리: 위젯 제거, 마커 위치 수정, 주소 정정

## 현재 상태
- `src/components/site/LocationMap.tsx`는 좌측 지도 iframe + 우측 회사 정보 위젯(회사명·주소·연락처·버튼 2개) 구성
- 우측 위젯 내용이 `Footer.tsx`(주소·사업자번호·전화·이메일·카카오톡)과 중복됨
- 지도 임베드가 `q=경기도 고양시 덕양구 청초로 10`(주소만)으로 요청 → Google이 표시하는 마커가 지도 하단부에 치우쳐 보임
- 표시 주소 문자열에 "A1-418호"로 되어 있음

## 변경 사항

### 1. 우측 위젯 제거 (Footer와의 중복 해소)
- `LocationMap.tsx`에서 우측 정보 카드(회사명·주소·연락처·"Google 지도에서 보기"/"길찾기" 버튼) 블록 전체 삭제
- 지도 iframe을 전체 폭(full-width)으로 확장: `lg:grid-cols-[1.6fr_1fr]` 그리드를 단일 컬럼으로 변경
- 섹션 제목("오시는 길"/"Visit Our Office")은 유지하되, 버튼 2개("Google 지도에서 보기", "길찾기")는 지도 하단에 가로형으로 배치하여 기능 보존

### 2. 주소 정정
- 표시 주소 한국어: `경기도 고양시 덕양구 청초로 10, A1-418` (기존 "A1-418호" → "A1-418")
- 영어 주소: `10 Cheongcho-ro, Deogyang-gu, Goyang-si, Gyeonggi-do, Korea (A1-418)`
- Footer.tsx의 주소도 동일하게 "A1-418"로 맞춤

### 3. 마커 하단 치우침 수정
- 지도 임베드 URL을 좌표 기반으로 변경해 마커를 중앙에 표시
- 청초로 좌표(위도 37.5793, 경도 126.8644)를 `q`에 좌표로 전달하고 `&center=37.5793,126.8644&z=16` 추가
- `viewUrl`/`directionsUrl`은 기존처럼 주소 기반 검색/길찾기 유지
- 영문 환경에서는 `hl=en` 적용

## 기술 메모
- iframe `loading="lazy"` 유지, 반응형 높이 유지
- `Reveal` 페이드업 애니메이션 유지
- 변경 범위: `src/components/site/LocationMap.tsx`, `src/components/site/Footer.tsx` (주소 정정만)
