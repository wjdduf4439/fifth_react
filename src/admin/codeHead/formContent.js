import React, { useState, useEffect } from 'react';
import { useAxios } from 'provider/AxiosProvider';

import MuiTheme from 'css/MuiTheme';



export const useCodeHeadFormContent = (props) => {

	const {
		mediaQuery,
		process, setProcess,
		resultCount, setResultCount,
		writeForm, setWriteForm,
		setShowWriteForm,
		containerMarginLeft, setContainerMarginLeft,
		containerMarginRight, setContainerMarginRight,
	} = props;

	const axiosInstance = useAxios();


	const handleWriteForm = (process, uid) => {
		//console.log(" handleWriteForm : ", process, " > ",uid);
		if(process === 'write') {
			setProcess('write');
			setShowWriteForm(true);
			setWriteForm({
				uid: 0,
				code: '',
				name: '',
				comment: '',
				del_chk: 'N',
				//해당 코드헤더가 가지는 게시판 타입
				templateType: '',
				//해당 코드헤더가 가지는 스킨 타입
				skinType: '',
				optionContent: '',
				optionExplanation: '',
			});
		} else if(process === 'update') {
			setProcess('update');
			setShowWriteForm(true);
			getCodeHeadOne(uid);
		}
	}
	
	const handleCount = () => {
		getCodeHeadCount();
	}

	const formatOptionContent = (optionContent) => {
		try {
			// 주석 제거
			const jsonString = optionContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
			//console.log(" jsonString : ", jsonString);
			const parsed = JSON.parse(jsonString);
			return JSON.stringify(parsed, '', 2);
		} catch (error) {
			console.error('JSON 파싱 에러:', error);
			return optionContent; // 에러 발생 시 원본 문자열 반환
		}
	}

	const getCodeHeadOne = (uid) => {
		axiosInstance.post('/api/admin/codeHead/one', { uid: uid })
		.then(response => {
			const data = response.data;
			if (data.result) {
				setWriteForm(data.resultList);
				setWriteForm(prev => ({ ...prev,
					optionContent: formatOptionContent(data.resultList.optionContent),
				}));
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const getCodeHeadCount = () => {
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
		handleWriteForm,
		handleCount,
	}
}	