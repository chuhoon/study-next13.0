import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  data: number;
}

const Example: NextPage<Props> = ({ data }) => {
  return (
    <main>
      <h1>getServerSideProps Page</h1>
      <p>값: {data}</p>
    </main>
  );
};

export default Example;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  /** https://web.dev/i18n/ko/stale-while-revalidate/ */
  // This value is considered fresh for five seconds (s-maxage=5).
  // If a request is repeated within the next 5 seconds, the previously
  // cached value will still be fresh.
  //
  // If the request is repeated before 5~15 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=10).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.

  // getStaticProps와 내용이 비슷함
  // SSG와 달리 새로고침을 할 때마다 pending 상태가 되고 2초 후 rending 됨.
  // SSR은 build time에 프리렌더링 되는 것이 아니고
  // request time, 즉 페이지에 들어올 떄마다 프리렌더링 되는 것
  // SSG에 비해 사용자 경험이 좋지 않고 반드시 request time마다 서버사이드에서 렌더링 해야되는 페이지에만 적용해야한다.
  // 예로 사용자의 인증정보에 따라 변하는 페이지, 페이지가 동적으로 변해야하지만 보안이 중요한 페이지에 사용하는 것에 적합.
  // getStaticProps와 같이 revalidate 하는 방법이 있는데 아래와 같은 방법

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=5, stale-while-revalidate=10'
  );
  // 2초간 pending 상태가 되고 5초 이내면 cache가 HIT로 캐시된 HTML을 보여주고, 5~10초 이내 하면 cache는 stale이고 뒤에서 새롭게 pre-rendering
  // 10초 후에는 새롭게 렌더링 처음 진입했을 때와 같게 2초간 pending 상태가 되고 값이 변함
  // 이것의 의미는 https://web.dev/i18n/ko/stale-while-revalidate/

  const delayInSeconds = 2;
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
  );

  return {
    props: { data },
  };
};
