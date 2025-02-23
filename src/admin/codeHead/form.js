import React, { useState } from 'react';

import MuiTheme from 'css/MuiTheme';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useCodeHeadFormContent } from './formContent';
import { useMenuOptionContext } from './menuOption';
import CodeHeadList from './list';
import CodeWriteForm from './write';

const CodeHeadForm = (props) => {

	const { mediaQuery } = props;

	const [reload, setReload] = useState(true);
	const [option, setOption] = useState({ startPoint: 0, limit: 10 });
	const [process, setProcess] = useState('write');

	const [resultList, setResultList] = useState([]);
	const [resultCount, setResultCount] = useState(0);
	const [writeForm, setWriteForm] = useState({
		uid: 0,
		code: '',
		name: '',
		comment: '',
		del_chk: 'N',
		//해당 코드헤더가 가지는 게시판 타입
		templateType: '',
		//해당 코드헤더가 가지는 스킨 타입
		skinType: '',
		optionContent: '',
		optionExplanation: '',
	});

	const [showWriteForm, setShowWriteForm] = useState(false);
	const [dense, setDense] = useState(false);
	//dense : 글자 위아래 밀도
	const [commentShow, setCommentShow] = useState(true);
	//comment : 부가적인 설명

	const [containerMarginLeft, setContainerMarginLeft] = useState('margin_left_100');
	const [containerMarginRight, setContainerMarginRight] = useState('margin_right_100');

	
	const allowFileType = ['jpg', 'png', 'pdf', 'zip', 'webp', 'java', 'xml', 'jsp', 'class',]; 

	//노드 설정의 템플릿 selectbox 관리
	const {
		siteOptions,
		skinOptions,
		templateComment, setTemplateComment,
	} = useMenuOptionContext({writeForm});

	const {	
		handleWriteForm,
		handleCount,
	} = useCodeHeadFormContent({
		mediaQuery,
		process, setProcess,
		resultCount, setResultCount,
		writeForm, setWriteForm,
		setShowWriteForm,
		containerMarginLeft, setContainerMarginLeft,
		containerMarginRight, setContainerMarginRight,
	});

	return (
		<>
			<div className="main_container">
				
				<div className={`container ${containerMarginLeft} ${containerMarginRight}`}>
					<div className="content">
						<h1>코드헤더 목록</h1>
					</div>
					<FormGroup row>
						<FormControlLabel
							control={
								<MuiTheme.ListItemCheckbox checked={dense} onChange={(event) => setDense(event.target.checked)} />
							}
							label="밀도 조절"
						/>
						<FormControlLabel
							control={
								<MuiTheme.ListItemCheckbox checked={commentShow} onChange={(event) => setCommentShow(event.target.checked)} />
							}
							label="설명 표시"
						/>
						<MuiTheme.ListButton1 onClick={() => { handleWriteForm('write', 0); } }>입력</MuiTheme.ListButton1>
					</FormGroup>

								
					<CodeWriteForm 
						mediaQuery={mediaQuery}
						reload={reload} setReload={setReload}
						process={process} setProcess={setProcess}
						writeForm={writeForm} setWriteForm={setWriteForm}
						showWriteForm={showWriteForm} setShowWriteForm={setShowWriteForm}	
						templateComment={templateComment}
						siteOptions={siteOptions}
						skinOptions={skinOptions}
						allowFileType={allowFileType}
					/>
					

					<CodeHeadList
						mediaQuery={mediaQuery}
						reload={reload} setReload={setReload}
						option={option} setOption={setOption}
						dense={dense}
						resultList={resultList} setResultList={setResultList}	
						resultCount={resultCount}
						setShowWriteForm={setShowWriteForm}	
						commentShow={commentShow}
						handleWriteForm={handleWriteForm}
						handleCount={handleCount}
					/>

				</div>
			</div>
		</>
	);
}

export default CodeHeadForm;