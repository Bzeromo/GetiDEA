// src/api/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';
// Axios 인스턴스 생성
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URI // 환경 변수에서 API 기본 주소 가져오기
});

// 요청 인터셉터 추가
api.interceptors.request.use(
    config => {
        const access_token = Cookies.get('access_token');
        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가
api.interceptors.response.use(
    response => {
        // 응답을 처리하고 싶은 코드를 여기에 작성
        return response;
    },
    error => {
        // 오류 응답을 처리하고 싶은 코드를 여기에 작성
        return Promise.reject(error);
    }
);

export default api;
