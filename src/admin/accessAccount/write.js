import React, { useState, useEffect, useContext } from 'react';

import MuiTheme from 'css/MuiTheme';
import { ThemeContext } from 'provider/ThemeContext';
import { PiWarning } from "react-icons/pi";

import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


import { useAccessAccountWriteContent } from './writeContent';
import { Button } from '@mui/material';

const AccessWriteForm = (props) => {

	const { mediaQuery } = props;
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

	const [inputWidth, setInputWidth] = useState('width_100per');

	const {
		handleInsertAccessAccount,
		handleUpdateAccessAccount,
		handleRestoreAccessAccount,
		handleDeleteAccessAccount,
	} = useAccessAccountWriteContent({
		mediaQuery,
		reload, setReload,
		process,
		showWriteForm, setShowWriteForm,
		inputWidth, setInputWidth,
	});

	return (
		<>
			{/* onClose속성으로 handleCloseModal을 주지말것 */}
			<Dialog maxWidth="lg" fullWidth open={showWriteForm} onClose={() => { setShowWriteForm(false); }}>
				{/* showWriteForm : {showWriteForm.toString()} */}
				<MuiTheme.DialogContent1>
					<MuiTheme.TextField1 
						label="id"
						value={writeForm.id}
						onChange={(e) => setWriteForm({ ...writeForm, id: e.target.value })} 
						className={`${inputWidth}`}
					/>
					<MuiTheme.TextField1 
						label="닉네임"
						value={writeForm.nick}
						onChange={(e) => setWriteForm({ ...writeForm, nick: e.target.value })} 
						className={`${inputWidth}`}
					/>
					<MuiTheme.TextField1 
						label="이메일"
						value={writeForm.email}
						onChange={(e) => setWriteForm({ ...writeForm, email: e.target.value })} 
						className={`${inputWidth}`}
					/>
					<MuiTheme.TextField1 
						label="role"
						value={writeForm.role}
						onChange={(e) => setWriteForm({ ...writeForm, role: e.target.value })} 
						className={`${inputWidth}`}
					/>

					<FormGroup row>
						<FormControlLabel
							control={
								<MuiTheme.ListItemCheckbox checked={writeForm.approve === 'Y'} onChange={(event) => setWriteForm({ ...writeForm, approve: event.target.checked ? 'Y' : 'N' })} />
							}
							label="회원가입 승인"
						/>
					</FormGroup>
					


					<br />
					{process === 'write' && 								<><MuiTheme.ListButton1 className='margin_bottom_10' onClick={() => { handleInsertAccessAccount(writeForm); }}>등록</MuiTheme.ListButton1> 		{mediaQuery.matches && <br />}</>}
					{process === 'update' && 								<><MuiTheme.ListButton1 className='margin_bottom_10' onClick={() => { handleUpdateAccessAccount(writeForm); }}>수정</MuiTheme.ListButton1> 		{mediaQuery.matches && <br />}</>}
					{process === 'update' && writeForm.del_chk === 'N' && 	<><MuiTheme.ListButton1 className='margin_bottom_10' onClick={() => { handleDeleteAccessAccount(writeForm); }}>비활성화</MuiTheme.ListButton1>	{mediaQuery.matches && <br />}</>}
					{process === 'update' && writeForm.del_chk === 'Y' && 	<><MuiTheme.ListButton1 className='margin_bottom_10' onClick={() => { handleDeleteAccessAccount(writeForm); }}>삭제</MuiTheme.ListButton1>		{mediaQuery.matches && <br />}</> }
					<MuiTheme.ListButton1 className='margin_bottom_10' onClick={() => { setShowWriteForm(false); }}>취소</MuiTheme.ListButton1>
				</MuiTheme.DialogContent1>
			</Dialog>

		</>
	);
}

export default AccessWriteForm;
