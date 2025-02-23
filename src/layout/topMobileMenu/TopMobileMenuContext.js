import { useContext, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useAxios } from 'provider/AxiosProvider';

export const useMobileTopMenuContext = (props) => {

	const {
		setIsTopMenuDropdownVisible,
		setIsLoginModalVisible,
		isRightMenuVisible, setIsRightMenuVisible,
		setIsRightMenuVisibleValue,
		setOpenRightMenus,
		mobileMenuDataList, setMobileMenuDataList,
		mobileSelectedMenuUid, setMobileSelectedMenuUid,
		isMobileSidebarVisible, setIsMobileSidebarVisible,
	} = props;
	
	const axiosInstance = useAxios();

	const handleLoginButtonClick = () => {
		setIsLoginModalVisible(true);
	};
	
	const handleCloseModal = () => {
		setIsLoginModalVisible(false);
	};

	const handleMobileMenuClick = (event, menuUid) => {
		event.preventDefault();
		setMobileSelectedMenuUid(menuUid);
		if(menuUid === mobileSelectedMenuUid) {
			setMobileSelectedMenuUid(0);
		}
	};

	const handleMobileMenuLinkClick = (menuPath) => {
		window.open(menuPath, '_blank');
	};

	const handleMenuTree = () => {
		getMenuTree();
	}

	const handleLogOut = (event) => {
		event.preventDefault();
		getLogOut();
	}

	const getMenuTree = async () => {
		axiosInstance.post('/api/topmenu/menu/list', {})
		.then(response => {
			const data = response.data;
			if (data.result) {
				setMobileMenuDataList(data.resultList);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
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
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				
				setIsMobileSidebarVisible(false);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
			alert("문제가 발생해서 요청이 차단되었습니다.");
		});
	};

	useEffect(() => {
		handleMenuTree();
	}, []);

	return {
		handleLoginButtonClick,
		handleCloseModal,
		handleMobileMenuClick,
		handleMobileMenuLinkClick,
		handleLogOut,
	}
};	