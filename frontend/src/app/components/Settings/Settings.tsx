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
    <div>
    
    </div>
  );
}

export default Settings;