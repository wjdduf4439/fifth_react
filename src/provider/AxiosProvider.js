// src/provider/AxiosProvider.js
import React, { createContext, useContext } from 'react';
import axios from 'axios';

const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {

	//이 구문을 추가하더라도 실제 요청에 {} 를 추가하지 않으면 데이터가 전달되지 않는다.
	//예) axiosInstance.post('/api/topmenu/menu/list', {})
    const axiosInstance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'), // 토큰 정보를 담을것
        },
    });

	
    // 요청 인터셉터 설정
	//함수는 axios 라이브러리에서 제공하는 기능으로, 
	//모든 HTTP 요청이 서버로 전송되기 전에 특정 로직을 실행할 수 있도록 해주는 인터셉터(interceptor)
    axiosInstance.interceptors.request.use(
        (config) => {
            // 요청이 보내지기 전에 헤더에 토큰 추가
			const accessCode = localStorage.getItem('accessCode');
			const accessId = localStorage.getItem('id');
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const nick = localStorage.getItem('nick');
			const role = localStorage.getItem('role');

			if (accessCode) 	config.headers['AccessCode'] = accessCode; 
			if (accessId)		config.headers['AccessId'] = accessId; 
            if (accessToken)	config.headers['AccessToken'] = accessToken; 
            if (refreshToken)	config.headers['RefreshToken'] = refreshToken;	
			if (nick)			config.headers['Nick'] = nick;	
			if (role)			config.headers['Role'] = role;	
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

	// 응답 인터셉터 설정

    axiosInstance.interceptors.response.use(

        (res) => {

            // 응답에서 accessToken을 받아와 localStorage에 저장

            const newAccessToken = res.headers['accesstoken'];
            if (newAccessToken) {
                localStorage.setItem('accessToken', newAccessToken);
            }
            return res;
        },
        (error) => {
			if(error.response.data.message) {
				alert("문제가 발생했습니다 : " + error.response.data.message);
			} else {
				alert("문제가 발생했습니다");
			}
            return Promise.reject(error);
        }

    );

    return (
        <AxiosContext.Provider value={axiosInstance}>
            {children}
        </AxiosContext.Provider>
    );
};

export const useAxios = () => {
	const context = useContext(AxiosContext);

	if (!context) {
        throw new Error('useAxios must be used within an AxiosProvider');
    }

    return context;
};