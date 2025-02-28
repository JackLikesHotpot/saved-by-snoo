import styles from './Header.module.css'
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import arrow from '../../../../public/back-arrow.svg'

const Footer: React.FC = ({ }) => {

  return (
    <div className={styles['footer']}>
      <div className={styles['home']}><Link href={'/'}>Home</Link></div>
      <div className={styles['source']}><Link href={'https://github.com/JackLikesHotpot/saved-by-snoo'}>Source Code</Link></div>
      <div className={styles['contact']}><Link href={'https://github.com/JackLikesHotpot'}>Contact Me</Link></div>
    </div>
  );
};

export default Footer;