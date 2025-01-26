import { useContext, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useAxios } from 'provider/AxiosProvider';

export const useTopMenuContext = (props) => {

	const {
		setIsTopMenuDropdownVisible,
		setIsLoginModalVisible,
		setIsProfileMenuVisible,
		isRightMenuVisible, setIsRightMenuVisible,
		setIsRightMenuVisibleValue,
		setOpenRightMenus,
		topMenuDataList, setTopMenuDataList,
	} = props;
	
	const axiosInstance = useAxios();

	const handleLoginButtonClick = () => {
		setIsLoginModalVisible(true);
	};
	
	const handleCloseModal = () => {
		setIsLoginModalVisible(false);
	};

	const handleRightMenu = () => {
		setIsRightMenuVisibleValue('show');
        setIsRightMenuVisible(!isRightMenuVisible);
		setIsTopMenuDropdownVisible(false);
    };

	const handleRightMenuToggle = (menuType, menuCode) => {
		setOpenRightMenus(prevState => ({
			...prevState,
			[`${menuType}-${menuCode}`]: !prevState[`${menuType}-${menuCode}`]
		}));
	};

	const handleMenuTree = () => {
		getMenuTree();
	}

	const getMenuTree = async () => {
		axiosInstance.post('/api/topmenu/menu/list', {})
		.then(response => {
			const data = response.data;
			if (data.result) {
				setTopMenuDataList(data.resultList);
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
		handleRightMenu,
		handleRightMenuToggle,
	}
};	