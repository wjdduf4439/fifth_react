import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useContext } from 'react';
import { AccessContext } from 'provider/AccessProvider';

export const useLoginModalContext = (
	id,
	pw,
	setIsLoginModalVisible,
) => {

	
	const useAccess = useContext(AccessContext);
	const { setCode, setId, setNick, setAccessToken, setRefreshToken } = useAccess;	

	const handleLogin = (event) => {
		event.preventDefault();

		if (id === '' || pw === '') {
			alert("아이디 또는 비밀번호를 입력해주세요.");
			return;
		}

		//const hashedPw = CryptoJS.SHA384(formData.get('pw')).toString(CryptoJS.enc.Hex);

		const requestNodeData = {
			id: id,
			pw: pw,
		};
		getLogin(requestNodeData);
	};

	//기본형 axios 사용하기
	const getLogin = async (requestNodeData) => {
		await axios.post('/accLogin.go', requestNodeData, {
			headers: { 'Content-Type': 'application/json' }
		}).then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);

				if(data.code) 			localStorage.setItem('accessCode', data.code);
				if(data.id) 			localStorage.setItem('id', data.id);
				if(data.nick) 			localStorage.setItem('nick', data.nick);
				if(data.accessToken) 	localStorage.setItem('accessToken', data.accessToken);
				if(data.refreshToken) 	localStorage.setItem('refreshToken', data.refreshToken);
				
				setIsLoginModalVisible(false);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
			alert("문제가 발생해서 요청이 차단되었습니다.");
		});
	};

	return {
		handleLogin,
	}
}