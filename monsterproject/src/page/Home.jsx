import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

function Home () {
    return (
        <div>
            <h1>기본화면입니다 test.</h1>
            <a href="Login">로그인 페이지 </a>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}

export default Home;