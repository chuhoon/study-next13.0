import styles from '../../styles/detail.module.scss';
import { IoIosArrowUp } from 'react-icons/io';

const DetailSection = () => {
  return (
    <div className={styles.detailSection}>
      <div className={styles.header}>
        <button className={styles.arrowButton} disabled>
          <IoIosArrowUp size={20} color="#666666" />
        </button>
        <p className={styles.title}>매장을 선택해주세요</p>
      </div>
    </div>
  );
};
export default DetailSection;
