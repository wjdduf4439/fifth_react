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
		await axiosInstance.post('/api/common/accLogout.go', {})
		.then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);	

				localStorage.removeItem('accessCode');
				localStorage.removeItem('id');
				localStorage.removeItem('nick');
				localStorage.removeItem('role');
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				
				setIsProfileMenuVisible(false);

				// 현재 경로가 /admin/으로 시작하면 '/'로 리다이렉트
				if (window.location.pathname.startsWith('/admin/')) {
					window.location.href = '/';
				}

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