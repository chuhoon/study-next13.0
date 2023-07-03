import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Links() {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/section1/getStaticProps');
    // useRouter를 Next Link와 같이 사용 가능하지만 prefetch해주지 않기 때문에 따로 설정해야함.
    // 따라서 next/link 사용을 권장.
  }, [router]);

  return (
    <main>
      <h1>Links</h1>
      <button
        onClick={() => {
          router.push('/section1/getStaticProps');
        }}
      >
        /getStaticProps
      </button>

      {/*<div style={{ height: '200vh' }} />*/}

      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      {/*<a href="/section1/getStaticProps">/getStaticProps</a>*/}

      {/*<Link href="/section1/getStaticProps">/getStaticProps</Link>*/}
      {/** https://github.com/vercel/next.js/blob/canary/packages/next/client/link.tsx#L487 */}
    </main>
  );
}
