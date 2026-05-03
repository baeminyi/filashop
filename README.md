# FILA - 공식 온라인 스토어 클론

FILA - 공식 쇼핑몰을 참고하여 제작한 프론트엔드 포트폴리오 프로젝트입니다.

## 주요 기능

- 상품 목록 (카테고리 필터, 정렬, 검색)
- 상품 상세 페이지 (컬러 선택, 수량 조절)
- 장바구니 (추가, 삭제, 수량 변경, 총액 계산)
- 로그인 / 회원가입 (간편 로그인 UI 포함)
- 히어로 배너 슬라이더 (자동 재생, 수동 조작)
- 위시리스트 (좋아요)
- 반응형 디자인 (모바일, 태블릿, 데스크톱)

## 기술 스택

- **Framework** : React 18 + TypeScript
- **Build Tool** : Vite
- **Styling** : Tailwind CSS v4
- **Routing** : React Router v6
- **State** : React useState (장바구니, 위시리스트, 필터)

## 실행 방법

```bash
# 저장소 클론
git clone https://github.com/baeminyi/filashop.git

# 폴더 이동
cd fila-shop

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:5173 접속

## 페이지 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 메인 | / | 배너, 상품 목록, 카테고리 필터 |
| 상품 상세 | /product/:id | 상품 정보, 컬러 선택, 장바구니 담기 |
| 로그인 | /login | 로그인/회원가입 탭 전환 |

## 프로젝트 구조

```
src/
├── components/
│   ├── Header.tsx
│   ├── HeroBanner.tsx
│   ├── ProductCard.tsx
│   ├── CartDrawer.tsx
│   └── Footer.tsx
├── pages/
│   ├── ProductDetail.tsx
│   └── Login.tsx
├── data/
│   └── products.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 면책 조항

본 프로젝트는 **학습 및 포트폴리오 목적**으로 제작되었습니다.
상품 이미지는 FILA Korea 공식 사이트에서 참고하였으며, 상업적 용도로 사용되지 않습니다.
실제 FILA Korea와는 관련이 없습니다.
