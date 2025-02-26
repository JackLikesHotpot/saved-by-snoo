import styles from './Form.module.css'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/router'


const Form: React.FC = () => {
  const [nsfw, setNsfw] = useState<boolean>(false);
  const [blurNsfw, setBlurNsfw] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
  const router = useRouter();

  const { username } = router.query;
  // Handle checkbox change
  const handleNsfwBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNsfw(event.target.checked);
  };
  
  const handleBlurBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlurNsfw(event.target.checked);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`http://localhost:3000/output?nsfw=${nsfw}&blur=${blurNsfw}&username=${username}`)
  }

  return (
    <div className={styles['container']}>
      <div className={styles['form']}>
        <p className={styles['display-name']}>You are currently logged in as: <Link href={`https://reddit.com/u/${username}`} target='_blank'>{username}</Link></p>

          <form className={styles['preferences']} onSubmit={handleSubmit}>
            <div className={styles['options']}>

              <div className={styles['option']}>
                <div className={styles['label']}>
                <label htmlFor="nsfw">Include NSFW content?</label></div>
                <div className={styles['box-div']}>
                <input
                  className={styles['checkbox']}
                  type="checkbox"
                  id="nsfw"
                  name="nsfw"
                  checked={nsfw}
                  onChange={handleNsfwBoxChange}
                  onClick={() => setButtonDisabled(!buttonDisabled)}
                /></div>
              </div>
              <div className={styles['option']}>
                <div className={styles['label']}>
                <label htmlFor='blur-nsfw'>Blur NSFW content?</label></div>
                <div className={styles['box-div']}>
                <input
                  className={styles['checkbox']}
                  type='checkbox'
                  id='blur-nsfw'
                  name='blur-nsfw'
                  onChange={handleBlurBoxChange}
                  disabled={!buttonDisabled}
                /></div>
              </div>
            </div>
            <div className={styles['button']}>
              <input className='w-full h-full' type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    
  );
};

export default Form;
