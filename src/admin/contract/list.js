import React, { useState } from 'react';

import MuiTheme from 'css/MuiTheme';

import { RiContractLine } from "react-icons/ri";

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Pagination from 'react-js-pagination';
import Box from '@mui/material/Box';

import { useContractListContent } from './listcontent';

const ContractList = (props) => {

	const [page, setPage] = useState(1);
	// 예시 데이터
	const itemsPerPage = 10;

	const {
		mediaQuery,
		reload, setReload,
		option, setOption,
		resultList, setResultList,
		resultCount,
		handleCount,
	} = props;

	const {
		handlePageChange,
	} = useContractListContent({
		mediaQuery,
		page, setPage,
		reload, setReload,
		option, setOption,
		resultList, setResultList,
		resultCount,
		handleCount,
	});

	return (
		<>
			<List >
				{resultList.map(item => (
					<MuiTheme.ListItem1
						key={item.code} // 고유한 "key" prop 추가
					>
						<ListItemAvatar>
							<RiContractLine className="font_size_26" />
						</ListItemAvatar>
						{/* 방법 1: Box 사용 */}
						<Box display="flex" flexDirection="row">
							<Box flex={2}>
								<MuiTheme.ListItemText1 primary={'연락자 : ' + item.name} data-code={item.code} />
								<MuiTheme.ListItemText1 primary={'제목 : ' + item.subject} />
								<MuiTheme.ListItemText1 primary={'메세지 : ' + item.message} />
								<MuiTheme.ListItemText1 primary={'ip : ' + item.ip} />
							</Box>
						</Box>
					</MuiTheme.ListItem1>
				))}
			</List>

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
		</>
	);
}

export default ContractList;