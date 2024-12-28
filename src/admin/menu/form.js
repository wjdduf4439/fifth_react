import React, { useState, useEffect, } from 'react';

import MuiTheme from 'css/MuiTheme';
import AdminMenuTheme from 'css/admin/AdminMenuTheme';

import Checkbox from '@mui/material/Checkbox';

import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useMenuFormContent } from './formContent';
import RightClickMenu from './rightClickMenu';

const MenuForm = (props) => {


	//tree reload를 위해서 여기 배치해야 한다.
	const [reload, setReload] = useState(true);
	const [menuDataVO, setMenuDataVO] = useState({
		code: '',
		title: '',
		path:'',
		del_chk: '',
		sort: '',
		templateType: '',
		targetOption: '',
		maxFileUploadNumber: '',
		fileUploadType: '',
		//fileUploadTypeArr 키는 아무 쓸모 없지만, 그냥 문자열과 문자열 배열의 연계를 하고 싶었다
		fileUploadTypeArr: [],
	});
	const [getNodeTemplateType, setGetNodeTemplateType] = useState('');

	//드래그 대상이 된 노드 상태
	const [dragOverNode, setDragOverNode] = useState(0);

	const {	
		menuDataList,
		contextMenu, setContextMenu,
		isNodeImplement,
		renderTree,
		handleClose,
		handleCreate,
		handleRename,
		handleUpdate,
		handleMenuDataChange,
		handleContextMenu,
		updateContext,
	} = useMenuFormContent({
		reload, setReload,
		menuDataVO, setMenuDataVO,
		getNodeTemplateType, setGetNodeTemplateType,
		dragOverNode, setDragOverNode,
	});
	
	// useEffect(() => {
	// 	if (menuDataList.length > 0) {
	// 		// menuDataList가 업데이트되었을 때 renderTree가 제대로 호출되는지 확인
	// 		console.log("menuDataList가 업데이트됨: ", menuDataList);
	// 	}
	// }, [menuDataList]);

	return (
		<>
			<div className="main_container">
				
				<div className="container margin_left_100 margin_right_100">
					<div className="content">
						<h1>메뉴 설정 목록</h1>
					</div>

					<div className="position_relative">
						
						<ul className='menu_depth1'>
							<li>
								<MuiTheme.CustomBox onClick={handleClose} onContextMenu={handleContextMenu}>
									{/*
										1. 처음 생성 버튼을 누를시 DB에 새 메뉴라는 데이터를 입력한다
										1-2. 새 메뉴의 내용을 수정해서 내용을 등록하는게 목표
										2. 새 메뉴의 templateName값이 처음 정해지면, 수정 작업에서는 더이상 변경 못하게 한다
										3. 처음 삭제 시에는 disable, 두번째 삭제 시에는 delete한다
										4. visible 옵션을 추가한다.
									*/}
									
									<h4>등록 메뉴 목록</h4>
									{menuDataList.length > 0 && (
										<>
											<ul className='treeMenu_wrap' onDragLeave={() => setDragOverNode(0)}>
												{menuDataList.map((menu) => renderTree(menu))}
											</ul>
										</>
									)}
									{menuDataList.length === 0 && (
										<div>등록된 메뉴가 없습니다.</div>
									)}
									
								</MuiTheme.CustomBox>
							</li>
							<li>

								<MuiTheme.MenuInfoBox>

									<h4>메뉴 정보</h4>
									<form name='upload_form'>
								
										<input type='hidden' name='siteCode' value={menuDataVO.siteCode} />
										<label htmlFor='title'>메뉴명 : </label>
										<input style={{width: '80%'}} placeholder='title' id='title' name='title' value={menuDataVO.title} onChange={handleMenuDataChange} /><br />
										<label htmlFor='path'>경로 : </label>
										<input style={{width: '80%'}} placeholder='path' id='path' name='path' value={menuDataVO.path} onChange={handleMenuDataChange} /><br />
										<br />
										<FormControlLabel
											control={
												<Checkbox id="targetOption_blank" name="targetOption" checked={menuDataVO.targetOption === '_blank'? true : false } onChange={handleMenuDataChange} value='_blank' color="primary" />
											}
											label=" : 새 창"
										/>
										<FormControlLabel
											control={
												<Checkbox id="targetOption_self" name="targetOption" checked={menuDataVO.targetOption === '_self'? true : false } onChange={handleMenuDataChange} value='_self' color="primary" />
											}
											label=" : 현재 창"
										/>
										<br />
										{/* 
											절묘하게도, menuDataVO.templateType이 설정되어 있지 않으면 null값을 반환하기 때문에, disabled속성이 정상적으로 동작한다
											템플릿타입을 처음 수정할 때면 해당 SELECT태그를 열어둔다 
										*/}
										{/*
										<label htmlFor='templateType'>타입 : </label>
										<span>
											{
												menuDataVO.templateType == undefined || menuDataVO.templateType == null || menuDataVO.templateType === ''?
												'한번 정한 템플릿 타입은 다시 바꿀 수 없습니다.' : templateComment
											}
										</span><br />
										<select	id='templateType' name='templateType' 
												value={menuDataVO.templateType}
												onChange={handleMenuDataChange} 
												disabled={isNodeImplement}
												className='mr50'>
												
											<option value=''>미설정</option>
											{siteOptions.map(option => (
												<option key={option.code} value={option.code} >
													{option.formName}
												</option>
											))}
										</select>
										<label htmlFor='maxFileUploadNumber'>첨부파일 허용 업로드 수 : 비어 있을시 0으로 등록됨</label><br />
										<input type='number' placeholder='maxFileUploadNumber' id='maxFileUploadNumber' name='maxFileUploadNumber' value={menuDataVO.maxFileUploadNumber} onChange={handleMenuDataChange} />
										<br />
										
										<label htmlFor='templateType'>첨부파일 허용 타입 : {`${menuDataVO.fileUploadTypeArr}`}</label><br />
										{allowFileType.map(fileType => {
											return(
												<FormControlLabel
													key={fileType}
													control={
														<Checkbox id={`zip${fileType}`} name="fileUploadType" checked={menuDataVO.fileUploadType.includes(`${fileType}`)? true : false } onChange={handleMenuDataChange} value={`${fileType}`} color="primary" />
													}
													label={`${fileType}`}
												/>	
											);
										})}
										*/}
										<div>
											<MuiTheme.ListButton1 variant="menu-update" onClick={() => handleUpdate()}>
												수정
											</MuiTheme.ListButton1>
										</div>	
									</form>

								</MuiTheme.MenuInfoBox>
							
								<RightClickMenu
									xPos={contextMenu.xPos}
									yPos={contextMenu.yPos}
									showMenu={contextMenu.show}
									uid={contextMenu.uid}
									pCode={contextMenu.pCode}
									depth={contextMenu.depth}
									handleCreate={handleCreate}
									handleRename={handleRename}
								/>
								
							</li>
						</ul>

					</div>


				</div>
			</div>
		</>
	);
}

export default MenuForm;