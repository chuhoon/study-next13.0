import type { NextPage } from 'next';

interface Props {
  data: number;
}

const Example: NextPage<Props> = ({ data }) => {
  return (
    <main>
      <h1>getStaticProps Page</h1>
      <p>값: {data}</p>
    </main>
  );
};

export default Example;

export async function getStaticProps() {
  const delayInSeconds = 2;
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve(Math.random()), delayInSeconds * 1000)
  );

  return {
    props: { data },
    revalidate: 5 /** https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration */,
    // 5초마다 서버가 request 받은지 5초가 지난 후 이 함수를 실행해서 데이터가 바뀌었으면 새로운 값으로 다시 pre-rendering 하는 것
    // revalidate가 5로 지정되어 있지만 data가 변경되지 않으면 pre-rendering을 하지 않음.
  };
}
