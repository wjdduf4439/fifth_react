import React, { useState } from 'react';

import MuiTheme from 'css/MuiTheme';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useAccessFormContent } from './formContent';
import AccessList from './list';
import AccessWriteForm from './write';
const AccessForm = (props) => {

	const { mediaQuery } = props;

	const [responsiveWebOption, setResponsiveWebOption] = useState({
		containerMarginRight: 'margin_right_100',
		containerMarginLeft: 'margin_left_100',
	});

	const [reload, setReload] = useState(true);
	const [option, setOption] = useState({ startPoint: 0, limit: 10 });
	const [process, setProcess] = useState('write');

	const resultListReset = {
		uid: 0,
		id: '',
		pw: '',
		nick: '',
		email: '',
		role: '',
		authority: '',
		refreshToken: '',
		approve: '',
	}

	const [noAppoveResultList, setNoAppoveResultList] = useState([]);
	const [resultList, setResultList] = useState([resultListReset]);
	const [resultCount, setResultCount] = useState(0);
	const [approveAccountList, setApproveAccountList] = useState([]);

	const [writeForm, setWriteForm] = useState(resultListReset);
	const [showWriteForm, setShowWriteForm] = useState(false);

	const {	
		handleWriteForm,
		handleCount,
	} = useAccessFormContent({
		mediaQuery,
		responsiveWebOption, setResponsiveWebOption,
		process, setProcess,
		resultListReset,
		resultCount, setResultCount,
		writeForm, setWriteForm,
		setShowWriteForm,
	});

	return (
		<>
			<div className="main_container">
				
				<div className={`container ${responsiveWebOption.containerMarginLeft} ${responsiveWebOption.containerMarginRight}`}>
					<div className="content">
						<h1>회원 목록</h1>
					</div>
												
					<AccessList
						mediaQuery={mediaQuery}
						reload={reload} setReload={setReload}
						option={option} setOption={setOption}
						noAppoveResultList={noAppoveResultList} setNoAppoveResultList={setNoAppoveResultList}
						resultList={resultList} setResultList={setResultList}	
						resultCount={resultCount}
						approveAccountList={approveAccountList} setApproveAccountList={setApproveAccountList}
						setShowWriteForm={setShowWriteForm}	
						handleWriteForm={handleWriteForm}
						handleCount={handleCount}
					/>

					<AccessWriteForm
						mediaQuery={mediaQuery}
						reload={reload} setReload={setReload}
						process={process} setProcess={setProcess}
						writeForm={writeForm} setWriteForm={setWriteForm}
						showWriteForm={showWriteForm} setShowWriteForm={setShowWriteForm}	
					/>

				</div>
			</div>
		</>
	);
}

export default AccessForm;