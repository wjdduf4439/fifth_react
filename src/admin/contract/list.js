import React, { useState } from 'react';

import MuiTheme from 'css/MuiTheme';

import { RiContractLine } from "react-icons/ri";

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Pagination from 'react-js-pagination';

import { useContractListContent } from './listcontent';

const ContractList = (props) => {

	const [page, setPage] = useState(1);
	// 예시 데이터
	const itemsPerPage = 10;

	const {
		reload, setReload,
		option, setOption,
		resultList, setResultList,
		resultCount,
		handleCount,
	} = props;

	const {
		handlePageChange,
	} = useContractListContent({
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
						{/* 방법 1: Grid 사용 */}
						<Grid container>
							<Grid item xs={2}>
								<MuiTheme.ListItemText1 primary={item.name} data-code={item.code} />
							</Grid>
							<Grid item xs={2}>
								<MuiTheme.ListItemText1 primary={item.subject} />
							</Grid>
							<Grid item xs={6}>
								<MuiTheme.ListItemText1 primary={item.message} />
							</Grid>
							<Grid item xs={2}>
								<MuiTheme.ListItemText1 primary={item.ip} />
							</Grid>
						</Grid>
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