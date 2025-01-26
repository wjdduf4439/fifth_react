import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useAxios } from 'provider/AxiosProvider';

import { FaRegFileLines } from "react-icons/fa6";
import { MdCancelPresentation } from "react-icons/md";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FiCornerDownRight } from "react-icons/fi";

import MuiTheme from 'css/MuiTheme';

export const useTZEROStandardViewContent = (props) => {

	const {
		textareaRef,
		replyUpdateButtonId,
		replyResponseButtonId,
		reloadReply, setReloadReply,
		replyPage, setReplyPage,
		replyOption, setReplyOption,
		viewForm, setViewForm,
		replyForm, setReplyForm,
		replyList, setReplyList,
		replyCount, setReplyCount,
		replyUpdateUid, setReplyUpdateUid,
		replyUpdateContext, setReplyUpdateContext,
		replyResponseUid, setReplyResponseUid,
		replyResponseContext, setReplyResponseContext,
		replyTagFocusUid, setReplyTagFocusUid,
		handleReplyUpdateTextareaKeyDown,
		handleResponseTextareaKeyDown,
	} = props;

	const axiosInstance = useAxios();


	const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            // 높이를 초기화한 후 scrollHeight로 설정
			// console.log('textarea.scrollHeight : 'textarea.scrollHeight);
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

	const handleViewNum = (viewForm) => {
		viewPost(viewForm);
	}

	const handleLike = (viewForm, process) => {
		likePost(viewForm, process);
	}

	const handleFileDownload = (event) => {
		event.preventDefault();
		const uid = event.target.getAttribute('data-uid');
		const codeHead = event.target.getAttribute('data-codeHead');
		fileDownload(uid, codeHead);
	}

	const handleInsertReply = () => {
		if (!validateReplyForm(replyForm)) return;
		insertReply(replyForm);
	}

	const handleUpdateReply = () => {
		if (!validateReplyUpdateForm(replyUpdateContext)) return;
		updateReply(replyUpdateUid, viewForm.codeHead, replyUpdateContext);
	}

	const handleReplyResponse = () => {
		if (!validateReplyResponseForm(replyResponseContext)) return;

		let momRepUid = replyList.find((reply) => {
			if(reply.uid === replyResponseUid) {
				return reply;
			}
		}).momRepUid;

		replyResponse(momRepUid, viewForm.codeHead, replyResponseUid, replyResponseContext);
	}

	const handleReplyPageChange = (pageNumber) => {
		setReplyPage(pageNumber);
		setReplyOption(prev => ({ ...prev, startPoint: (pageNumber - 1) * replyOption.limit }));
		setReloadReply(true);
	}

	const openUpdateReplyForm = (reply) => {

		setReplyUpdateContext('');
		if(replyUpdateUid === reply.uid) {
			setReplyUpdateUid(0);
		} else {
			setReplyUpdateUid(reply.uid);
			setReplyUpdateContext(reply.context);
		}
	}

	const openReplyResponseForm = (reply) => {

		console.log('openReplyResponseForm context : ' + reply.context.toString());

		setReplyResponseContext('');
		if(replyResponseUid === reply.uid) {
			setReplyResponseUid(0);
		} else {
			setReplyResponseUid(reply.uid);
		}
	}

	const taggingReplyTagFocusUid = (reply) => {
		setReplyTagFocusUid(reply.tagRepUid);
	}


	const validateReplyForm = (replyForm) => {

		// replyForm의 context에 null 검증 추가
		if (!replyForm.context ) {
			alert("댓글을 입력해야 합니다.");
			return false;
		}

		if( replyForm.context.length > 200 ) {
			alert("댓글은 200자 이하로 입력해야 합니다.");
			return false;
		}

		return true;
	}

	const validateReplyUpdateForm = (replyUpdateContext) => {
		if (!replyUpdateContext) {
			alert("댓글을 입력해야 합니다.");
			return false;
		}
		return true;
	}

	const validateReplyResponseForm = (replyResponseContext) => {
		if (!replyResponseContext) {
			alert("답변을 입력해야 합니다.");
			return false;
		}
		return true;
	}


	const fileDownload = async (uid, codeHead) => {
		try {
			const response = await axiosInstance.post('/api/user/template/tzero/file/download',
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

	const FileDownloadNode = (file, index) => {
		return (
			<li key={index}>
				<div className='file_upload_div'> 
					{file.uid != null && file.uid !== '' && file.uid !== 0 && (
						<span className='width_95per'>
							<FaRegFileLines className='margin_right_10'/> 
							<a	data-uid={file.uid}
								data-codeHead={viewForm.codeHead}
								href='#none'
								onClick={handleFileDownload}
								target='_blank'
							>
								{file.fname}
							</a>
						</span>
					)}
					{file.uid === 0 && (
						<span className='width_95per'>
							파일이 업로드되지 않았습니다.
						</span>	
					)}
				</div>
			</li>						
		)
	}

	const ReplyNode = (reply, index) => {

		let tagRepUid = reply.momRepUid;
		let tagRepNick = reply.writerNick;

		replyList.forEach(reply => {
			if(reply.uid === tagRepUid) {
				tagRepNick = reply.writerNick;
			}
		});

		return (
			<>
				<li key={index}>
					<div	id={`reply_` + reply.uid}
							data-uid={reply.uid} 
							className={`reply_list_div ${replyTagFocusUid === reply.uid ? 'reply_list_div_focus' : ''}`  }
						>
						<span className='width_10per display_inline_table'>{reply.writerNick}</span>
						<span className='width_5per display_inline_table font_size_12'>
							<a href='#none' onClick={() => { likeProcessReply(reply.uid, viewForm.codeHead, 'like') }} className='reply_like_button'>
								<AiOutlineLike /> : {reply.like}
							</a>
							<span className='width_15per display_inline_table text_align_center'>
								|
							</span>
							<a href='#none' onClick={() => { likeProcessReply(reply.uid, viewForm.codeHead, 'dislike') }} className='reply_dislike_button'>
								<AiOutlineDislike /> : {reply.dislike}
							</a>
						</span>
						<span className='width_65per display_inline_table'>
							
							{reply.momRepUid !== reply.uid && (
								<>
									<FiCornerDownRight className='margin_right_10'/>
									<a href='#none' onClick={() => { taggingReplyTagFocusUid(reply) }} className='reply_response_button margin_right_10'>@{tagRepNick}</a>
								</>
							)}
							<a href='#none' onClick={() => { openReplyResponseForm(reply) }} className='reply_response_button'>
								{reply.context.split('\n').map((line, index) => (
									<span key={index}>
										{line}
										<br />
									</span>
								))}
								{/* : {reply.momRepUid} */}
							</a>
						</span>
						<span className='width_10per display_inline_table'>
							{ reply.lastUpdtPnttm == null? formatDate(reply.frstRegistPnttm) : formatDate(reply.lastUpdtPnttm)}
						</span>
						{
							reply.writerNick === localStorage.getItem('nick') && (
								<span className='width_10per'>
									<a href='#none' onClick={() => { deleteReply(reply.uid, viewForm.codeHead) }} className='reply_delete_button'>
										삭제
									</a>
									<span className='display_inline_table text_align_center'>
										&nbsp;&nbsp;|&nbsp;&nbsp;
									</span>
									<a href='#none' onClick={() => { openUpdateReplyForm(reply) }} className='reply_update_button'>
										수정
									</a>
								</span>							
							)
						}
						{reply.frstRegistNm}
					</div>
				</li>

				{/* 이런 형식으로 구현하면 textarea값에 값을 기입해도 랜더링이 일어나지 않는다. */}
				{/* 함수가 반환하는 랜더링 방식은, textarea값에 값을 기입해도 랜더링이 일어나지 않는다. */}
				{/* 
					아래처럼 jsx 형식으로 구현하면, textarea값에 값을 기입해도 랜더링이 일어난다.
					그래서 포커싱이 끊기기 때문에 이런 식으로 구현하지 말것
				*/}
				
				{replyUpdateUid === reply.uid && (
					ReplyUpdateNode(reply)
					// <ReplyUpdateNode reply={reply}>
				)}
				{replyResponseUid === reply.uid && (
					ReplyResponseNode(reply)
					// <ReplyResponseNode reply={reply}>
				)}
			</>
		)
	}

	const ReplyUpdateNode = (reply) => {
		return (
			<>
				<div className='reply_div'>
					<textarea 
						id={'reply_textarea_' + reply.uid}
						className='reply_textarea'
						placeholder='수정할 내용을 입력하세요.(shift + enter로 수정)'
						ref={textareaRef}
						onInput={handleInput}  // onInput 이벤트에 handleInput 연결
						style={{ overflow: 'hidden', resize: 'none' }}
						spellCheck={false}  // 맞춤법 검사 비활성화
						onChange={(e) => {
							const newValue = e.target.value;
							if (newValue !== replyUpdateContext) {
								setReplyUpdateContext(newValue);
							}
						}}
						onKeyDown={(e) => {
							handleReplyUpdateTextareaKeyDown(e);
						}}
						value={replyUpdateContext}  // value 속성으로 상태 바인딩
					/>
					<ul className='reply_button_ul'>
						<li>
							<MuiTheme.ReplyInsertButton 
								id={replyUpdateButtonId}
								onClick={handleUpdateReply}>수정</MuiTheme.ReplyInsertButton>	
						</li>
					</ul>
				</div>
			</>
		)
	}

	const ReplyResponseNode = (reply) => {
		return (
			<>
				<div className='reply_div'>
					<textarea 
						className='reply_textarea'
						placeholder='답변할 내용을 입력하세요.(shift + enter로 입력)'
						ref={textareaRef}
						onInput={handleInput}  // onInput 이벤트에 handleInput 연결
						style={{ overflow: 'hidden', resize: 'none' }}
						spellCheck={false}  // 맞춤법 검사 비활성화
						onChange={(e) => {
							setReplyResponseContext(e.target.value);
						}}
						value={replyResponseContext}  // value 속성으로 상태 바인딩
						onKeyDown={(e) => {
							handleResponseTextareaKeyDown(e);
						}}
					/>
					<ul className='reply_button_ul'>
						<li>
							<MuiTheme.ReplyInsertButton 
								id={replyResponseButtonId}
								onClick={handleReplyResponse} >답변</MuiTheme.ReplyInsertButton>	
						</li>
					</ul>
				</div>
			</>
		)
	}

	const viewPost = async (viewForm) => {
		await axios.post('/api/user/template/tzero/post/viewNum', viewForm)
		.then(response => {
			const data = response.data;
			if (data.result) {
				setViewForm(prev => ({ ...prev, viewNum: prev.viewNum + 1 }));
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const likePost = async (viewForm, process) => {
		await axiosInstance.put('/api/admin/template/tzero/post/' + process, viewForm)
		.then(response => {
			const data = response.data;
			console.log(data);
			if (data.result) {
				if (process === 'like') {
					setViewForm(prev => ({ ...prev, like: prev.like + 1 }));
				} else {
					setViewForm(prev => ({ ...prev, dislike: prev.dislike + 1 }));
				}
			} else {
				alert(data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const insertReply = async (replyForm) => {
		await axiosInstance.post('/api/admin/template/tzero/reply/insert', replyForm)
		.then(response => {
			const data = response.data;
			const reply_textarea = document.getElementById('reply_textarea');
			if(data.result) {
				setReloadReply(true);
				reply_textarea.value = '';
				setReplyForm(prev => ({ ...prev, context: '' }));
			} else {
				alert(data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const updateReply = async (uid, codeHead, replyUpdateContext) => {
		await axiosInstance.put('/api/admin/template/tzero/reply/update', {
			uid: uid,
			codeHead: codeHead,
			context: replyUpdateContext
		}).then(response => {
			const data = response.data;
			if(data.result) {
				setReloadReply(true);
				setReplyUpdateUid(0);
				setReplyUpdateContext('');
			} else {
				alert(data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const replyResponse = async (momRepUid, codeHead, replyResponseUid, replyResponseContext) => {
		await axiosInstance.post('/api/admin/template/tzero/reply/response', {
			pid: viewForm.uid,
			codeHead: codeHead,
			momRepUid: momRepUid,
			tagRepUid: replyResponseUid,
			context: replyResponseContext,
		})
		.then(response => {
			const data = response.data;
			if(data.result) {
				setReloadReply(true);
				setReplyResponseUid(0);
				setReplyResponseContext('');
			} else {
				alert(data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	function formatDate(dateString) {
		const date = new Date(dateString);
	
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
	
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}

	//delete메소드는 params를 활용해서 파라미터를 전송해야 함
	const deleteReply = async (uid, codeHead) => {

		//console.log('deleteReply process : ' + uid + ' ' + codeHead);

		await axiosInstance.delete('/api/admin/template/tzero/reply/delete', {
			params: {
				uid: uid,
				codeHead: codeHead
			}
		}).then(response => {
			const data = response.data;
			if(data.result) {
				alert(data.message);
				setReloadReply(true);
			} else {
				alert(data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const likeProcessReply = async (uid, codeHead, process) => {
		await axiosInstance.put('/api/admin/template/tzero/reply/' + process, {
			uid: uid,
			codeHead: codeHead
		}).then(response => {
			const data = response.data;
			if(data.result) {
				const updatedReplyList = replyList.map(reply => {
					if (reply.uid === uid) {
						return {
							...reply,
							like: process === 'like' ? parseInt(reply.like) + 1 : reply.like,
							dislike: process === 'like' ? reply.dislike : parseInt(reply.dislike) + 1
						};
					}
					return reply;
				});
				// 상태 업데이트
				setReplyList(updatedReplyList);
			} else {
				alert(data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	useEffect(() => {
		handleViewNum(viewForm);
	}, []);

	return {
		handleInput,
		handleLike,
		handleFileDownload,
		handleInsertReply,
		handleReplyPageChange,
		formatDate,	
		FileDownloadNode,
		ReplyNode,
	}
}
