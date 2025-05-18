import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuth() {
  const [auth, setAuth] = useState({ loading: true, authenticated: false, user: null });

  useEffect(() => {
    axios.get('http://localhost:3001/check-auth', { withCredentials: true })
      .then(res => {
        setAuth({ loading: false, authenticated: res.data.authenticated, user: res.data.user });
      })
      .catch(() => {
        setAuth({ loading: false, authenticated: false, user: null });
      });
  }, []);

  return auth;
}
