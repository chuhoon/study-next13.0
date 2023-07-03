# Next.js 13 학습

## SSR, CSR, SSG 특징

- SSR

1. 서버에서 완성된 HTML을 내려주기에 초기 용량이 작음.
2. 화면 깜빡임이 있고 SEO에 좋음. (완성된 HTML로 크롤링을 하기 좋기 때문)

- CSR(CRA creat-react-app)

1. 처음 `<div id="root" />` 해당 태그 아래로는 JavaScript로 DOM을 그림.
2. 따라서 화면 깜빡임 없음, 초기 용량이 큼.
3. js 캐시 가능, 보안에 취약.
4. SSR에 비해 SEO에 제약이 있음. (DOM을 JavaScript로 그리기 때문에)

- SSG (Static Site Generation)

1. pre-rendering: Static한 HTML을 build time에 미리 만들어 둠 (SSR은 request time)
2. SSG는 미리 정적인 HTML을 만들어두기 떄문에 서버 부하가 없음, HTML 캐시 가능, 완성된 HTML이기에 SEO에 좋음.
3. 내용이 변하지 않는 정적인 사이트에 사용 적합함.

## Next.js를 사용하는 이유

1. SSR, CSR, SSG의 장점만 고려해 페이지를 자유롭게 routing/rendering 할 수 있도록 API를 제공하기 위해.
2. SSR/SSG의 작은 용량과 보안을 적용.
3. CSR의 빠른 페이지 이동 속도, 깜빡임 없음을 적용
4. 이런한 장점들을 뽑아 적용하는 것이 Next.js의 방향성.

## Next pre-rendering이란?

- CRA에서와 Next.js에서 JavaScript를 disabled 했을 때 차이

1. CRA에서는 <div id="root" /> 태그 속에 자바스크립트가 들어가지 못해 빈 화면을 출력함.
2. Next.js에서는 자바스크립트는 없지만 이미 완성된 HTML이기에 사이트를 문제 없이 출력해 사용 가능함.

둘의 가장 직관적인 차이점은 pre-rendering임.
