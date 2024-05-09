import './Login.css'
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Redirection from '../components/Redirection';



//////////////////js//////////////////////
// const userInfo = {
//     loginId,
//     name,
//     password,
//     birthday ,
// }

// const userA={
//     loginId,
//     password,
// }

////////////////컴포넌트///////////////////
//로그인 페이지 해더  회원가입/로그인
function LoginHeader({ setisChange }) {

    return (
        <header>
            <div className='LoginHeader'>
                <nav style={{ marginRight: '0px' }}
                    onClick={() => {
                        setisChange(false);
                    }}
                >
                    {/* 로그인 */}
                    <button className='no__btn'>로그인</button>
                </nav>
                <nav style={{ marginLeft: '0px' }}
                    onClick={() => {
                        setisChange(true);
                    }}
                >
                    {/* 회원가입 */}
                    <button className='no__btn' >회원가입</button>
                </nav>
            </div>
        </header>
    );
}
//로그인 페이지 메인 
function LoginMain({ isChange }) {
    if (isChange) {
        return (
            <main>
                <form action='/login' method='post' style={{ width: '100%' }}>
                    <div className="LoginMainBody">
                        <input type="text" placeholder={"ID"} id='email' autoComplete="username" />
                        <input type="text" placeholder="사용자 이름" id="username" />
                        <input type="password" placeholder="비밀번호 6자리 이상입력" id='pass' autoComplete="new-password" />
                        <input type="password" placeholder="재확인 비밀번호 6자리 이상입력" id='pass2' autoComplete="new-password" />
                        <select id='date__yy'>
                            <option value="2024">2024 년</option>
                            <option value="2023">2023 년</option>
                            <option value="2022">2022 년</option>
                        </select>
                        <select id='date__mm'>
                            <option value="1">1 월</option>
                            <option value="2">2 월</option>
                            <option value="3">3 월</option>
                        </select>
                        <select id='date__dd'>
                            <option value="1">1 일</option>
                            <option value="2">2 일</option>
                            <option value="3">3 일</option>
                        </select>

                    </div>

                    {/* 정보 수집권한 체크란 */}
                    <div className='Lcheckbox'>
                        <input type='checkbox' />개인정보수집·이용약관 동의 <Link>보기</Link>
                    </div>

                    <button type='submit' className='origin__btn' >회원가입</button>
                </form>
            </main>
        );
    } else {
        return (
            <main>
                <form style={{ width: '100%' }}>
                    <div className="LoginMainBody">
                        <input type="text" placeholder={"ID"} id='email' autoComplete="username" />
                        <input type="password" placeholder={"PASSWORD"} id='pass' autoComplete="new-password" />
                    </div>
                    <button type='submit' className='origin__btn' style={{ marginTop: '20px' }}>로그인</button>
                </form>
            </main>
        );
    }
}


