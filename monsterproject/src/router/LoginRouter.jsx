import Redirection from '../components/Redirection';

const LoginRouter = () => {
  return [{
    path : 'auth/kakao/callback',
    element : <Redirection  />
  }
];
};

export default LoginRouter;