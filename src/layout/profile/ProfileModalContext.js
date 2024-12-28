import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useContext } from 'react';
import { useAxios } from 'provider/AxiosProvider';

export const useProfileModalContext = (
	setIsProfileMenuVisible,
) => {

	const axiosInstance = useAxios();

	const handleLogOut = (event) => {
		event.preventDefault();

		getLogOut();
	}

	const getLogOut = async () => {
		await axiosInstance.post('/common/accLogout.go', {})
		.then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);	

				localStorage.removeItem('accessCode');
				localStorage.removeItem('id');
				localStorage.removeItem('nick');
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				
				setIsProfileMenuVisible(false);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
			alert("문제가 발생해서 요청이 차단되었습니다.");
		});
	};

	return {
		handleLogOut,
	}
}