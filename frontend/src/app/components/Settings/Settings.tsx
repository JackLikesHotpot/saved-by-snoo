import { useEffect } from 'react'
import Image from 'next/image';
import refresh from '../../../../public/refresh.svg'
import settings from '../../../../public/settings.svg'

interface SettingsProps {
  onClose?: () => void;
  onSettingsClick: () => void;  
}

const Settings: React.FC<SettingsProps> = ({ onClose, onSettingsClick }) => {

return (
    <div
      className="fixed inset-0 bg-white z-50"
      onClick={onClose}>
      <button 
        className='w-8 m-1 mx-2 self-start' 
        aria-label='Settings'
        onClick={onSettingsClick}>
        <Image src={settings} alt='settings icon'/>
      </button>
    </div>
  );
}

export default Settings;