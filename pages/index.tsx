import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';
import Header from '../components/common/Header';
import styles from '../styles/header.module.scss';
import MapSection from '../components/home/MapSection';
import { Store } from '../types/store';
import useStores from '../hooks/useStores';

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
  const { initializeStores } = useStores();

  // SWR 사용 방법 React-Query랑 비슷.
  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <Header
        rightElements={[
          <button
            onClick={() => {
              alert('복사!');
            }}
            className={styles.box}
            style={{ marginRight: 8 }}
            key="button"
          >
            <AiOutlineShareAlt size={20} />
          </button>,
          <Link href="/feedback" className={styles.box} key="link">
            <VscFeedback size={20} />
          </Link>,
        ]}
      />
      <main style={{ width: '100%', height: '100%' }}>
        <MapSection />
      </main>
    </Fragment>
  );
};
export default Home;
// swr은 Next.js를 만든 팀이 만든 상태관리 라이브러리.
// react-query에 비해 진입 장벽이 낮게 fetch 속도가 빠름.
// 코드가 경량화 되어 있음.
// 간단한 프로젝트에서는 SWR이 좋은 선택지일수도 있음.

// mock data 받아오는 함수 getStaticProps
export async function getStaticProps() {
  /** TODO: next api routes로 불러오기 */
  const stores = (await import('../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
    // 매장데이터는 빠르게 바뀌는 값이 아니기 때문에 1시간으로 설정
  };
}
