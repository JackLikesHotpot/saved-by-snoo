import styles from './Footer.module.css'
import Link from 'next/link'

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