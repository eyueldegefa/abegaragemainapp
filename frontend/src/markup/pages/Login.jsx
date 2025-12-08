import React, { useState, useEffect } from 'react'
// import login form
import LoginForm from '../components/LoginForm/LoginForm'
import Loader from '../components/Loader/Loader';

function Login() {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading delay (1 second)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
      <>
      <div className='mt-5 pt-5'>
        <LoginForm />
      </div>
      </>
  )
}

export default Login