import React, { useState, useEffect } from 'react';
import { useAxios } from 'provider/AxiosProvider';

import MuiTheme from 'css/MuiTheme';



export const useAccessFormContent = (props) => {

	const {
		mediaQuery,
		responsiveWebOption, setResponsiveWebOption,
		process, setProcess,
		resultListReset,
		resultCount, setResultCount,
		writeForm, setWriteForm,
		setShowWriteForm,
	} = props;

	const axiosInstance = useAxios();

	const handleWriteForm = (process, uid) => {
		//console.log(" handleWriteForm : ", process, " > ",uid);
		if(process === 'write') {
			setProcess('write');
			setShowWriteForm(true);
			setWriteForm(resultListReset);
		} else if(process === 'update') {
			setProcess('update');
			setShowWriteForm(true);
			getAccessAccountOne(uid);
		}
	}

	
	const handleCount = () => {
		getAccessCount();
	}

	const getAccessAccountOne = (uid) => {
		axiosInstance.post('/api/admin/accessAccount/one', { uid: uid })
		.then(response => {
			const data = response.data;
			if (data.result) {
				setWriteForm(data.resultList);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const getAccessCount = () => {
		axiosInstance.post('/api/admin/codeHead/count', { })
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
				if (responsiveWebOption.containerMarginLeft !== 'margin_left_15') setResponsiveWebOption({...responsiveWebOption, containerMarginLeft: 'margin_left_15'});
				if (responsiveWebOption.containerMarginRight !== '') setResponsiveWebOption({...responsiveWebOption, containerMarginRight: ''});
			} else {
				if (responsiveWebOption.containerMarginLeft !== 'margin_left_100') setResponsiveWebOption({...responsiveWebOption, containerMarginLeft: 'margin_left_100'});
				if (responsiveWebOption.containerMarginRight !== 'margin_right_100') setResponsiveWebOption({...responsiveWebOption, containerMarginRight: 'margin_right_100'});
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
		handleWriteForm,
		handleCount,
	}
}	