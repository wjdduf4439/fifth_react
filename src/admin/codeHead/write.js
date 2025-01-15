import React, { useState, useEffect, useContext } from 'react';

import MuiTheme from 'css/MuiTheme';
import { ThemeContext } from 'provider/ThemeContext';
import { PiWarning } from "react-icons/pi";

import Editor, { loader } from '@monaco-editor/react';

import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


import { useCodeHeadWriteContent } from './writeContent';
import { useMenuOptionContext } from './menuOption';
import { Button } from '@mui/material';

const CodeWriteForm = (props) => {

	const { isDarkMode } = useContext(ThemeContext);

	const {
		reload, setReload,
		process, setProcess,
		writeForm, setWriteForm,
		showWriteForm, setShowWriteForm,
		templateComment,
		siteOptions,
		skinOptions,
		allowFileType,
	} = props;

	const {
		handleInsertCodeHead,
		handleUpdateCodeHead,
		handleRestoreCodeHead,
		handleDeleteCodeHead,
	} = useCodeHeadWriteContent({
		reload, setReload,
		process,
		showWriteForm, setShowWriteForm,
	});
	
    // 사용자 정의 테마 설정
	// 그외설정은 /css/admin/CodeHead.css에 있음
    useEffect(() => {

        const cursorColor = isDarkMode  ? '#d8bbff' : '#01771f';

        loader.init().then(monaco => {
            monaco.editor.defineTheme('editorTheme', {
                base: isDarkMode ? 'vs-dark' : 'hc-black', // 기본 테마를 선택합니다. 'vs', 'vs-dark', 'hc-black' 중 하나
                inherit: true, // 기본 테마로부터 상속할지 여부
                rules: [],
                colors: {
					'editor.background': isDarkMode ? '#111111' : '#aaaaaa', // 원하는 배경색으로 변경
					'editorCursor.foreground': cursorColor, // 커서 색상 설정
                }
            });
        });
    }, [isDarkMode]);

	return (
		<>
			{/* onClose속성으로 handleCloseModal을 주지말것 */}
			<Dialog maxWidth="lg" fullWidth open={showWriteForm} onClose={() => { setShowWriteForm(false); }}>
				{/* showWriteForm : {showWriteForm.toString()} */}
				<MuiTheme.DialogContent1>
					<MuiTheme.TextField1 
						label="코드(대문자)"
						value={writeForm.code}
						onChange={(e) => setWriteForm({ ...writeForm, code: e.target.value.toUpperCase() })} 
					/>
					<MuiTheme.TextField1 
						label="이름"
						value={writeForm.name}
						onChange={(e) => setWriteForm({ ...writeForm, name: e.target.value })} 
					/>
					<MuiTheme.TextField1 
						label="주석"
						value={writeForm.comment}
						onChange={(e) => setWriteForm({ ...writeForm, comment: e.target.value })} 
					/>

					{/* <label htmlFor='templateType'>템플릿 타입 : </label> */}
					<div className='margin_left_10' >
						{
							writeForm.templateType == undefined || writeForm.templateType == null || writeForm.templateType === ''?
								<>
									<PiWarning/> 한번 정한 템플릿 타입은 다시 바꿀 수 없습니다.
								</> : <>
									<PiWarning/> {templateComment}
								</>
						}
					</div>
					<Box sx={{ display: 'flex', gap: 2 }}>  {/* 수평 컨테이너 추가 */}
						<FormControl sx={{ minWidth: '49%' }} variant="outlined">
							<MuiTheme.InputLabel1 id="templateType-label">템플릿 타입{ process === 'update' ? ' - 수정불가' : '' }</MuiTheme.InputLabel1>
							<MuiTheme.Select1
								value={writeForm.templateType ? writeForm.templateType : ""}
								onChange={(e) => {setWriteForm({ ...writeForm, templateType: e.target.value });}} 
								labelId="templateType-label"
								id="templateType"
								name="templateType"
								disabled={process === 'update'}
							>
								{siteOptions.map(option => (
									<MenuItem key={option.code} value={option.code} >
										{option.formName}
									</MenuItem>
								))}
							</MuiTheme.Select1>
						</FormControl>
						<FormControl sx={{ minWidth: '48%' }} variant="outlined">
							<MuiTheme.InputLabel1 id="skinType-label">스킨 타입</MuiTheme.InputLabel1>
							<MuiTheme.Select1
								value={writeForm.skinType ? writeForm.skinType : ""}
								onChange={(e) => {setWriteForm({ ...writeForm, skinType: e.target.value });}} 
								labelId="skinType-label"
								id="skinType"
								name="skinType"
								disabled={writeForm.templateType === undefined || writeForm.templateType === null || writeForm.templateType === '' ? true : false}
							>
								{skinOptions.map(option => (
									option.tcode === writeForm.templateType && (
										<MenuItem key={option.code} value={option.code} >{option.skinName}</MenuItem>
									)
								))}
							</MuiTheme.Select1>
						</FormControl>
					</Box>
					
					{process === 'update' && 
						<div className='margin_top_10'>
							옵션 보기
							<Editor
								height="200px"
								defaultLanguage="json"
								value={writeForm.optionContent}
								onChange={(value) => setWriteForm({ ...writeForm, optionContent: value })}
								theme="editorTheme" // 사용자 정의 테마 적용
								/>
							<div className='margin_top_10'>
								disableAllow : 게시판이 비활성화 과정을 거칠 후 삭제될지, 비활성화 과정 없이 삭제될지를 결정합니다.<br/>
								placerow : 게시판 표시할 template post 테이블의 행 번호를 지정합니다.<br/>
								placeName : 게시판에 표시할 필드의 이름을 지정합니다.<br/>
								placewidth : 게시판의 너비를 지정합니다.<br/>
								maxFileUploadNumber : 업로드 가능한 최대 파일 개수를 지정합니다.<br/>
								fileUploadType : 업로드 가능한 파일 형식을 지정합니다 (예: jpg,png,pdf).<br/>
								replyLimit : 한 게시물의 댓글 표시 가능 개수를 지정합니다.<br/>
								noticeLimit : 게시판의 공지사항 표시 설정/표시 여부를 결정합니다.<br/>
								viewUnderListShow : 게시판 조회화면 아래의 리스트 표시 여부를 결정합니다.<br/>
							</div>
						</div>
						
					}

					<br />
					{process === 'write' && <MuiTheme.ListButton1 onClick={() => { handleInsertCodeHead(writeForm); }}>등록</MuiTheme.ListButton1>}
					{process === 'update' && <MuiTheme.ListButton1 onClick={() => { handleUpdateCodeHead(writeForm); }}>수정</MuiTheme.ListButton1>}
					{process === 'update' && writeForm.del_chk === 'N' && <MuiTheme.ListButton1 onClick={() => { handleDeleteCodeHead(writeForm); }}>비활성화</MuiTheme.ListButton1>}
					{process === 'update' && writeForm.del_chk === 'Y' && <MuiTheme.ListButton1 onClick={() => { handleRestoreCodeHead(writeForm); }}>복구</MuiTheme.ListButton1>}
					{process === 'update' && writeForm.del_chk === 'Y' && <MuiTheme.ListButton1 onClick={() => { handleDeleteCodeHead(writeForm); }}>삭제</MuiTheme.ListButton1>}
					<MuiTheme.ListButton1 onClick={() => { setShowWriteForm(false); }}>취소</MuiTheme.ListButton1>
				</MuiTheme.DialogContent1>
			</Dialog>

		</>
	);
}

export default CodeWriteForm;
