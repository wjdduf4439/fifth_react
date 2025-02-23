import React, { useState } from 'react';

import MuiTheme from 'css/MuiTheme';

import { RiDeleteBin2Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { MdAutoDelete } from "react-icons/md";

import { FaFileCode } from "react-icons/fa6";

import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Pagination from 'react-js-pagination';

import { useCodeHeadListContent } from './listcontent';

const CodeHeadList = (props) => {

	const { mediaQuery } = props;

	const [page, setPage] = useState(1);
	// 예시 데이터
	const itemsPerPage = 10;

	const {
		reload, setReload,
		option, setOption,
		dense,
		resultList, setResultList,
		resultCount,
		setShowWriteForm,
		commentShow,
		handleWriteForm,
		handleCount,
	} = props;

	const {
		handlePageChange,
	} = useCodeHeadListContent({
		page, setPage,
		reload, setReload,
		setShowWriteForm,
		option, setOption,
		resultList, setResultList,
		commentShow,
		handleWriteForm,
		handleCount,
	});

	return (
		<>
			<List dense={dense}>
				{resultList.map((item) => (
					<MuiTheme.ListItem1
						key={item.uid} // 고유한 "key" prop 추가
						secondaryAction={item.secondaryButton}
						onClick={() => { item.uid && handleWriteForm('update', item.uid); }}
					>
						<ListItemAvatar>
							<FaFileCode className="font_size_26" />
						</ListItemAvatar>
						<MuiTheme.ListItemText1
							primary={<>
								{item.name}
								{item.del_chk === 'Y' ? <MdAutoDelete className='font_size_18 margin_left_10' style={{ color: 'red' }} /> : null}
							</>}
							secondary={commentShow ? item.comment : null}
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

export default CodeHeadList;