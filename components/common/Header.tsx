import React from 'react';
import Link from 'next/link';
import styles from '../../styles/header.module.scss';

interface Props {}

const HeaderComponent = ({}: Props) => {
  return (
    // scss를 설치하고 이런식으로 style을 가져올 수 있음.
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link href="/" className={styles.box}>
          {/* 1. public 폴더 바로 아래 
              2. img link로 가져오기*/}
          {/* 
            1. next를 사용하라고 경고가 뜨고 있음 이유는?
          */}
          <img
            src="https://lecture-1.vercel.app/inflearn.png"
            width={110}
            height={20}
            alt="인프런 로고"
          />
          <img src="/inflearn.png" width={110} height={20} alt="인프런 로고" />
        </Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
