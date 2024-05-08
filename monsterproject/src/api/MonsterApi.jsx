import axios from "axios";

// 경로
export const API_SERVER_HOST = "http://localhost:9092";
const prefix = `${API_SERVER_HOST}/`;

//비동기 통신 
export const 변수 = async (Fk값) => {
    const res = await axios.get(`${prefix}/${Fk값}`);
    return res.data;
}

//페이지 설정 


// Login page 
// 등록 
export const userAdd = async(userInfo)=>{
    const res = await axios.post(`${prefix}/`,userInfo);
    return res.data
}

export const userLogin = async(userA)=>{
    const res = await axios.get(`${prefix}/`,userA);
    return res.data
}

export const sociallLogin = async(socialInfo)=>{
    const res = await axios.get(`${prefix}/kakao/callback`,socialInfo);
    return res.data
}