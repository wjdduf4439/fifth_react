import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAxios } from 'provider/AxiosProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';  // 상단에 추가


export const useTZEROStandardFormContent = (props) => {

	const {
		mediaQuery,
		responsiveWebOption, setResponsiveWebOption,
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
		axios.post('/api/user/template/tzero/post/one', { uid: uid, codeHead : writeForm.codeHead })
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
		axiosInstance.post('/api/admin/template/tzero/post/one', { uid: uid, codeHead : writeForm.codeHead })
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
		axios.post('/api/user/template/tzero/post/count', { codeHead: writeForm.codeHead })
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
		axios.post('/api/user/template/tzero/reply/list', { 
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
		axios.post('/api/user/template/tzero/reply/count', { uid: uid, codeHead: writeForm.codeHead })
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

	useEffect(() => {

		const handleResize = () => {
			if (mediaQuery.matches) {
				if (responsiveWebOption.containerMarginLeft !== 'margin_left_15') setResponsiveWebOption(prev => ({ ...prev, containerMarginLeft: 'margin_left_15' }));
				if (responsiveWebOption.containerMarginRight !== 'margin_right_15') setResponsiveWebOption(prev => ({ ...prev, containerMarginRight: 'margin_right_15' }));

				if (responsiveWebOption.viewTitleWidth !== '100%') setResponsiveWebOption(prev => ({ ...prev, viewTitleWidth: '100%' }));
				if (responsiveWebOption.viewWriterNickWidth !== '50%') setResponsiveWebOption(prev => ({ ...prev, viewWriterNickWidth: '50%' }));
				if (responsiveWebOption.viewDateWidth !== '30%') setResponsiveWebOption(prev => ({ ...prev, viewDateWidth: '30%' }));
				if (responsiveWebOption.viewViewNumWidth !== '20%') setResponsiveWebOption(prev => ({ ...prev, viewViewNumWidth: '20%' }));

				if (responsiveWebOption.replyWriterNickWidth !== '80') setResponsiveWebOption(prev => ({ ...prev, replyWriterNickWidth: '80' }));
				if (responsiveWebOption.replyLikeWidth !== '20') setResponsiveWebOption(prev => ({ ...prev, replyLikeWidth: '20' }));
				if (responsiveWebOption.replyContextWidth !== '100') setResponsiveWebOption(prev => ({ ...prev, replyContextWidth: '100' }));
				if (responsiveWebOption.replyDateWidth !== '75') setResponsiveWebOption(prev => ({ ...prev, replyDateWidth: '75' }));
				if (responsiveWebOption.replyDeleteWidth !== '25') setResponsiveWebOption(prev => ({ ...prev, replyDeleteWidth: '25' }));

				if (responsiveWebOption.ulMinHeight !== '60px') setResponsiveWebOption(prev => ({ ...prev, ulMinHeight: '60px' }));
				if (responsiveWebOption.ulDisplay !== 'block') setResponsiveWebOption(prev => ({ ...prev, ulDisplay: 'block' }));
				if (responsiveWebOption.fileDivOneFlex !== '') setResponsiveWebOption(prev => ({ ...prev, fileDivOneFlex: '' }));
				if (responsiveWebOption.fileDivTwoFlex !== '') setResponsiveWebOption(prev => ({ ...prev, fileDivTwoFlex: '' }));
				if (responsiveWebOption.fileDivOnePadding !== '0px 0px 0px 0px') setResponsiveWebOption(prev => ({ ...prev, fileDivOnePadding: '0px 0px 0px 0px' }));
			} else {
				if (responsiveWebOption.containerMarginLeft !== 'margin_left_100') setResponsiveWebOption(prev => ({ ...prev, containerMarginLeft: 'margin_left_100' }));
				if (responsiveWebOption.containerMarginRight !== 'margin_right_100') setResponsiveWebOption(prev => ({ ...prev, containerMarginRight: 'margin_right_100' }));

				if (responsiveWebOption.viewTitleWidth !== '73%') setResponsiveWebOption(prev => ({ ...prev, viewTitleWidth: '73%' }));
				if (responsiveWebOption.viewWriterNickWidth !== '10%') setResponsiveWebOption(prev => ({ ...prev, viewWriterNickWidth: '10%' }));
				if (responsiveWebOption.viewDateWidth !== '12%') setResponsiveWebOption(prev => ({ ...prev, viewDateWidth: '12%' }));
				if (responsiveWebOption.viewViewNumWidth !== '5%') setResponsiveWebOption(prev => ({ ...prev, viewViewNumWidth: '5%' }));

				if (responsiveWebOption.ulMinHeight !== '150px') setResponsiveWebOption(prev => ({ ...prev, ulMinHeight: '150px' }));
				if (responsiveWebOption.ulDisplay !== 'flex') setResponsiveWebOption(prev => ({ ...prev, ulDisplay: 'flex' }));
				if (responsiveWebOption.fileDivOneFlex !== '0 0 20%') setResponsiveWebOption(prev => ({ ...prev, fileDivOneFlex: '0 0 20%' }));
				if (responsiveWebOption.fileDivTwoFlex !== '1 1 75%') setResponsiveWebOption(prev => ({ ...prev, fileDivTwoFlex: '1 1 75%' }));
				if (responsiveWebOption.fileDivOnePadding !== '0px 0px 0px 20px') setResponsiveWebOption(prev => ({ ...prev, fileDivOnePadding: '0px 0px 0px 20px' }));
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
		linkParams,
		backParams,
		handleCount,
	}
}	