import { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import LinkCard from '../components/LinkCard';
import Loader from '../components/Loader';

const DetailsPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);

  const { linkId } = useParams();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/links/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{link && <LinkCard link={link} />}</>;
};

export default DetailsPage;