//로그인 페이지 푸터    소셜로그인 
function LoginFooter() {
    const [accessToken, setAccessToken] = useState(null);
    const navigate = useNavigate();
    
    const [REST_API_KEY, setREST_API_KEY]=useState('');
    const [client, setclient]= useState('');    
    const [STATE_STRING, setSTATE_STRING]=useState('a32cbdec-aff6-4376-b0a2-73b84a6a4214');

    const REDIRECT_URI = 'https://localhost:5174/login/auth/kakao/callback';

    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const GOOGLE_AUTH_URI = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=${REST_API_KEY}&scope=openid%20profile%20email&redirect_uri=${REDIRECT_URI}`;
    const NAVER_AUTH_URI = `https://nid.naver.com/oauth2.0/authorize?response_type=token&state=${STATE_STRING}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

    // 네이버 로그인 함수
    const loginWithNaver = () => {
        setREST_API_KEY(import.meta.env.VITE_NAVER_API_KEY);
        setclient(import.meta.env.VITE_NAVER_SECRET);

        var naver_id_login = new naver_id_login(REST_API_KEY, "https://localhost:9092/login/oauth2/code/naver");
        var state = naver_id_login.getUniqState();
        naver_id_login.setButton("white", 2,40);
        naver_id_login.setDomain("https://localhost:9092");
        naver_id_login.setState(state);
        naver_id_login.setPopup();
        naver_id_login.init_naver_id_login();
        setSTATE_STRING(state)

    };

    // 카카오 로그인 함수
    const loginWithKakao = () => {
        setREST_API_KEY(import.meta.env.VITE_KAKAO_API_KEY);
        setclient(import.meta.env.VITE_KAKAO_SECRET);
    
    };

    // 구글 로그인 함수
    const loginWithGoogle = () => {
        setREST_API_KEY(import.meta.env.VITE_GOOGLE_API_KEY);
        setclient(import.meta.env.VITE_GOOGLE_SECRET);
    };

    useEffect(() => {
        const getCodeFromUrl = () => {
          const urlParams = new URLSearchParams(window.location.search);
          return urlParams.get('code');
        };
    
        const code = getCodeFromUrl();
    
        if (code) {
          // 인가 코드로 Access Token 요청     
          getAccessToken(code);
        }
      }, []);
    
      const getAccessToken = async (authCode) => {
        const access_token_uri = import.meta.env.VITE_ACCESS_TOKEN_URI;
        const body = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: REST_API_KEY,
          client_secret: client,
          redirect_uri: REDIRECT_URI,
          code: authCode
    
        });
    
        try {
          const response = await axios.post(access_token_uri, body, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          });
    
          const accessToken = response.data.access_token;
          setAccessToken(accessToken);
          console.log('발급된 Access Token:', accessToken);
    
          // 사용자 정보 요청
          getUserInfo(accessToken);
        } catch (error) {
          console.error('Access Token 요청 중 오류 발생:', error);
        }
      };
    
      const getUserInfo = async (accessToken) => {
        const user_info_uri = import.meta.env.VITE_USER_INFO_URI;
    
        try {
          const userInfoResponse = await axios.get(user_info_uri, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
    
          const userInfo = userInfoResponse.data;
          console.log('받아온 유저 정보:', userInfo);
    
          // 사용자 정보와 액세스 토큰을 백엔드로 전송
          sendUserInfoToBackend(userInfo, accessToken);
        } catch (error) {
          console.error('사용자 정보 요청 중 오류 발생:', error);
        }
      };
    
      const sendUserInfoToBackend = async (userInfo, accessToken) => {
        try {
          const response = await axios.post('https://localhost:9092/api/authenticate', {

            userInfo: userInfo,
            accessToken: accessToken
          });
    
          console.log('백엔드 응답:', response.data);
          // 로그인 처리 완료 후 다음 동작 수행
          // 예: 로그인 완료 후 리다이렉트 등
          navigate('/');
        } catch (error) {
          console.error('백엔드로 사용자 정보 전송 중 오류 발생:', error);
        }
      };


    return (
        <footer>

            <div className='LoginFooter'>
                <p>OR</p>
            </div>
            {/*  google button */}
            <button className='google__btn' onClick={loginWithGoogle}>
                <Link to={GOOGLE_AUTH_URI}><FcGoogle /> 구글 로그인</Link>    
            </button>

            {/*  kakao button */}
            <button className='kakao__btn' onClick={loginWithKakao}  >
            <Link to={KAKAO_AUTH_URI}><HiMiniChatBubbleOvalLeft  /> 카카오 로그인</Link>
            </button>

            {/*  naver button */}
            <button className='naver__btn' onClick={loginWithNaver}>
                <Link to={NAVER_AUTH_URI}><SiNaver /> 네이버 로그인</Link>
            </button>
            
           </footer>
    );


}


function Login() {
    const [isChange, setisChange] = useState(false);


    return (
        <div className="Login">
            <LoginHeader setisChange={setisChange} />
            <LoginMain isChange={isChange} />
            <LoginFooter isChange={isChange} />


            <ul className="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>

            </ul>
        </div>
    );
}

export default Login;