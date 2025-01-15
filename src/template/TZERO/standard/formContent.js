import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAxios } from 'provider/AxiosProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';  // 상단에 추가


export const useTZEROStandardFormContent = (props) => {

	const {
		reloadView, setReloadView,
		reloadReply, setReloadReply,
		resetReplyOption,
		replyOption, setReplyOption,
		defaultProcess,
		process, setProcess,
		id, setId,
		resultCount, setResultCount,
		resetWriteForm,
		resetReplyForm,
		replyList, setReplyList,
		replyCount, setReplyCount,
		writeForm, setWriteForm,
		viewForm, setViewForm,
		replyForm, setReplyForm,
		replyUpdateUid, setReplyUpdateUid,
		replyUpdateContext, setReplyUpdateContext,
		replyResponseUid, setReplyResponseUid,
		replyResponseContext, setReplyResponseContext,
		replyTagFocusUid, setReplyTagFocusUid,
		postContentImageFileString, setPostContentImageFileString,
		setSelectedFiles,
		setShowWriteForm,
		setShowViewForm,
		setLoadingStatus,
	} = props;

	const axiosInstance = useAxios();

	const navigate = useNavigate();  // 추가
    const [searchParams] = useSearchParams();  // 추가

	const linkParams = (process, uid) => {

		//console.log(" handleWriteForm : ", process, " > ",uid);

		//글쓰기, 리스트 노드, 수정/글쓰기 버튼을 클릭해서 들어올때의 처리를 위해 URLSearchParams를 호출하는 코드가 필요함.
		//useEffect 호출 시 처리되는 URLSearchParams 코드와는 역할이 미묘하게 다름
		const currentParams = new URLSearchParams(searchParams);
		currentParams.set('process', process);
		currentParams.set('id', uid);

		console.log(" currentParams : ", currentParams);

		setReplyOption(resetReplyOption);
		setReplyList([resetReplyForm]);
		setReplyForm(resetReplyForm);

		setReplyUpdateUid(0);
		setReplyUpdateContext('');
		setReplyResponseUid(0);
		setReplyResponseContext('');
		setReplyTagFocusUid(0);
		
		setProcess(process);
		setId(uid);

		if (process === 'write') {
			setWriteForm(resetWriteForm);
		} else if (process === 'view') {
			getPostOne(uid);
			getReplyList(uid);
			getReplyCount(uid);
		} else if (process === 'update') {
			getAdminPostOne(uid);
		}

		console.log(" navigate link : ", currentParams.toString());
		navigate(`?${currentParams.toString()}`);
	}

	const backParams = () => {
		const currentParams = new URLSearchParams(searchParams);
		currentParams.delete('process');
		currentParams.delete('id');
		navigate(`?${currentParams.toString()}`);	
		setWriteForm(resetWriteForm);
		setProcess(defaultProcess);
		setSelectedFiles([]);
	}
	
	const handleCount = () => {
		getPostCount();
	}

	const getPostOne = (uid) => {
		setLoadingStatus(true, 'view');
		axios.post('/user/template/tzero/post/one', { uid: uid, codeHead : writeForm.codeHead })
		.then(response => {
			const data = response.data;
			if (data.result) {
				setViewForm(prev => ({ ...prev, 
					...data.resultList,
					processContext: data.resultList.contentVO.context,
				}));
				setReplyForm(prev => ({ ...prev, 
					pid: data.resultList.uid,
				}));
				setLoadingStatus(false, 'view');
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const getAdminPostOne = (uid) => {
		setLoadingStatus(true, 'write');
		axiosInstance.post('/admin/template/tzero/post/one', { uid: uid, codeHead : writeForm.codeHead })
		.then(response => {
			const data = response.data;
			if (data.result) {
				setWriteForm(prev => ({ ...prev, 
					...data.resultList,
					processContext: data.resultList.contentVO.context,
				}));
				setLoadingStatus(false, 'write');
				setWriteForm(prev => ({ ...prev, 
					//saveTempContentImageFileString: data.saveTempContentImageFileString,
					postContentImageFileString: data.saveTempContentImageFileString,
				}));
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const getPostCount = () => {
		axios.post('/user/template/tzero/post/count', { codeHead: writeForm.codeHead })
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

	const getReplyList = (uid) => {
		axios.post('/user/template/tzero/reply/list', { 
			uid: uid,
			codeHead: writeForm.codeHead,
			startPoint: replyOption.startPoint,
			limit: replyOption.limit,
		})
		.then(response => {
			const data = response.data;
			if(data.result) {
				setReplyList(data.resultList);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const getReplyCount = (uid) => {
		axios.post('/user/template/tzero/reply/count', { uid: uid, codeHead: writeForm.codeHead })
		.then(response => {
			const data = response.data;
			if (data.result) {
				setReplyCount(data.resultCount);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	//새로고침 시 post 게시물 표시를 위한 처리
	useEffect(() => {
		if(reloadView) {
			const currentParams = new URLSearchParams(searchParams);
			let paramProcess = currentParams.get('process') == null ? process : currentParams.get('process');
			let paramId = currentParams.get('id') == null ? id : currentParams.get('id');

			console.log(" reloadView : ", reloadView);
			//console.log(" process : ", paramProcess, " > id : ", paramId);

			linkParams(paramProcess, paramId);
		}
	}, [reloadView]);

	useEffect(() => {
		if(reloadReply) {
			getReplyList(viewForm.uid);
			getReplyCount(viewForm.uid);
			setReloadReply(false);
		}
	}, [reloadReply]);

	return {
		linkParams,
		backParams,
		handleCount,
	}
}	