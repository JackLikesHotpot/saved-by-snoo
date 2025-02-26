import styles from './Header.module.css'
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import arrow from '../../../../public/back-arrow.svg'

const Sortbar: React.FC = ({ }) => {

  const searchParams = useSearchParams();
  const username = searchParams?.get('username')

  return (
    <div className={styles['header']}>
      <div className={styles['back-button']}>
      <div><Link href={`../form?username=${username}`}><Image src={arrow} alt='back' width='25'></Image></Link></div></div>
      <div className={styles['project-name']}>Saved By Snoo</div>
      <div className={styles['username']}><Link href={`https://reddit.com/user/${username}`} target='_blank'>{username}</Link></div>
    </div>
  );
};

export default Sortbar;