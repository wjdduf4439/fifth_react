import React, { useState, useEffect } from 'react';
import { useAxios } from 'provider/AxiosProvider';

import MuiTheme from 'css/MuiTheme';



export const useContractFormContent = (props) => {

	const {
		process, setProcess,
		resultCount, setResultCount,
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

	return {
		handleCount,
	}
}	