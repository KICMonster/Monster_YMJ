import './Login.css'
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

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

    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code&scope=account_email,openid,profile_nickname`;
    const GOOGLE_AUTH_URI = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`
    const NAVER_AUTH_URI = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT_URI}&state=STATE_STRING`;

    useEffect(() => {
        const getCodeFromUrl = () => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('code');
        };

        const service = window.location.pathname.substring(1); // URL에서 서비스명 추출 (예: /kakao, /google, /naver)
        const code = getCodeFromUrl();

        if (code) {
            // 인가 코드로 Access Token 요청
            getAccessToken(code, service);
        }
    }, []);

    const getAccessToken = async (authCode, service) => {
        let access_token_uri;
        let body;

        switch (service) {
            case 'kakao':
                access_token_uri = 'https://kauth.kakao.com/oauth/token';
                body = new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
                    redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
                    client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
                    code: authCode
                });
                break;
            case 'google':
                access_token_uri = `${import.meta.env.VITE_GOOGLE_TOKEN_URI}`;
                body = new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
                    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
                    code: authCode
                });
                break;
            case 'naver':
                access_token_uri = 'https://nid.naver.com/oauth2.0/token';
                body = new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: import.meta.env.VITE_NAVER_CLIENT_ID,
                    client_secret: import.meta.env.VITE_NAVER_CLIENT_SECRET,
                    redirect_uri: import.meta.env.VITE_NAVER_REDIRECT_URI,
                    state: 'STATE_STRING',
                    code: authCode
                });
                break;
            default:
                console.error('Unsupported service');
                return;
        }


        try {
            const response = await axios.post(access_token_uri, body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            });

            const accessToken = response.data.access_token;
            setAccessToken(accessToken);


            console.log('발급된 Access Token:', accessToken);



            // 여기서 백엔드로 액세스 토큰을 전송할 수 있습니다.
            sendAccessTokenToBackend(accessToken);
        } catch (error) {
            console.error('Access Token 요청 중 오류 발생:', error);
        }
    };

    const sendAccessTokenToBackend = async (accessToken) => {
        try {
            const response = await axios.post(
                'https://localhost:9092/api/authenticate',
                {
                    accessToken: accessToken
                },
                {
                    headers: {
                        'Content-Type': 'application/json' // JSON 형식으로 전송합니다.
                    },
                    withCredentials: true // withCredentials 옵션은 여기에 포함
                }
            );


            console.log('전송된 Access Token:', accessToken);

            console.log('백엔드 응답:', response.data);
            // 로그인 처리 완료 후 다음 동작 수행
            // 예: 로그인 완료 후 리다이렉트 등
            // jwtAccessToken이 존재하는지 확인
            if (response.data && response.data.jwtAccessToken) {
                console.log('로그인 성공:', response.data);
                localStorage.setItem('jwt', response.data.jwtAccessToken); // JWT 토큰 저장
                navigate('/');
            } else {
                // jwtAccessToken이 없는 경우 에러 처리
                throw new Error('jwtAccessToken이 없습니다.');
            }
        } catch (error) {
            console.error('백엔드로 사용자 정보 전송 중 오류 발생:', error);
            alert('에러가 발생하여 로그인 페이지로 돌아갑니다.');
            navigate('/login');
        }
    };


    return (
        <footer>

            <div className='LoginFooter'>
                <p>OR</p>
            </div>
            {/*  google button */}
            <button className='google__btn' >
                <Link to={GOOGLE_AUTH_URI}><FcGoogle /> 구글 로그인</Link>
            </button>

            {/*  kakao button */}
            <button className='kakao__btn' >
                <Link to={KAKAO_AUTH_URI}><HiMiniChatBubbleOvalLeft /> 카카오 로그인</Link>
            </button>

            {/*  naver button */}
            <button className='naver__btn' >
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