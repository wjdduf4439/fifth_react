import { useContext, useRef, useState } from 'react';

import { FaInfo } from "react-icons/fa";
import { MdOutlineQuickreply, MdOutlineUploadFile, MdCancelPresentation } from "react-icons/md";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

import MuiTheme from 'css/MuiTheme';
import { ThemeContext } from 'provider/ThemeContext';

import Pagination from 'react-js-pagination';

import { Box } from '@mui/material';

import { useTZEROStandardViewContent } from './viewContent';

const TZEROStandardViewForm = (props) => {

	const { isDarkMode } = useContext(ThemeContext);

	const textareaRef = useRef(null);

	const {
		replyInsertButtonId,
		replyUpdateButtonId,
		replyResponseButtonId,
		templateOption,
		reloadView, setReloadView,
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
		linkParams,
		backParams,
		handleReplyTextareaKeyDown,
		handleReplyUpdateTextareaKeyDown,
		handleResponseTextareaKeyDown,
	} = props;

	const {
		handleInput,
		handleLike,
		handleFileDownload,
		handleInsertReply,
		handleReplyPageChange,
		formatDate,	
		FileDownloadNode,
		ReplyNode,
	} = useTZEROStandardViewContent({
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
	});

	return (
		<>
			<div className=""><FaInfo /> esc 키를 누르면 리스트 페이지로 이동합니다. </div>
			<MuiTheme.TextField2 style={{ width: '73%' }} label={"제목"} value={viewForm.title} disabled />
			<MuiTheme.TextField2 style={{ width: '10%' }} label={"작성자"} value={viewForm.frstRegistNm} disabled />
			<MuiTheme.TextField2 style={{ width: '12%' }} label={"작성시간"} value={formatDate(viewForm.frstRegistPnttm)} disabled />
			<MuiTheme.TextField2 style={{ width: '5%' }} label={"조회수"} value={viewForm.viewNum} disabled />

			<div style={{ minHeight: '250px' }}>
				{/* dangerouslySetInnerHTML 옵션을 사용해서 내용을 표시 */}
				<div dangerouslySetInnerHTML={{ __html: viewForm.contentVO.context }} />
			</div>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<MuiTheme.LikeButton onClick={() => handleLike(viewForm, 'like')}>
					<AiOutlineLike />좋아요<br /><br />{viewForm.like}
				</MuiTheme.LikeButton>
				<MuiTheme.LikeButton onClick={() => handleLike(viewForm, 'dislike')}>
					<AiOutlineDislike />싫어요<br /><br />{viewForm.dislike}
				</MuiTheme.LikeButton>
			</Box>
			<ul className='uploaded_list_ul margin_top_50 margin_bottom_50'>
				<li>
					<div className='file_uploaded_div font_size_18'>
						<MdOutlineUploadFile className='margin_right_15' />업로드된 파일
					</div>
				</li>
				<li>
					<ul className='file_uploaded_ul'>
						{viewForm.fileVO.map((file, index) => (
							FileDownloadNode(file, index)
						))}
					</ul>
				</li>
			</ul>
			<ul className='reply_list_ul margin_top_50 margin_bottom_50'>
				<li>
					<div className='reply_div_header font_size_18'>
						<MdOutlineQuickreply className='margin_right_15' />댓글
						 {/* {`>`} {replyResponseUid} */}
						 {/* {`> replyTagFocusUid : `} {replyTagFocusUid} */}
					</div>
				</li>
				<li>
					<div className='reply_div'>
						<textarea 
							id='reply_textarea'
							className='reply_textarea'
							placeholder='댓글을 입력하세요.(shift + enter로 입력)'
							ref={textareaRef}
							onInput={handleInput}  // onInput 이벤트에 handleInput 연결
							style={{ overflow: 'hidden', resize: 'none' }}
							spellCheck={false}  // 맞춤법 검사 비활성화
							onChange={(e) => setReplyForm(prev => ({ ...prev, context: e.target.value }))}
							onKeyDown={(e) => handleReplyTextareaKeyDown(e)}
						></textarea>
						<ul className='reply_button_ul'>
							<li>
								<MuiTheme.ReplyInsertButton 
									id={replyInsertButtonId} 
									onClick={handleInsertReply} >
										댓글 작성
								</MuiTheme.ReplyInsertButton>	
							</li>
						</ul>
					</div>
				</li>

				{replyList.map((reply, index) => (
					<div key={`reply_div_${reply.uid}`}>
						{ReplyNode(reply, index)}
					</div>
				))}
				
			</ul>
			<Pagination
				activePage={replyPage}
				itemsCountPerPage={replyOption.limit}
				totalItemsCount={replyCount}
				pageRangeDisplayed={10}
				onChange={handleReplyPageChange}
			/>
			{
				viewForm.frstRegistNm === localStorage.getItem('id') &&
					<MuiTheme.ListButton1 onClick={() => { linkParams('update', viewForm.uid); }}>수정</MuiTheme.ListButton1>
			}
			<MuiTheme.ListButton1 onClick={() => { backParams('view'); }}>취소</MuiTheme.ListButton1>

		</>
	);
}

export default TZEROStandardViewForm;
