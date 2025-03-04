import { useContext, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useAxios } from 'provider/AxiosProvider';
import { useProfileModalContext } from 'layout/profile/ProfileModalContext';

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
	
	//프로필의 로그아웃 창에 있는 로그아웃 기능 불러오기
	const { handleLogOut } = useProfileModalContext();
	
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