# 🔮 운세TMI | LLM 기반 맞춤 운세 생성 웹앱

[👉 데모 바로가기](https://my-fortune-app-five.vercel.app/ko)  

---

## 🖼️ 프로젝트 미리보기

![운세TMI Screenshot](https://github.com/user-attachments/assets/68b70b74-2272-4f88-bdbc-77f147a65fb2)

---

## 📌 프로젝트 소개

**운세TMI**는 이름, 성별, 생년월일, 태어난 시간 등의 정보를 기반으로  
**Groq LLM**이 생성한 오늘의 운세를 실시간으로 제공하는 **AI 기반 운세 서비스**입니다.  
Next.js, FastAPI, LangChain, Zustand, Tailwind 등 최신 기술을 사용해 구현했습니다.

---

## ✨ 주요 기능 요약

| 기능           | 설명 |
|----------------|------|
| 🧙‍♂️ 운세 생성   | 사용자 입력 기반 LLM 운세 응답 생성 |
| 🌐 다국어 지원   | 한국어 / 영어 (i18n 구성) |
| 🧠 입력값 번역   | 이름 제외 전체 입력값을 영어로 변환하여 백엔드 전송 |
| 🔁 실시간 응답   | Groq 기반 LLM 응답 처리 |
| 📣 사용자 피드백 | Toast 알림 및 로딩 UX 적용 |
| 📱 반응형 UI    | Tailwind CSS 기반 반응형 인터페이스 |
| 🚀 자동 배포     | GitHub Actions + Vercel + Railway 활용 |

---

## 🧩 기술 스택

### 🔷 프론트엔드
- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Zustand
- Next-Intl
- Vercel

### 🔶 백엔드
- FastAPI
- LangChain
- Groq (ChatGroq)
- Pydantic
- Railway

### ⚙️ DevOps
- GitHub Actions (CI/CD)
- Vercel (정적 사이트 배포)
- Railway (서버 배포)

---

## 💡 프로젝트 의의

### 🔥 LLM 실무 활용
- ChatGroq 모델을 직접 활용하여 LangChain과 연동
- 프롬프트 설계부터 응답 최적화까지 전체 흐름 경험

### 🌍 다국어 기반 구조 설계
- Next-Intl로 완성도 높은 i18n 처리 구현
- 사용자 언어 감지 → 자동 라우팅 (`middleware.ts`)

### ⚙️ 클라이언트 UX 개선
- Toast 알림, 로딩 스피너 등 사용자 경험 강화
- 오류 응답 및 상태 관리 최적화

### 🚀 풀스택 + 자동화 파이프라인 구성
- 프론트/백 통합 구조 기획
- GitHub Actions + Railway + Vercel CI/CD 구성 완성

---

## 🔗 배포 링크

| 구분       | 링크 |
|------------|------|
| 🌐 웹사이트 | [https://my-fortune-app-five.vercel.app/ko](https://my-fortune-app-five.vercel.app/ko) |
| 📦 GitHub  | [https://github.com/dahun428-fx/my_fortune_app](https://github.com/dahun428-fx/my_fortune_app) |

---

## 👨‍💻 개발자 정보

| 이름   | GitHub 프로필 |
|--------|----------------|
| 정다훈 | [dahun428-fx](https://github.com/dahun428-fx) |
