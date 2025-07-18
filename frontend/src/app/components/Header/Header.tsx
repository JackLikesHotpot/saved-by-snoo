import styles from './Header.module.css'
import Image from 'next/image';
import refresh from '../../../../public/refresh.svg'
import settings from '../../../../public/settings.svg'

interface HeaderProps {
  length: number;
  onSearchChange: (value: string) => void;
  onSettingsClick: (value: any) => void;  
}

const Header: React.FC<HeaderProps> = ({ length, onSearchChange, onSettingsClick }) => {

  return (
    <div className={styles['header']}>
      <div className={styles['options']}>
        <input 
          type="text" 
          className={styles['search']} 
          placeholder={`Search ${length} saved posts`}
          onChange={(e) => onSearchChange(e.target.value)}/>
        <div className={styles['header-buttons']}>
          <button 
            className={styles['button']} 
            aria-label='Refresh'>
            <Image src={refresh} alt='refresh icon'/></button>
          <button 
            className={styles['button']} 
            aria-label='Settings'
            onClick={onSettingsClick}>
            <Image src={settings} alt='settings icon'/></button>
        </div>
      </div>
    </div>
  );
};

export default Header;