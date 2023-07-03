import Link from 'next/link';

export default function Links() {
  return (
    <main>
      <h1>Links</h1>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      {/*<a href="/section1/getStaticProps">/getStaticProps</a>*/}
      {/* Link가 보이지 않을 떄는 json 파일을 보여주지 않다가 
      Link가 보일 때 Lazy한 방식으로 해당 데이터의 json 파일을 가져옴 */}
      <Link
        href="/section1/getStaticProps"
        style={{ color: 'red' }} // 작동하지 않음
        legacyBehavior // next v12 링크와 같이 작동 Next12에서는 Link가 a 태그를 대체하지 않음.
      >
        <a style={{ color: 'red' }}>/getStaticProps</a>
      </Link>
      {/** https://github.com/vercel/next.js/blob/canary/packages/next/client/link.tsx#L487 */}
      {/* 네트워크 확인 */}
    </main>
  );
}
