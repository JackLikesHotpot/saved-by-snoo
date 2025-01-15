import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import LoadingScreen from '../../app/components/Loading/LoadingScreen';

const Form: React.FC = () => {
  const [nsfw, setNsfw] = useState<boolean>(false);
  const router = useRouter();

  const { username } = router.query;
  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNsfw(event.target.checked);
  };

  // Handle form submission with AJAX (fetch)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission (which would reload the page)
    router.push(`http://localhost:3000/output?nsfw=${nsfw}&username=${username}`)
  }

  return (
    <div>
        <h1>Form</h1>

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
              onChange={handleCheckboxChange}
            />
          </div>

          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    
  );
};

export default Form;
