import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getToken } from '../hooks/useTokenStorage';
import { baseURL } from '../api';


const ProtectedRoute = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    setLoading(true)
    fetch(`${baseURL}/auth/session`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'authorization': `Bearer ${getToken()}`,
      }
    })
    .then(res => res.json())
    .then(() => setLoading(false))
    .catch(err => {
      console.error(err)
      navigate('/auth/login', { replace: true })
    })
  }, [])
  
  if (loading) 
    return null;
  return <Outlet />
}

export default ProtectedRoute