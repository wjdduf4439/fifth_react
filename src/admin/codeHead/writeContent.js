import React, { useState, useEffect } from 'react';
import { useAxios } from 'provider/AxiosProvider';

export const useCodeHeadWriteContent = (props) => {

	const {
		mediaQuery,
		reload, setReload,
		process,
		showWriteForm, setShowWriteForm,
		inputWidth, setInputWidth,
	} = props;

	const axiosInstance = useAxios();

	const handleInsertCodeHead = (writeForm) => {
		if (!validateWriteForm(writeForm)) return;
		insertCodeHead(writeForm);
	}

	const handleUpdateCodeHead = (writeForm) => {
		if (!validateWriteForm(writeForm)) return;
		updateCodeHead(writeForm);
	}

	const handleRestoreCodeHead = (writeForm) => {
		restoreCodeHead(writeForm);
	}

	const handleDeleteCodeHead = (writeForm) => {	
		deleteCodeHead(writeForm);
	}

	const validateWriteForm = (writeForm) => {
		const codeRegex = /^[A-Z]{3,10}$/; // 대문자 알파벳 3자리에서 10자리 사이

		if (!writeForm.code ) {
			alert("코드를 입력해야 합니다.");
			return false;
		}
		if (!codeRegex.test(writeForm.code)) {
			alert("코드는 대문자 알파벳 3자리에서 10자리 사이로 입력해야 합니다.");
			return false;
		}
		if (!writeForm.name) {
			alert("이름을 입력해야 합니다.");
			return false;
		}
		if (!writeForm.comment) {
			alert("주석을 입력해야 합니다.");
			return false;
		}

		if (!writeForm.templateType?.trim()){
			alert("템플릿 타입을 입력해야 합니다.");
			return false;
		}

		let isValidJson = true;

		if(process === 'update') {
			try {
				JSON.parse(writeForm.optionContent);
			} catch (e) {
				isValidJson = false;
			}

			if(!isValidJson) {
				alert("옵션 내용을 입력해야 합니다.");
				return false;
			}
		}

		if (!writeForm.skinType?.trim()){
			alert("스킨 타입을 입력해야 합니다.");
			return false;
		}

		return true;
	}


	const insertCodeHead = async(writeForm) => {
		await axiosInstance.post('/api/admin/codeHead/insert', writeForm)
		.then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);
				setShowWriteForm(false);
				setReload(true);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const updateCodeHead = async (writeForm) => {
		await axiosInstance.post('/api/admin/codeHead/update', writeForm)
		.then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);
				setShowWriteForm(false);
				setReload(true);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const restoreCodeHead = async (writeForm) => {
		await axiosInstance.post('/api/admin/codeHead/restore', writeForm)
		.then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);
				setShowWriteForm(false);
				setReload(true);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const deleteCodeHead = async (writeForm) => {
		await axiosInstance.post('/api/admin/codeHead/delete', writeForm)
		.then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);
				setShowWriteForm(false);
				setReload(true);
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
				if (inputWidth !== 'width_100per') setInputWidth('width_100per');
			} else {
				if (inputWidth !== 'width_32per') setInputWidth('width_32per');
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
		handleInsertCodeHead,
		handleUpdateCodeHead,
		handleRestoreCodeHead,
		handleDeleteCodeHead,
	}
}
