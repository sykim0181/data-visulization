## 소개
배포: [https://data-visulization.vercel.app/](https://data-visulization.vercel.app/)
### 기술 스택
  - React, Typescript
  - Recharts: 경량 차트 라이브러리로, 데이터를 직관적으로 시각화하고 커스터마이징에 적합
  - Material UI: 일관적인 디자인의 다양한 컴포넌트로 UI 구현
  - TanStack Table, TanStack Virtual
    - 대용량 데이터를 효율적으로 처리하기 위해 표에 가상 스크롤을 적용 
  - TanStack Query
    - 데이터 캐싱을 통해 네트워크 요청 최소화
  - react-intersection-observer: 페이지 아랫쪽에 위치한 컴포넌트는 화면에 보일 때 렌더링 -> 초기 로딩 속도 개선
### 주요 기능
  - 연간/월간 리포트 조회
     - 캠페인 별 성과, 앱 별 성과, 연간 성과를 차트와 표로 표현
     - 특정 연도 및 월을 선택해 데이터 조회 가능
