import React, { useState } from 'react';

import MuiTheme from 'css/MuiTheme';

import { RiDeleteBin2Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { MdAutoDelete } from "react-icons/md";

import { IoManSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from 'react-js-pagination';

import { useCodeHeadListContent } from './listcontent';

const AccessList = (props) => {

	const {
		mediaQuery,
		reload, setReload,
		option, setOption,
		noAppoveResultList, setNoAppoveResultList,
		resultList, setResultList,	
		resultCount,
		approveAccountList, setApproveAccountList,
		setShowWriteForm,	
		handleWriteForm,
		handleCount,	
	} = props;

	const [page, setPage] = useState(1);
	// 예시 데이터
	const itemsPerPage = 10;

	const {
		handlePageChange,
		handleApproveAccountList,
		handleApproveAccountListAll,
		handleApproveAccount,
	} = useCodeHeadListContent({
		page, setPage,
		reload, setReload,
		setShowWriteForm,
		option, setOption,
		noAppoveResultList, setNoAppoveResultList,
		resultList, setResultList,
		approveAccountList, setApproveAccountList,
		handleWriteForm,
		handleCount,
	});

	return (
		<>
			<h3>승인 대기 회원 목록 : {approveAccountList.toString()}</h3>
			<MuiTheme.ListButton1 
				className='margin_bottom_10'
				onClick={() => { handleApproveAccountListAll(); }}>전체선택</MuiTheme.ListButton1>
			<List dense={true}>
				{noAppoveResultList.map((item) => (
					<MuiTheme.ListItem1
						key={item.uid} // 고유한 "key" prop 추가
						secondaryAction={item.secondaryButton}
						onClick={() => { handleApproveAccountList(item.uid); }}
					>
						<FormControlLabel
							control={
								<MuiTheme.ListItemCheckbox
									checked={ approveAccountList.includes(item.uid) }
									onChange={(event) => {
										handleApproveAccountList(item.uid);
									}}
								/>
							}
						/>
						<ListItemAvatar>
							<IoManSharp className="font_size_26" />
						</ListItemAvatar>
						<MuiTheme.ListItemText1
							primary={<>
								{item.id}
								<FaCheck className='font_size_18 margin_left_10' style={{ color: 'red' }} />
							</>}
							secondary={''}
							data-uid={item.uid}
						/>
					</MuiTheme.ListItem1>
				))}
				{	
					noAppoveResultList.length === 0 ?
						<MuiTheme.ListItem1>
							<ListItemAvatar>
								 - 없음 -
							</ListItemAvatar>
						</MuiTheme.ListItem1>
					: null
				}
			</List>
			<MuiTheme.ListButton1 
				className='margin_bottom_10'
				onClick={() => { handleApproveAccount(approveAccountList); }}>승인</MuiTheme.ListButton1>

			<h3>등록된 회원 목록</h3>
			<List dense={true}>
				{resultList.map((item) => (
					<MuiTheme.ListItem1
						key={item.uid} // 고유한 "key" prop 추가
						secondaryAction={item.secondaryButton}
						onClick={() => { handleWriteForm('update', item.uid); }}
						className='margin_bottom_10'
					>
						<ListItemAvatar>
							<IoManSharp className="font_size_26" />
						</ListItemAvatar>
						<MuiTheme.ListItemText1
							primary={<>
								{item.id}
								{/* {item.approve === 'Y' ? <MdAutoDelete className='font_size_18 margin_left_10' style={{ color: 'red' }} /> : null} */}
							</>}
							secondary={''}
							data-uid={item.uid}
						/>
					</MuiTheme.ListItem1>
				))}
				{	
					resultList.length === 0 ?
						<MuiTheme.ListItem1>
							<ListItemAvatar>
								등록되어 있는 코드헤더가 없습니다.
							</ListItemAvatar>
						</MuiTheme.ListItem1>
					: null
				}
			</List>

			{resultCount > 0 ?
				<div className={`${mediaQuery.matches ? 'margin_left_-55' : ''}`}>
					<Pagination
						//현재 페이지 번호
					activePage={page}
					//한 페이지에 보여줄 실제 데이터 아이템의 개수
					itemsCountPerPage={itemsPerPage}
					//전체 데이터 수
					totalItemsCount={resultCount}
					//화면에 보여질 페이지 번호의 개수를 의미합니다
					pageRangeDisplayed={10}
					onChange={handlePageChange}
					className={`pagination`}
					/>
				</div>
			: null}
		</>
	);
}

export default AccessList;