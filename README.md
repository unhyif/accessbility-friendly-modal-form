## 🚀 구현 완료된 접근성 모달폼 프로젝트

### 주요 구현 사항

이 프로젝트는 React 19와 TypeScript를 사용하여 완전한 접근성을 지원하는 모달폼 컴포넌트를 구현했습니다.

### 사용된 주요 라이브러리

- **overlay-kit**: 선언적 모달 관리를 위한 라이브러리
- **react-hook-form**: 폼 상태 관리 및 유효성 검증
- **tailwindcss**: 스타일링 (v4.1.13)
- **modern-normalize**: CSS 정규화
- **@biomejs/biome**: 코드 포맷팅 및 린팅

### 개발된 컴포넌트 구조

```
src/
├── ModalFormPage.tsx                    # 메인 페이지 컴포넌트
├── components/
│   ├── AccessbilityModal/               # 접근성 모달 및 관련 훅들
│   │   ├── AccessibilityModal.tsx       # 접근성 지원 모달 베이스 컴포넌트
│   │   ├── useKeyboardEffect.ts         # 키보드 이벤트 처리 훅
│   │   ├── useLockOutsideScrollEffect.ts # 배경 스크롤 방지 훅
│   │   └── useTriggerFocusEffect.ts     # 포커스 관리 훅
│   └── ApplicationFormModal/            # 신청폼 모달 관련 컴포넌트들
│       ├── ApplicationFormModal.tsx     # 신청폼 모달 컴포넌트
│       ├── ApplicationForm.tsx          # 폼 컴포넌트
│       ├── ErrorMessage.tsx             # 에러 메시지 컴포넌트
│       └── useApplicationForm.ts        # 폼 로직 훅
├── main.tsx                             # 앱 진입점
└── style.css                            # 글로벌 스타일
```

### 구현된 주요 기능

- ✅ 선언적 모달 호출 (`await ApplicationFormModal.open()`)
- ✅ 완전한 키보드 접근성 (Tab/Shift+Tab, ESC)
- ✅ 포커스 트래핑 및 자동 복원
- ✅ 스크린리더 지원 (ARIA 속성)
- ✅ 폼 유효성 검증 (이메일 필드)
- ✅ 배경 스크롤 방지
- ✅ 반응형 디자인 (Tailwind CSS)
- ✅ 모달 내부 스크롤 지원

---

## 📋 챌린지 개요

---

React와 TypeScript를 사용하여 접근성을 지원하는 모달폼 컴포넌트를 구현하는 챌린지입니다.

![접근성 모달폼](preview.gif)

## 🛠 기술 스택

---

코드 챌린지는 다음 필수 기술 스택을 포함하여 구현해야 해요.
UI 라이브러리나 다른 유틸리티 라이브러리 등 추가 기술 스택을 함께 사용하셔도 돼요.

- React
- TypeScript

## 🎯 챌린지 목표

- 프로젝트는 `npm run dev` || `yarn dev` || `pnpm dev`로 실행 가능해요.
- 코드의 구현은 `ModalFormPage.tsx` 파일에서부터 진행해주세요. 구조의 변경이 필요한 경우 자유롭게 진행해주셔도 돼요.

---

### 구현 요구사항

- **모달 닫기**
  - ESC 키 입력 또는 바깥 영역(overlay) 클릭 시 모달이 닫혀야 해요.
- **포커스 흐름**
  - 모달이 열리면 모달의 제목 요소로 포커스가 이동해야 하고, 닫히면 원래 버튼(트리거)으로 포커스가 돌아와야 해요.
  - Tab 키로 다음 요소로, Shift+Tab 키로 이전 요소로 이동할 수 있어야 해요.
- **폼 사용성**
  - 키보드만으로 입력하고 제출할 수 있어야 해요.
  - 제출 시 유효성 검증이 실패하면 오류 메시지가 표시되고, 스크린리더 사용자에게 즉시 전달되어야 해요
    - 검증을 위해 이메일 등 최소 한 개 이상의 필드에 유효성 검사가 포함되어야 해요.
- **UI/UX**
  - 모달이 열려 있을 때는 배경이 스크롤되지 않도록 막아야 해요.
  - 모달 안의 내용이 길어지면 내부에서 스크롤할 수 있어야 해요.
- **접근성**
  - `aria-modal`, `aria-labelledby`, `aria-describedby` 같은 기본 속성을 챙겨주세요.
  - 애니메이션은 `prefers-reduced-motion` 설정을 고려해 주면 더 좋아요.
- **선언적 호출**
  - 모달은 함수 호출을 통해 선언적으로 열 수 있어야 해요.
    - 예시로 `const result = await openFormModal()` 형태로 사용 가능해야 하며,
    - 제출 완료 시 입력값이 반환되고, 취소/닫기 시 `null`이 반환되어야 해요.

## ⏱ 예상 소요 시간

---

2시간
