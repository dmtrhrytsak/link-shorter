import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';

const CreatePage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/links/generate',
          'POST',
          {
            from: link,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );

        navigate(`/details/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            id="link"
            type="text"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Enter the link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
