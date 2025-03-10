import React, { useState, useEffect } from 'react';
import { useAxios } from 'provider/AxiosProvider';

import MuiTheme from 'css/MuiTheme';

import { RiDeleteBin2Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";

import { FaFileCode } from "react-icons/fa6";

import ListItemAvatar from '@mui/material/ListItemAvatar';

export const useContractListContent = (props) => {

	const axiosInstance = useAxios();

    const {	
		mediaQuery,
		page, setPage,
		reload, setReload,
		option, setOption,
		resultList, setResultList,
		resultCount,
		handleCount,
    } = props;
	
	let map = [
		{
			uid: '-1',
			code: '',
			name: '연락 없음',
			comment: '연락 목록을 불러오지 못했습니다.',
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

	function getCodeHeadList(option) {
		axiosInstance.post('/api/admin/contract/list', option)
		.then(response => {
			const data = response.data;
			if (data.result) {

				const listWithButtons = Array.isArray(data.resultList) ? data.resultList.map(item => ({
					...item,
					secondaryButton: 
						<>
							<RxUpdate 
								className="font_size_26 margin_right_15" 
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

	useEffect(() => {
		setOption({
			startPoint: (page - 1) * 10,
			limit: 10,
		});
		setReload(true);
	}, [page]);

	useEffect(() => {
		if(reload) {
			getCodeHeadList(option);
			handleCount();
			setReload(false);
		}
	}, [reload]);

	return {
		handleCount,
		handlePageChange,
	}
}	