import React from 'react';
import Home from '../page/Home';
import Redirection from '../components/Redirection';




const LoginRouter = () => {
  return [{
    path : 'auth/kakao/callback',
    element : <Redirection  />
  }
];
};

export default LoginRouter;