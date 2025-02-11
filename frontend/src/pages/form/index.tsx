import { useState } from 'react';
import { useRouter } from 'next/router'
const Form: React.FC = () => {
  const [nsfw, setNsfw] = useState<boolean>(false);
  const [blurNsfw, setBlurNsfw] = useState<boolean>(false);
  const [blurButtonVisible, setBlurButtonVisible] = useState<boolean>(false)
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
    <div>
        <p id="display_name">You are currently logged in as: {username}</p>

        {/* Form for preferences */}
        <form id="preferences" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nsfw">Include NSFW content?</label>
            <input
              type="checkbox"
              id="nsfw"
              name="nsfw"
              checked={nsfw}
              onChange={handleNsfwBoxChange}
              onClick={() => setBlurButtonVisible(!blurButtonVisible)}
            />
          {blurButtonVisible && (
            <div>
              <label htmlFor='blur-nsfw'>Blur NSFW content?</label>
              <input
                type='checkbox'
                id='blur-nsfw'
                name='blur-nsfw'
                onChange={handleBlurBoxChange}
              />
            </div>
            )
          }

          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    
  );
};

export default Form;
