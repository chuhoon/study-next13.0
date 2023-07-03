import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

/** https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr */
// dynaminc을 사용해 클라이언트 사이드 렌더링 사용
const NoSSR = dynamic(() => import('../../components/section1/NoSSR'), {
  ssr: false,
});

const Example: NextPage = () => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const delayInSeconds = 2;
    new Promise<number>((resolve) =>
      setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
    ).then((result) => setData(result));
  }, []);

  return (
    <main>
      <h1>Client-side data fetching</h1>
      <p>값: {data}</p>

      <h1>no SSR</h1>
      {/* window.innerWidth를 인식하지 못함.
      브라우저에서만 객체에게 접근 가능
      따라서 window, documnent를 useEffect 밖에서 사용했을 떄
      에러가 발생. */}
      <NoSSR />
    </main>
  );
};

export default Example;
