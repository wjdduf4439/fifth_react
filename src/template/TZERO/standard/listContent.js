import axios from 'axios';
import { useEffect } from 'react';

export const useTZEROStandardListContent = (props) => {

    const {
		page, setPage,
		reload, setReload,
		setShowWriteForm,
		setLoadingStatus,
		option, setOption,
		resultList, setResultList,
		noticeList, setNoticeList,
		handleCount,
    } = props;

	
    // 페이지 변경 핸들러 추가
    const handlePageChange = (pageNumber) => {
        //console.log("현재 페이지:", pageNumber);
        setPage(pageNumber);
    };

	function getTZEROStandardList(option) {
		setLoadingStatus(true, 'list');
		axios.post('/user/template/tzero/post/list', option)
		.then(response => {
			const data = response.data;
			if (data.result) {
				setResultList(data.resultList);
				setLoadingStatus(false, 'list');
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	function getTZEROStandardNoticeList(option) {
		axios.post('/user/template/tzero/post/notice', option)
		.then(response => {
			const data = response.data;
			if (data.result) {
				setNoticeList(data.resultList);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	useEffect(() => {
		setOption( prev => ({
			...prev, 
			startPoint: (page - 1) * 10,
			limit: 10,
		}));
		setReload(true);
	}, [page]);

	useEffect(() => {
		if(reload) {
			getTZEROStandardList(option);
			getTZEROStandardNoticeList(option);
			handleCount();
			setReload(false);
		}
	}, [reload]);

	return {
		handlePageChange,
	}
}	