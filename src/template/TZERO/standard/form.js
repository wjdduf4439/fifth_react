import React, { useState } from 'react';

import { FaListUl } from "react-icons/fa";

import MuiTheme from 'css/MuiTheme';
import Loading from 'layout/util/Loading';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useTZEROStandardFormContent } from './formContent';
import { useShortcutKeyContent } from './shortcutKeyContent';
import TZEROStandardList from './list';
import TZEROStandardWriteForm from './write';
import TZEROStandardViewForm from './view';


const TZEROStandardForm = (props) => {

	const {
			templateOption, codeHead,
			showWriteForm, setShowWriteForm,
			showViewForm, setShowViewForm,
			setLoadingStatus,
			showListLoading,
			showWriteLoading,
			showViewLoading,
	} = props;

	const replyInsertButtonId = 'reply_insert_button';
	const replyUpdateButtonId = 'reply_update_button';
	const replyResponseButtonId = 'reply_response_button';

	const [reload, setReload] = useState(true);
	const [reloadView, setReloadView] = useState(true);
	const [reloadReply, setReloadReply] = useState(false);
	const [option, setOption] = useState({ startPoint: 0, limit: 10, codeHead: codeHead, noticeShow: templateOption.noticeShow });
	const [replyPage, setReplyPage] = useState(1);
	const resetReplyOption = { startPoint: 0, limit: templateOption.replyLimit};
	const [replyOption, setReplyOption] = useState(resetReplyOption);
	const defaultProcess = '';
	const [process, setProcess] = useState(defaultProcess);
	const [id, setId] = useState(0);

	const [resultList, setResultList] = useState([]);
	const [resultCount, setResultCount] = useState(0);
	const [noticeList, setNoticeList] = useState([]);

	const resetFileForm = {
		uid: 0,
		code: '',
		pid: '',
		fsign: '',
		fpath: '',
		savingFname: '',
		fname: '',
	};

	const resetWriteForm = {
		uid: 0,
		codeHead: codeHead,
		del_chk: 'N',
		notice_chk: 'N',
		title: '',
		processContext: '',
		writerNick: '',
		viewNum: 0,
		like: 0,
		dislike: 0,
		likeOptionPath: '',
		frstRegistNm: '',
		frstRegistPnttm: '',
		contentVO: {
			context: '',
		},
		fileVO: [resetFileForm],
		saveTempContentImageFileString: '',
		postContentImageFileString : ''
	};

	const resetReplyForm = {
		codeHead: codeHead,
		pid: '',
		tagRepUid: 0,
		context: '',
		writerNick: '',
		frstRegistPnttm: '',
	};

	const [replyList, setReplyList] = useState([resetReplyForm]);
	const [replyCount, setReplyCount] = useState(0);

	const [writeForm, setWriteForm] = useState(resetWriteForm);
	const [viewForm, setViewForm] = useState(resetWriteForm);
	const [replyForm, setReplyForm] = useState(resetReplyForm);
	
	const [replyUpdateUid, setReplyUpdateUid] = useState(0);
	const [replyUpdateContext, setReplyUpdateContext] = useState('');
	const [replyResponseUid, setReplyResponseUid] = useState(0);
	const [replyResponseContext, setReplyResponseContext] = useState('');
	const [replyTagFocusUid, setReplyTagFocusUid] = useState(0);

	const [contentFileForm, setContentFileForm] = useState(resetFileForm);

	const [selectedFiles, setSelectedFiles] = useState([]);

	const {
		linkParams,
		backParams,
		handleCount,
	} = useTZEROStandardFormContent({
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
		setSelectedFiles,
		setShowWriteForm,
		setShowViewForm,
		setLoadingStatus,
	});

	const {
		mappingShortcutKey,
		handleReplyTextareaKeyDown,
		handleReplyUpdateTextareaKeyDown,
		handleResponseTextareaKeyDown,
	} = useShortcutKeyContent({
		replyInsertButtonId,
		replyUpdateButtonId,
		replyResponseButtonId,
		showWriteForm, setShowWriteForm,
		showViewForm, setShowViewForm,
		backParams,
	});

	return (
		<>
			<div className="main_container">
				<div className="container margin_left_100 margin_right_100">

					{showWriteForm && 
						<div className="content">
							<h1>게시물 수정</h1>
						</div>
					}

					{showWriteForm	&&
						(
							<TZEROStandardWriteForm 
								templateOption={templateOption}
								reload={reload} setReload={setReload}
								process={process} setProcess={setProcess}
								id={id} setId={setId}
								writeForm={writeForm} setWriteForm={setWriteForm}
								contentFileForm={contentFileForm} setContentFileForm={setContentFileForm}
								selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}
								showWriteForm={showWriteForm} setShowWriteForm={setShowWriteForm}
								showWriteLoading={showWriteLoading}
								linkParams={linkParams}
								backParams={backParams}
							/>
						)
					}

					{showViewForm && 
						<div className="content">
							<h1>게시물 조회</h1>
						</div>
					}

					{showViewForm &&
						<TZEROStandardViewForm
							replyInsertButtonId={replyInsertButtonId}
							replyUpdateButtonId={replyUpdateButtonId}
							replyResponseButtonId={replyResponseButtonId}
							templateOption={templateOption}
							showViewLoading={showViewLoading}
							reloadView={reloadView} setReloadView={setReloadView}
							reloadReply={reloadReply} setReloadReply={setReloadReply}
							replyPage={replyPage} setReplyPage={setReplyPage}
							replyOption={replyOption} setReplyOption={setReplyOption}
							viewForm={viewForm} setViewForm={setViewForm}
							replyForm={replyForm} setReplyForm={setReplyForm}
							replyList={replyList} setReplyList={setReplyList}
							replyCount={replyCount} setReplyCount={setReplyCount}
							replyUpdateUid={replyUpdateUid} setReplyUpdateUid={setReplyUpdateUid}
							replyUpdateContext={replyUpdateContext} setReplyUpdateContext={setReplyUpdateContext}
							replyResponseUid={replyResponseUid} setReplyResponseUid={setReplyResponseUid}
							replyResponseContext={replyResponseContext} setReplyResponseContext={setReplyResponseContext}
							replyTagFocusUid={replyTagFocusUid} setReplyTagFocusUid={setReplyTagFocusUid}
							linkParams={linkParams}
							backParams={backParams}
							handleReplyTextareaKeyDown={handleReplyTextareaKeyDown}
							handleReplyUpdateTextareaKeyDown={handleReplyUpdateTextareaKeyDown}
							handleResponseTextareaKeyDown={handleResponseTextareaKeyDown}
						/>
					}

					{ !showWriteForm && !showViewForm &&
						<div className="content">
							<h1>게시판 목록</h1>
						</div>
					}
					{  showViewForm && templateOption.viewUnderListShow === 'Y' &&

						<div>
							<MuiTheme.FormControlLabel1
								style={{ width: '20%' }}
								control={ <h3><FaListUl className='font_size_20 margin_right_15' />리스트</h3> }
								onClick={() => { backParams('view'); }}
							/>
						</div>
					}
					
					{((!showWriteForm && !showViewForm) || (showViewForm && templateOption.viewUnderListShow === 'Y')) && (
						<>
							<TZEROStandardList
								templateOption={templateOption}
								reload={reload} setReload={setReload}
								option={option} setOption={setOption}
								resultList={resultList} setResultList={setResultList}	
								resultCount={resultCount}
								noticeList={noticeList} setNoticeList={setNoticeList}
								setShowWriteForm={setShowWriteForm}	
								setShowViewForm={setShowViewForm}
								setLoadingStatus={setLoadingStatus}
								showListLoading={showListLoading}
								handleCount={handleCount}
								linkParams={linkParams}
								backParams={backParams}
							/>
						</>
						)
					}

				</div>
			</div>
		</>
	);
}

export default TZEROStandardForm;