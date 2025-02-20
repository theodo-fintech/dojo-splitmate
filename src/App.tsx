import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import { Login } from './components/login/Login';
import { Main } from './components/Main';
import { Spinner }  from './components/Spinner';

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded: { email: string } = jwtDecode(token);
        setAuthenticatedUser(decoded.email);
      } catch (error) {
        console.error('Invalid token', error);
        localStorage.removeItem('access_token');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (email: string) => {
    setAuthenticatedUser(email);
  };

  const handleLogout = () => {
    // setAuthenticatedUser(null);
    localStorage.removeItem('refresh_token');
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : authenticatedUser ? (
        <Main userEmail={authenticatedUser} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
