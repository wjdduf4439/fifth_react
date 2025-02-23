import React, { useState, useEffect } from 'react';
import { useAxios } from 'provider/AxiosProvider';

import MuiTheme from 'css/MuiTheme';



export const useContractFormContent = (props) => {

	const {
		mediaQuery,
		process, setProcess,
		resultCount, setResultCount,
		containerMarginLeft, setContainerMarginLeft,
		containerMarginRight, setContainerMarginRight,
	} = props;

	const axiosInstance = useAxios();

	
	const handleCount = () => {
		getContractCount();
	}

	
	const getContractCount = () => {
		axiosInstance.post('/api/admin/contract/count', { })
		.then(response => {
			const data = response.data;
			if (data.result) {
				setResultCount(data.resultCount);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	useEffect(() => {

		const handleResize = () => {
			if (mediaQuery.matches) {
				if (containerMarginLeft !== 'margin_left_15') setContainerMarginLeft('margin_left_15');
				if (containerMarginRight !== '') setContainerMarginRight('');
			} else {
				if (containerMarginLeft !== 'margin_left_100') setContainerMarginLeft('margin_left_100');
				if (containerMarginRight !== 'margin_left_100') setContainerMarginRight('margin_left_100');
			}
			
		};

        // 초기 로드 시 크기 확인
        handleResize();

        // 창 크기 변경 이벤트 리스너 추가
        window.addEventListener('resize', handleResize);
		console.log('config useEffect');

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

	return {
		handleCount,
	}
}	