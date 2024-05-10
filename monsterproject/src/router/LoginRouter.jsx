import Home from '../page/Home';

const LoginRouter = () => {
  return [{
    path : 'auth/kakao/callback',
    element : <Home />
    
  }];
};

export default LoginRouter;