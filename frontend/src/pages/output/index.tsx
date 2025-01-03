import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'
import LoadingScreen from '../../app/components/Loading/LoadingScreen';


const Output: React.FC = () => {
  const router = useRouter();
  const { nsfw } = router.query;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/saved?nsfw=${nsfw}`);
          console.log(response.data)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching auth URL:', error);
        }
      }

    fetchData();
    }, []);

  return (
    <>
    <div>
      {loading ? <LoadingScreen/> : 
      
      <div>
        <p>neat.</p>
      </div>
      }
    </div></>
  )
};

export default Output;
