import React, { useState, useEffect } from 'react';
import { useAxios } from 'provider/AxiosProvider';

export const useAccessAccountWriteContent = (props) => {

	const {
		mediaQuery,
		reload, setReload,
		process,
		showWriteForm, setShowWriteForm,
		inputWidth, setInputWidth,
	} = props;

	const axiosInstance = useAxios();

	const handleInsertAccessAccount = (writeForm) => {
		if (!validateWriteForm(writeForm)) return;
		insertAccessAccount(writeForm);
	}

	const handleUpdateAccessAccount = (writeForm) => {
		if (!validateWriteForm(writeForm)) return;
		updateAccessAccount(writeForm);
	}

	const handleRestoreAccessAccount = (writeForm) => {
		restoreAccessAccount(writeForm);
	}

	const handleDeleteAccessAccount = (writeForm) => {	
		deleteAccessAccount(writeForm);
	}

	const validateWriteForm = (writeForm) => {
		if (!writeForm.id) {
			alert("아이디를 입력해야 합니다.");
			return false;
		}
		
		if (!writeForm.nick) {
			alert("닉네임을 입력해야 합니다.");
			return false;
		}

		if (!writeForm.email) {
			alert("이메일을 입력해야 합니다.");
			return false;
		}
		if (!writeForm.role) {
			alert("역할을 입력해야 합니다.");
			return false;
		}
		if (!writeForm.authority) {
			alert("권한을 입력해야 합니다.");
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


	const insertAccessAccount = async(writeForm) => {
		await axiosInstance.post('/api/admin/accessAccount/insert', writeForm)
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

	const updateAccessAccount = async (writeForm) => {
		await axiosInstance.post('/api/admin/accessAccount/update', writeForm)
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

	const restoreAccessAccount = async (writeForm) => {
		await axiosInstance.post('/api/admin/accessAccount/restore', writeForm)
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

	const deleteAccessAccount = async (writeForm) => {
		await axiosInstance.post('/api/admin/accessAccount/delete', writeForm)
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
		handleInsertAccessAccount,
		handleUpdateAccessAccount,
		handleRestoreAccessAccount,
		handleDeleteAccessAccount,
	}
}
