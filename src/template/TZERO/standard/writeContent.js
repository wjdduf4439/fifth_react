import React, { useState, useEffect } from 'react';
import { useAxios } from 'provider/AxiosProvider';

export const useTZEROStandardWriteContent = (props) => {

	const {
		reload, setReload,
		process,
		writeForm, setWriteForm,
		selectedFiles, setSelectedFiles,
		showWriteForm, setShowWriteForm,
		linkParams,
		backParams,
	} = props;

	const axiosInstance = useAxios();

	const handleInsertPost = (writeForm) => {
		if (!validateWriteForm(writeForm)) return;
		insertPost(writeForm);
	}

	const handleUpdatePost = (writeForm) => {
		if (!validateWriteForm(writeForm)) return;
		updatePost(writeForm);
	}

	const handleRestorePost = (writeForm) => {
		restorePost(writeForm);
	}

	const handleDeletePost = (writeForm, process) => {	
		deletePost(writeForm, process);
	}
    
    const handleFileChange = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };

	const handleSelectedFileUpload = (event) => {
		
		event.preventDefault();
		event.stopPropagation();
		const files = Array.from(event.dataTransfer.files);
		const fileInput = document.querySelector('input[name="selectedFiles"]');
		//DataTransfer는 React가 아닌 웹 표준 API입니다. 브라우저에서 제공하는 Web API 중 하나입니다.
		const dataTransfer = new DataTransfer();
		
		// 기존 파일들과 새로운 파일들을 합침
		[...fileInput.files, ...files].forEach(file => {
			dataTransfer.items.add(file);
		});
		
		fileInput.files = dataTransfer.files;
		// 파일 변경 이벤트 수동 발생
		fileInput.dispatchEvent(new Event('change', { bubbles: true }));
		event.currentTarget.classList.remove('dragover');  // 클래스 제거
	}

	const handleSelectedFileRemove = (index) => {
		/*
			(_, i) => i !== index:
			_: 현재 파일 객체 (사용하지 않으므로 _로 표시)
			i: 현재 인덱스
			i !== index: 삭제하려는 인덱스와 다른 요소만 true 반환
		*/
		setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
	}

	const handleFileDownload = (event) => {
		event.preventDefault();
		const uid = event.target.getAttribute('data-uid');
		const codeHead = event.target.getAttribute('data-codeHead');
		fileDownload(uid, codeHead);
	}

	const handleUploadedFileRemove = (event) => {
		event.preventDefault();
		event.stopPropagation();

		const uid = event.currentTarget.getAttribute('data-uid');
		const codeHead = event.currentTarget.getAttribute('data-codehead');
		deleteFile(uid, codeHead);
	}

	const validateWriteForm = (writeForm) => {

		// writeForm의 code, name, comment에 null 검증 추가
		if (!writeForm.title ) {
			alert("제목을 입력해야 합니다.");
			return false;
		}

		return true;
	}

	const handleFileUpload = (writeForm) => {

		const formData = new FormData();
    
		// 선택된 파일들을 FormData에 추가
		selectedFiles.forEach((file, index) => {
			formData.append('files', file);
		});
		
		if(selectedFiles.length > 0){
			formData.append('codeHead', writeForm.codeHead);
			formData.append('uid', writeForm.uid);
			uploadFile(formData);
			setSelectedFiles([]);
		}

		return true;
	}


	const insertPost = async(writeForm) => {
		await axiosInstance.post('/admin/template/tzero/post/insert', writeForm)
		.then(response => {
			const data = response.data;
			if (data.result) {
				writeForm.uid = data.uid;
				let uploadResult = handleFileUpload(writeForm);
				if (!uploadResult) {
					alert("글을 등록했지만 파일 업로드에 실패했습니다.");
				}else{
					alert(data.message);
					setReload(true);
					backParams();
				}
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const updatePost = async(writeForm) => {
		await axiosInstance.put('/admin/template/tzero/post/update', writeForm)
		.then(response => {
			const data = response.data;
			if (data.result) {
				let uploadResult = handleFileUpload(writeForm);
				if (!uploadResult) {
					alert("글을 수정했지만 파일 업로드에 실패했습니다.");
				}else{
					alert(data.message);
					setReload(true);
					backParams();
				}
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const restorePost = async (writeForm) => {
		await axiosInstance.put('/admin/template/tzero/post/restore', writeForm)
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

	const deletePost = async (writeForm, process) => {
		await axiosInstance.put('/admin/template/tzero/post/' + process, writeForm)
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

	const uploadFile = async(formData) => {
		await axiosInstance.post('/admin/template/tzero/file/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},	
		}).then(response => {
			const data = response.data;
			if (!data.result) {
				alert("파일 업로드 중 문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
			return false;
		});

		return true;
	}

	const fileDownload = async (uid, codeHead) => {
		try {
			const response = await axiosInstance.post('/user/template/tzero/file/download',
				{ uid: uid, codeHead: codeHead },
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Accept': 'text/plain;charset=UTF-8'  // UTF-8 인코딩 명시
					},
					responseType: 'blob'  // 바이너리 데이터로 받기
				}
			);

			// fname 헤더에서 파일명 가져오기
			const fileName = decodeURIComponent(response.headers['fname']) || 'downloaded_text.txt';  // 기본값 설정
	
			// 이미지 데이터를 Blob으로 변환
			const blob = new Blob([response.data], { 
				type: response.headers['content-type']  // 서버에서 전송한 Content-Type 사용
			});
	
			// 다운로드
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = fileName;  // 헤더에서 가져온 파일명 사용
			document.body.appendChild(link);
			link.click();
			
			// 정리
			window.URL.revokeObjectURL(url);
			document.body.removeChild(link);
	
		} catch (error) {
			console.error('Error downloading file:', error);
			alert('파일 다운로드 중 오류가 발생했습니다.');
		}
	}

	const deleteFile = async(uid, codeHead) => {
		
		// 삭제대상 fileVO 출력
		// console.log("삭제할 fileVO : ", writeForm.fileVO);
		// console.log("삭제할 uid : ", uid, "& 삭제할 codeHead : ", codeHead);

		try {
			const response = await axiosInstance.put('/admin/template/tzero/file/delete', 
				{ uid: uid, codeHead: codeHead }
			);
			
			const data = response.data;
			if (data.result) {
				alert(data.message);
				// 서버 응답이 성공일 때만 상태 업데이트
				const updatedFileVO = writeForm.fileVO.filter(file => file.uid !== parseInt(uid));
				//console.log('필터링된 배열:', updatedFileVO);
				
				setWriteForm(prevState => ({
					...prevState,
					fileVO: updatedFileVO
				}));
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		} catch (error) {
			console.error('Error updating data:', error);
		}
	}

	useEffect(() => {
        console.log("selectedFiles : ", selectedFiles);
		const fileInput = document.querySelector('input[name="selectedFiles"]');
		const dataTransfer = new DataTransfer();
		if(selectedFiles.length !== 0){
			selectedFiles.forEach((file, index) => {
				dataTransfer.items.add(file);
			});
		}		
		fileInput.files = dataTransfer.files; // 파일 선택 상태 초기화

    }, [selectedFiles]);

	return {
		handleInsertPost,
		handleUpdatePost,
		handleRestorePost,
		handleDeletePost,
		handleFileChange,
		handleSelectedFileUpload,
		handleSelectedFileRemove,
		handleFileDownload,
		handleUploadedFileRemove,
	}
}