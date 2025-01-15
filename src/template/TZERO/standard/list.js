import React, { useState } from 'react';

import MuiTheme from 'css/MuiTheme';
import Loading from 'layout/util/Loading';

import { RiDeleteBin2Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { MdAutoDelete } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";

import { FaFileCode } from "react-icons/fa6";

import FormGroup from '@mui/material/FormGroup';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Pagination from 'react-js-pagination';

import { useTZEROStandardListContent } from './listContent';

const TZEROStandardList = (props) => {

	const [page, setPage] = useState(1);
	// 예시 데이터
	const itemsPerPage = 10;

	const {
		templateOption,
		reload, setReload,
		option, setOption,
		resultList, setResultList,
		resultCount,
		noticeList, setNoticeList,
		setShowWriteForm,
		setShowViewForm,
		setLoadingStatus,
		showListLoading,
		handleCount,
		linkParams,
		backParams,
	} = props;

	const {
		handlePageChange,
	} = useTZEROStandardListContent({
		page, setPage,
		reload, setReload,
		setShowWriteForm,
		setLoadingStatus,
		option, setOption,
		resultList, setResultList,
		noticeList, setNoticeList,
		handleCount,
	});

	/*
		만약 list 페이지에서 글쓰기 버튼을 클릭해서 setId, setProcess 값을 변경하면 
		form 페이지에서 글쓰기 버튼을 클릭해서 글쓰기 페이지로 이동할때 
		linkParams 함수가 호출되지 않는 문제가 있음. 
		왜냐하면 list 페이지에서 변경하는 id, process 값이 
		form 페이지에서 변경하는 id, process 값과 다른 props 값이기 때문임.
		이런 문제를 해결하기 위해서는 form.js 페이지에서 사용하는 linkParams 함수를 호출해서 
		form.js 페이지에서 사용하는 id, process 값을 변경해야 함.
		이때, 한번의 랜더링으로 페이지를 로드해야 뒤로가기 한번에 화면 한번이 바뀔수 있음. 
		변수 하나당 의존성 배열을 설정하면 여러번 뒤로가기를 눌러야 한다.
	*/
	return (
		<>

			{templateOption.noticeShow === 'Y' && noticeList.length > 0 ?
				<>
					<List>
						{noticeList.map((item) => (
							<MuiTheme.ListItem1
								key={item.uid} // 고유한 "key" prop 추가
								secondaryAction={item.secondaryButton}
								onClick={() => { item.uid && linkParams('view', item.uid); }}
							>
								<ListItemAvatar>
									<IoMdNotifications className="font_size_26" />
								</ListItemAvatar>
								<MuiTheme.ListItemText1
									primary={<>
										{item.title.substring(0, 3) == '스포)' ? 
											<><span style={{ color: 'var(--spoiler-color)' }}>스포)</span>{item.title.substring(3)}</> : item.title}
										{item.del_chk === 'Y' ? <MdAutoDelete className='font_size_18 margin_left_10' style={{ color: 'red' }} /> : null}
									</>}
									data-uid={item.uid}
								/>
							</MuiTheme.ListItem1>
						))}
					</List>
					<hr style={{ border: '1px solid var(--background-border-color)' }} />
				</>
			: null}
			<List>
				{showListLoading? <Loading /> : (
					<>
						{resultList.length > 0 && resultList.map((item) => (
							<MuiTheme.ListItem1
								key={item.uid} // 고유한 "key" prop 추가
								secondaryAction={item.secondaryButton}
								onClick={() => { item.uid && linkParams('view', item.uid); }}
							>
								<ListItemAvatar>
									<FaFileCode className="font_size_26" />
								</ListItemAvatar>
								<MuiTheme.ListItemText1
									primary={<>
										{item.title.substring(0, 3) == '스포)' ? 
											<><span style={{ color: 'var(--spoiler-color)' }}>스포)</span>{item.title.substring(3)}</> : item.title}
										{item.del_chk === 'Y' ? <MdAutoDelete className='font_size_18 margin_left_10' style={{ color: 'red' }} /> : null}
									</>}
									data-uid={item.uid}
								/>
							</MuiTheme.ListItem1>
						))}
						{resultList.length === 0 ?
								<MuiTheme.ListItem1>
									<ListItemAvatar>
										등록되어 있는 게시물이 없습니다.
									</ListItemAvatar>
								</MuiTheme.ListItem1>
							: null
						}
					</>
				)}
			</List>
			<FormGroup row>
				<MuiTheme.ListButton1 onClick={() => { linkParams('write', 0); } }>글쓰기</MuiTheme.ListButton1>
			</FormGroup>

			{resultCount > 0 ?
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
					className="pagination"
				/>
			: null}
		</>
	);
}

export default TZEROStandardList;