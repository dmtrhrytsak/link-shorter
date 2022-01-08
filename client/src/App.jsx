import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';
import NavBar from './components/NavBar';
import Loader from './components/Loader';

import 'materialize-css';

const App = () => {
  const { token, userId, login, logout } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  // if (!userId) {
  //   return <Loader />;
  // }

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      {isAuthenticated && <NavBar />}
      <div className="container">{routes}</div>
    </AuthContext.Provider>
  );
};

export default App;
