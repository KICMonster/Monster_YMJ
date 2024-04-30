import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Routes 추가
import Home from './page/Home';
import Login from './page/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route index element={<Home />} />   {/*홈페이지 라우팅 건들 ㄴ*/}
            <Route path='/Login' element={<Login />} />  {/* 로그인페이지 */}


          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
