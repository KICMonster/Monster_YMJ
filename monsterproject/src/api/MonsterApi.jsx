import axios from "axios";

// 경로
export const API_SERVER_HOST = "http://localhost:9090";
const prefix = `${API_SERVER_HOST}/`;
const Loginfix = `${API_SERVER_HOST}/Loign`;

//비동기 통신 
export const 변수 = async (Fk값) => {
    const res = await axios.get(`${prefix}/${Fk값}`);
    return res.data;
}

//페이지 설정 


// Login page 
// 등록 
export const Loginpush = async(obj)=>{
    const res = await axios.post(`${Loginfix}/`,obj);
    return res.data
}