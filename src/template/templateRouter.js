import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';  // useSearchParams 추가
import { useAxios } from 'provider/AxiosProvider';

import 'css/template/standard.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Loading from 'layout/util/Loading';
import TZEROStandardForm from 'template/TZERO/standard/form';

function TemplateRouter(props) {

	const { environment } = props;

	// URL의 'code' 값을 가져옴
	const { codeHead } = useParams();
	const [searchParams] = useSearchParams();  // 추가

	const axiosInstance = useAxios();

	const [templateName, setTemplateName] = useState('');
	const [templateType, setTemplateType] = useState('');
	const [skinType, setSkinType] = useState('');
	const [templateOption, setTemplateOption] = useState({
		disableAllow: 'N',	// disableAllow : 게시판이 비활성화 과정을 거칠 후 삭제될지, 비활성화 과정 없이 삭제될지를 결정합니다.
		placeRow: 0,	// placeRow : 게시판 표시할 template post 테이블의 행 번호를 지정합니다.
		placeName: '',	// placeName : 게시판에 표시할 필드의 이름을 지정합니다.
		placeWidth: 0,	// placeWidth : 게시판의 너비를 지정합니다.
		maxFileUploadNumber: 1,	// maxFileUploadNumber : 업로드 가능한 최대 파일 개수를 지정합니다.
		fileUploadType: '',	// fileUploadType : 업로드 가능한 파일 형식을 지정합니다 (예: jpg,png,pdf).
		replyLimit: 0,	// replyLimit : 한 게시물의 댓글 표시 가능 개수를 지정합니다.
		noticeShow: 'N',	// noticeLimit : 게시판의 공지사항 표시 설정/표시 여부를 결정합니다.
		viewUnderListShow: 'N',	// viewUnderListShow : 게시판 조회화면 아래의 리스트 표시 여부를 결정합니다.
	});

	const [showWriteForm, setShowWriteForm] = useState(false);
	const [showViewForm, setShowViewForm] = useState(false);
	const [showListLoading, setShowListLoading] = useState(false);
	const [showWriteLoading, setShowWriteLoading] = useState(false);
	const [showViewLoading, setShowViewLoading] = useState(false);


	let id = searchParams.get('id');
	let process = searchParams.get('process');

	const getTemplateCodeHeadOption = (codeHead) => {
		axiosInstance.post('/api/template/codeHead/one', { code : codeHead })
		.then(response => {
			const data = response.data;
			if (data.result) {
				setTemplateName(data.resultList.name);
				setTemplateType(data.resultList.templateType);
				setSkinType(data.resultList.skinType);
				setTemplateOption(JSON.parse(data.resultList.optionContent));
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	}

	const setLoadingStatus = (showLoading, process) => {
		if (process === 'list') setShowListLoading(showLoading);
		else if (process === 'write') setShowWriteLoading(showLoading);
		else if (process === 'view') setShowViewLoading(showLoading);
	}

	useEffect(() => {
		getTemplateCodeHeadOption(codeHead);

		setShowWriteForm(false);
		setShowViewForm(false);
		// URL에서 id 파라미터 확인
		id = searchParams.get('id');
		process = searchParams.get('process');

		if (process === 'write') setShowWriteForm(true);
		else if (process === 'view') setShowViewForm(true);
		else if (process === 'update') setShowWriteForm(true);

	}, [codeHead, process]);

	return (
	  <>
		
		{/* <h1>Template Page</h1> */}
		{/* <p>templateType: {templateType}</p>
		<p>skinType: {skinType}</p>
		<p>codeHead: {codeHead}</p>
		<p>templateOption: 
		{Object.keys(templateOption).map(key => (
			<div className="margin_left_150" key={key}>{key}: {templateOption[key]}</div>
		))}
		</p> */}
		{/* 		
		<p>id: {searchParams.get('id')}</p>
		<p>process: {searchParams.get('process')}</p>		
		<p>showListLoading: {showListLoading.toString()}</p>
		<p>showWriteLoading: {showWriteLoading.toString()}</p>
		<p>showViewLoading: {showViewLoading.toString()}</p> */}

		{templateType === 'TZERO' && skinType === 'STANDARD' && 
			<TZEROStandardForm
				environment={environment}
				templateName={templateName}
				templateOption={templateOption} codeHead={codeHead} 
				showWriteForm={showWriteForm} setShowWriteForm={setShowWriteForm}
				showViewForm={showViewForm} setShowViewForm={setShowViewForm}
				setLoadingStatus={setLoadingStatus}
				showListLoading={showListLoading}
				showWriteLoading={showWriteLoading}
				showViewLoading={showViewLoading}
				/>
		}
	  </>
	);
  }

export default TemplateRouter;