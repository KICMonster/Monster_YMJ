import './Login.css'
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import { useState } from 'react';
import { Link } from 'react-router-dom';


//////////////////js//////////////////////

////////////////컴포넌트///////////////////
//로그인 페이지 해더  회원가입/로그인
function LoginHeader({setisChange}) {
    
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
function LoginMain(isChange) {
    if (isChange) {
        return (
            <main>
                <form style={{ width: '100%' }}>
                    <div className="LoginMainBody">
                        <input type="text" placeholder={"Email"} id='email' autoComplete="username" />
                        <input type="password" placeholder={"비밀번호 6자리 이상입력"} id='pass' autoComplete="new-password" />
                        <input type="password" placeholder={"재확인 비밀번호 6자리 이상입력"} id='pass2' autoComplete="new-password" />
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
                        <input type="text" placeholder={"Email"} id='email' autoComplete="username" />
                        <input type="password" placeholder={"비밀번호 6자리 이상입력"} id='pass' autoComplete="new-password" />
                    </div>
                    <button type='submit' className='origin__btn' >로그인</button>
                </form>
            </main>
        );
    }
}


//로그인 페이지 푸터    소셜로그인 
function LoginFooter(isChange) {
    if (isChange) {
        return (
            <footer>
                <div className='LoginFooter'>
                    <p>OR</p>
                </div>
                {/*  google button */}
                <button className='google__btn'>
                    <FcGoogle />
                    구글로 간편가입
                </button>
                {/*  kakao button */}
                <button className='kakao__btn'>
                    {/* <HiMiniChatBubbleOvalLeft />   얘 자체 오류있음  */}
                    카카오로 간편가입
                </button>
                {/*  naver button */}
                <button className='naver__btn'>
                    <SiNaver />
                    네이버로 간편가입
                </button>
            </footer>
        );
    } else {
        return (
            <footer>
                <div className='LoginFooter'>
                    <p>OR</p>
                </div>
                {/*  google button */}
                <button className='google__btn'>
                    <FcGoogle />
                    구글 로그인
                </button>
                {/*  kakao button */}
                <button className='kakao__btn'>
                    {/* <HiMiniChatBubbleOvalLeft />   얘 자체 오류있음  */}
                    카카오 로그인
                </button>
                {/*  naver button */}
                <button className='naver__btn'>
                    <SiNaver />
                    네이버 로그인
                </button>
            </footer>
        );
    }

}


function Login() {
    const [isChange, setisChange] = useState(false);


    return (
        <div className="Login">
            <LoginHeader setisChange={setisChange}/>
            <LoginMain isChange={isChange}/>
            <LoginFooter isChange={isChange}/>

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