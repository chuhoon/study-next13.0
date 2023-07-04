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

## getStaticProps()

```revalidate: 5``` 5초마다 서버가 request 받은지 확인함. 5초가 지난 후 이 함수를 실행해서 데이터가 바뀌었으면 새로운 값으로 다시 pre-rendering 함. revalidate가 5로 지정되어 있지만 data가 변경되지 않으면 pre-rendering을 하지 않음.

## Next routing

- 네트워크 확인
1. 초기 렌더링 방식은 SSR 방식으로 HTML을 받아오지만 Routing을 할 경우 CSR 방식으로 빠르게 이동함. (json 받아옴) json과 자바스크립트를 결합해 DOM에 결합함.
2. a 태그를 사용할 경우 html 태그로 받아옴 깜빡임이 있음.
3. Link가 보이지 않을 떄는 json 파일을 보여주지 않다가 Link가 보일 때 Lazy한 방식으로 해당 데이터의 json 파일을 가져옴. Next는 이런식으로 불필요한 네트워크 요청을 지양함.

- Next routing v12 과 v13 차이점
1. v12는 Link 속 a 태그, v13은 Link가 곧 a 태그.

- Next Link를 대체로 useRouter로 사용 가능하지만 prefetch해주지 않기 때문에 따로 설정해야함.
Ex Code)
```
useEffect(() => {
  router.prefetch('/section1/getStaticProps');
}, [router]);
```

- useRouter를 Next Link와 같이 사용 가능하지만 prefetch해주지 않기 때문에 따로 설정해야함. 따라서 next/link 사용을 권장.
- dynaminc을 사용해 클라이언트 사이드 렌더링 사용.
Ex Code)
```
const NoSSR = dynamic(() => import('../../components/section1/NoSSR'), {
  ssr: false,
});
```

- window.innerWidth를 인식하지 못함. 브라우저에서만 객체에게 접근 가능. 따라서 window, documnent를 useEffect 밖에서 사용했을 떄 에러가 발생.

## Next Image

- Next Image 장점
1. 기존 이미지와 다르게 webp 타입으로 받아온다. webp는 사이즈가 작고 Next는 용량 최적화를 도와줌.
2. width, height 설정이 가능함.
3. loading="lazy"를 따로 설정하지 않아도 자동으로 적용됨.
4. placeholder="blur"를 하면 사진이 다운로드 되는 동안 blur 이미지가 작동으로 적용. blur 이밎는 개발환경에서 나오지 않고 production 환경에서만 나옴.
5. 화면 새로고침 시에 문구가 layout shift가 일어나지 않고 제자리에 잘 유지됨 Next의 대표적인 최적화 기능임.

> 이렇게 Next에서 이미지 최적화가 가능한 이유는 이미지 파일을 static하게 import 해주기 때문인데 파일을 static하게 import하면 next는 빌드 타임에 이미 이미지의 정보, 높이, 너비를 알 수 있고 미리 최적화가 가능하기 때문임.

> 만약 외부 배포 링크를 이미지 src로 가져왔을 경우 이미지의 높이와 너비를 미리 알 방법이 없기 때문에 빌드타임에 미리 최적화 불가함. 따라서 높이와 너비를 미리 지정해줘야함. 이럴경우 문제가 너비와 높이를 알지 못할 경우 귀찮음이 생길 수 있는데 fill이라는 속성을 사용하면 됨. fill은 이미지의 사이즈를 부모에 의해 결정되게 함. 사진이 납짝해진다면 css objectfit: cover | contain 사용.

next.config.js
domain 보안 설정 가능 (해당 도메인의 이미지만 가져올 수 있게)
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lecture.vercel.app'],
  },
};

module.exports = nextConfig;
```

- Next Image v12
1. LegacyImage로 import해옴. v13과 차이점. image 태그 위에 span 태그들이 붙어 있는데 이미지 태그만 사용하는 v13과 달리 직관적이지 않음.
2. v13은 반응형으로 하고 싶을 때는 fill property를 사용했지만 v12에서는 layout을 fixed, fill, responsive 등 반드시 설정해야함. 이렇게 지정한 layout에 따라 resizing 했을 때 이미지가 어떻게 보이는지 결정됨.
3. v12 legacy image의 layout default 값은 intrinsic인데 기본적으로 원본 이미지 크기로 렌더링하고 화면이 더 작아졌을 때 그거에 맞춰 이미지도 resizing됨.
4. v12은 src를 string으로 주면 width랑 height를 반드시 지정해야함. 아니면 에러.

- Next Image Layout List
layout="fixed"는 고정된 사이즈로 이미지 보이게함.
layout="responsive" 반응형으로 화면 크기에 맞춰 이미지 크고 작아짐.
layout="fill" v13 fill과 유사함. (fill, objectfit cover).
