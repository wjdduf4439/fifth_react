import React, { useState, useContext, useMemo } from 'react';

import { FaInfo } from "react-icons/fa";
import { FaRegFileLines } from "react-icons/fa6";
import { MdOutlineUploadFile } from "react-icons/md";
import { MdCancelPresentation } from "react-icons/md";

import MuiTheme from 'css/MuiTheme';
import Loading from 'layout/util/Loading';
import { ThemeContext } from 'provider/ThemeContext';

import ReactQuill from 'react-quill';
import 'css/quill/editor.css'; // 스타일을 위한 CSS 파일

import { useTZEROStandardWriteContent } from './writeContent';
import { Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

const TZEROStandardWriteForm = (props) => {

	const { isDarkMode } = useContext(ThemeContext);

	const {
		templateOption,
		reload, setReload,
		process, setProcess,
		id, setId,
		writeForm, setWriteForm,
		contentFileForm, setContentFileForm,
		selectedFiles, setSelectedFiles,
		showWriteForm, setShowWriteForm,
		showWriteLoading,
		linkParams,
		backParams,
	} = props;

	const {
		handleInsertPost,
		handleUpdatePost,
		handleRestorePost,
		handleDeletePost,
		handleFileChange,
		handleSelectedFileUpload,
		handleSelectedFileRemove,
		handleFileDownload,
		handleUploadedFileRemove,
		toolbarOptions,
		contentImageHandler,
	} = useTZEROStandardWriteContent({
		reload, setReload,
		process,
		writeForm, setWriteForm,
		contentFileForm, setContentFileForm,
		selectedFiles, setSelectedFiles,
		showWriteForm, setShowWriteForm,
		linkParams,
		backParams,
	});

	const modules = useMemo(() => {
		return {
			toolbar: {
				container: toolbarOptions,
				handlers: {
					image: contentImageHandler,
				},
			},
		};
	}, []);

	return (
		<>
			{showWriteLoading? <Loading /> : 
			<>
				<div className=""><FaInfo /> esc 키를 누르면 리스트 페이지로 이동합니다. </div>
				<div className="">env {`>`} {process.env.REACT_APP_NODE_ENV}</div>
				<MuiTheme.TextField2 
					style={{ width: templateOption.noticeShow === 'Y' ? '75%' : '100%' }}
					label={"제목"}
					value={writeForm.title}
					onChange={(e) => setWriteForm(prev => ({ ...prev, title: e.target.value }))} 	
				/>
				{templateOption.noticeShow === 'Y' &&
					<MuiTheme.FormControlLabel1
						style={{ width: '23%' }}
						control={
							<MuiTheme.ListItemCheckbox 
								checked={writeForm.notice_chk === 'Y'} 
								onChange={(event) => setWriteForm(prev => ({ ...prev, notice_chk: event.target.checked ? 'Y' : 'N' }))} 
							/>
						}
						label="공지사항 표시"
					/>
				}

				<div style={{ minHeight: '500px', border: '1px solid var(--background-border-color)' }}>
					<ReactQuill 
						theme="snow" 
						modules={modules}
						value={writeForm.processContext}
						onChange={(value) =>{ 
							setWriteForm(prev => ({ ...prev, processContext: value })); 
						}}
						placeholder="내용을 입력해주세요. 이미지 파일 업로드는 jpg, jpeg, png, gif, webp 파일만 가능합니다."
					/>
				</div>
				<ul className='uploaded_list_ul'>
					<li>
						<div className='file_uploaded_div font_size_18'>
							<MdOutlineUploadFile className='margin_right_15' />업로드된 파일
						</div>
					</li>
					<li>
						<ul className='file_uploaded_ul'>
							{writeForm.fileVO.map((file, index) => (
								<li key={index}>
									<div className='file_upload_div'> 
										{file.uid != null && file.uid !== '' && file.uid !== 0 && (
											<>
											<span className='width_95per'>
													<FaRegFileLines className='margin_right_10'/> 
													<a	data-uid={file.uid}
														data-codeHead={writeForm.codeHead}
														href='#none'
														onClick={handleFileDownload}
														target='_blank'
													>
														{file.fname}
													</a>
												</span>
												<MuiTheme.ListButton1
													className='width_5per' 
													onClick={(e) => { handleUploadedFileRemove(e); }}
													data-uid={file.uid}
													data-codehead={writeForm.codeHead}
												>
													<MdCancelPresentation className='font_size_26' />
												</MuiTheme.ListButton1>
											</>	
										)}
										{file.uid === 0 && (
											<span className='width_95per'>
												파일이 업로드되지 않았습니다.
											</span>	
										)}
									</div>
								</li>
							))}
						</ul>
					</li>
				</ul>
				<ul className='file_list_ul'>
					<li>
						<div className='file_upload_button_div font_size_18' 
							onClick={() => { document.querySelector('input[name="selectedFiles"]').click(); }}

							//기본적으로 브라우저는 요소 위에 무언가를 드래그했을 때 드롭을 허용하지 않습니다.
							//onDragOver 이벤트에서 e.preventDefault()를 호출하지 않으면 브라우저는 드롭을 차단합니다 
							onDragOver={(e) => { 
								e.preventDefault(); e.stopPropagation();  
								e.currentTarget.classList.add('dragover');  // 클래스 추가
							}}
							onDragLeave={(e) => { 
								e.currentTarget.classList.remove('dragover');  // 클래스 제거
							}}
							onDrop={(e) => { handleSelectedFileUpload(e); }}
							>
								<MdOutlineUploadFile className='margin_right_15' />파일 업로드
						</div>
					</li>
					<li>
						<ul className='file_upload_ul'>
							{selectedFiles.map((file, index) => (
								<li key={index}>
									<div className='file_upload_div'> 
										<span className='width_95per'>
											<FaRegFileLines className='margin_right_10'/> {file.name}
										</span>
										<MuiTheme.ListButton1 className='width_5per' onClick={() => { handleSelectedFileRemove(index); }}>
											<MdCancelPresentation className='font_size_26' />
										</MuiTheme.ListButton1>
									</div>
								</li>
							))}
						</ul>
					</li>
				</ul>

			
			</>}
			<input style={{ visibility: 'hidden' }} placeholder='selectedFiles' name='selectedFiles' type="file" onChange={handleFileChange} multiple />
			<br />
			<div className='button_div'>
				{process === 'write' && <MuiTheme.ListButton1 onClick={() => { handleInsertPost(writeForm); }}>등록</MuiTheme.ListButton1>}
				{process === 'update' && <MuiTheme.ListButton1 onClick={() => { handleUpdatePost(writeForm); }}>수정</MuiTheme.ListButton1>}
				{process === 'update' 
					&& (writeForm.del_chk === 'N' && templateOption.disableAllow === 'Y')
					&& 
					<MuiTheme.ListButton1 onClick={() => { handleDeletePost(writeForm, 'disable'); }}>비활성화</MuiTheme.ListButton1>
				}
				{process === 'update' 
					&& (writeForm.del_chk === 'Y' && templateOption.disableAllow === 'Y') 
					&& 
					<MuiTheme.ListButton1 onClick={() => { handleRestorePost(writeForm); }}>복구</MuiTheme.ListButton1>
				}
				{process === 'update'
					&& (templateOption.disableAllow === 'N' || (writeForm.del_chk === 'Y' && templateOption.disableAllow === 'Y') )
					&&
					<MuiTheme.ListButton1 onClick={() => { handleDeletePost(writeForm, 'delete'); }}>삭제</MuiTheme.ListButton1>
				}
				<MuiTheme.ListButton1 onClick={() => { backParams('write'); }}>취소</MuiTheme.ListButton1>
			</div>
		</>
	);
}

export default TZEROStandardWriteForm;
