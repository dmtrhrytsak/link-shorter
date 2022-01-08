import { useState, useContext, useCallback, useEffect } from 'react';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import LinksList from '../components/LinksList';
import Loader from '../components/Loader';

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/links', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });

      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <LinksList links={links} />
    </>
  );
};

export default LinksPage;
