import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from '../axiosInstance';

export default function useAuth() {
  const [user, setUser] = useState();

  useEffect(() => {
    axiosInstance('/tokens/refresh')
      .then(({ data }) => {
        setUser(data.user);
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setUser(null);
        setAccessToken('');
      });
  }, []);

  const signUpHandler = async (formData) => {
    try {
      const { data } = await axiosInstance.post('/auth/signup', formData);
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch (error) {
      alert(error.response.data.message || 'Oops!');
    }
  };

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      const { data } = await axiosInstance.post('/auth/login', formData);
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch (error) {
      alert(error.response.data.message || 'Oops!');
    }
  };

  const logoutHandler = async () => {
    await axiosInstance('/auth/logout');
    setUser(null);
    setAccessToken('');
  };

  return {
    user,
    loginHandler,
    signUpHandler,
    logoutHandler,
  };
}
