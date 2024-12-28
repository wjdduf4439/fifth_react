import React, { useState, useEffect, useRef, createContext, useCallback  } from 'react';
import { useAxios } from 'provider/AxiosProvider';


export const useMenuOptionContext = ( props ) => {

	const { writeForm } = props;
	
	const [siteOptions, setSiteOptions] = useState([]);
	const [skinOptions, setSkinOptions] = useState([]);
	const [templateComment, setTemplateComment] = useState('현재 어떤 노드도 선택되지 않았습니다.');
	
	const axiosInstance = useAxios();

	const getSiteOption = async () => {
        const formData = { index : 0, siteoption_index : 0 };
        try {
            await axiosInstance.post('/admin/templateType/list', formData).then(response => {
				const data = response.data;
				if (data.result) {
            		//const transformedData = transformMenuData(data.resultList);
            		console.log(data.resultList);
            		setSiteOptions(data.resultList);
				} else {
					alert("문제가 발생했습니다 ");
				}
			}).catch(error => {
				console.error('Error updating data:', error);
			});

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

	const getSkinOption = async () => {
        const formData = { index : 0, siteoption_index : 0 };
        try {
            await axiosInstance.post('/admin/skinType/list', formData).then(response => {
				const data = response.data;
				if (data.result) {
            		//const transformedData = transformMenuData(data.resultList);
            		console.log(data.resultList);
            		setSkinOptions(data.resultList);
				} else {
					alert("문제가 발생했습니다 ");
				}
			}).catch(error => {
				console.error('Error updating data:', error);
			});

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(() => {
		getSiteOption();
		getSkinOption();
	}, []);
	
	useEffect(() => {
	    if (writeForm.templateType) {
	        siteOptions.map(option => {
                if(option.code === writeForm.templateType)	setTemplateComment(option.comment);
            });
	    }
	}, [writeForm.templateType]);
	
	return {
		siteOptions,
		skinOptions,
        templateComment, setTemplateComment,
    };
	
} 