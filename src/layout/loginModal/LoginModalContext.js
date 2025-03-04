import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useContext } from 'react';
import { AccessContext } from 'provider/AccessProvider';

export const useLoginModalContext = (props) => {

	const { 
		id,
		pw,
		setIsLoginModalVisible,
		setIsRegistModalVisible,
	} = props;

	
	const useAccess = useContext(AccessContext);
	const { setAccessInfo } = useAccess;	//provider에서 받고는 있지만. 현재는 localstorage에서 받아오는 것으로 변경

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

	const handleCloseModal = () => {
		setIsLoginModalVisible(false);
		setIsRegistModalVisible(false);
	}

	const handleRegistModal = () => {
		setIsLoginModalVisible(false);
		setIsRegistModalVisible(true);
	}

	//기본형 axios 사용하기
	const getLogin = async (requestNodeData) => {
		await axios.post('/api/accLogin.go', requestNodeData, {
			headers: { 'Content-Type': 'application/json' }
		}).then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);

				if(data.accessCode) 	localStorage.setItem('accessCode', data.accessCode);
				if(data.id) 			localStorage.setItem('id', data.id);
				if(data.nick) 			localStorage.setItem('nick', data.nick);
				if(data.role) 			localStorage.setItem('role', data.role);
				if(data.accessToken) 	localStorage.setItem('accessToken', data.accessToken);
				if(data.refreshToken) 	localStorage.setItem('refreshToken', data.refreshToken);
				
				setIsLoginModalVisible(false);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
			alert("로그인 정보가 잘못되었습니다.");
		});
	};

	return {
		handleLogin,
		handleCloseModal,
		handleRegistModal,
	}
}