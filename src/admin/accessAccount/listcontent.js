import React, { useState, useEffect } from 'react';
import { useAxios } from 'provider/AxiosProvider';

import MuiTheme from 'css/MuiTheme';

import { RiDeleteBin2Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";

import { FaFileCode } from "react-icons/fa6";

import ListItemAvatar from '@mui/material/ListItemAvatar';

export const useCodeHeadListContent = (props) => {

	const axiosInstance = useAxios();

    const {
		page, setPage,
		reload, setReload,
		setShowWriteForm,
		option, setOption,
		noAppoveResultList, setNoAppoveResultList,
		resultList, setResultList,
		approveAccountList, setApproveAccountList,
		handleWriteForm,
		handleCount,
    } = props;
	
	let map = [
		{
			uid: '-1',
			code: '',
			name: '코드 없음',
			comment: '코드 목록을 불러오지 못했습니다.',
			secondaryButton: 
				<>	
					{/* 
						<RxUpdate className="font_size_26 margin_right_15" />
						<RiDeleteBin2Line className="font_size_26 margin_right_15" /> 
					*/}
				</>,
			// onclick: () => { alert('click list'); }
		}			
	];

	
    // 페이지 변경 핸들러 추가
    const handlePageChange = (pageNumber) => {
        console.log("현재 페이지:", pageNumber);
        setPage(pageNumber);
    };

	//승인 대상 계정 체크박스 선택
	const handleApproveAccountList = (uid) => {	
		if(approveAccountList.includes(uid)){
			setApproveAccountList(approveAccountList.filter(uid => uid !== uid));
		}else{
			setApproveAccountList([...approveAccountList, uid]);
		}
	}

	//승인 대상 계정 전체선택
	const handleApproveAccountListAll = () => {	
		if(approveAccountList.length === noAppoveResultList.length){
			setApproveAccountList([]);
		}else{
			setApproveAccountList(noAppoveResultList.map(item => item.uid));
		}
	}

	//승인 처리
	const handleApproveAccount = (approveAccountList) => {
		getApproveAccount(approveAccountList);
	}

	function getNoAppoveList(option) {
		axiosInstance.post('/api/admin/accessAccount/approveList', option)
		.then(response => {
			const data = response.data;
			if (data.result) {
				setNoAppoveResultList(data.resultList);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	function getAccessAccountList(option) {
		axiosInstance.post('/api/admin/accessAccount/list', option)
		.then(response => {
			const data = response.data;
			if (data.result) {

				const listWithButtons = Array.isArray(data.resultList) ? data.resultList.map(item => ({
					...item,
					secondaryButton: 
						<>
							<RxUpdate 
								className="font_size_26 margin_right_15" 
								onClick={() => { handleWriteForm('update', item.uid); }}
							/>
						</>
						,
				})) : map;
				setResultList(listWithButtons);

			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	function getApproveAccount(approveAccountList) {
		axiosInstance.post('/api/admin/accessAccount/approve', {
			approveAccountList: approveAccountList.toString(),
		}).then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);
				setReload(true);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	useEffect(() => {
		setOption({
			startPoint: (page - 1) * 10,
			limit: 10,
		});
		setReload(true);
	}, [page]);

	useEffect(() => {
		if(reload) {
			getAccessAccountList(option);
			getNoAppoveList(option);
			handleCount();
			setReload(false);
		}
	}, [reload]);

	return {
		handlePageChange,
		handleApproveAccountList,
		handleApproveAccountListAll,
		handleApproveAccount,
	}
}	