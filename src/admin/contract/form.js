import React, { useState } from 'react';

import MuiTheme from 'css/MuiTheme';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useContractFormContent } from './formContent';

import ContractList from './list';

const ContractForm = (props) => {

	const { mediaQuery } = props;

	const [reload, setReload] = useState(true);
	const [option, setOption] = useState({ startPoint: 0, limit: 10 });
	const [process, setProcess] = useState('write');

	const [resultList, setResultList] = useState([]);
	const [resultCount, setResultCount] = useState(0);

	const [containerMarginLeft, setContainerMarginLeft] = useState('margin_left_100');
	const [containerMarginRight, setContainerMarginRight] = useState('margin_right_100');

	const {	
		handleCount,
	} = useContractFormContent({
		mediaQuery,
		process, setProcess,
		resultCount, setResultCount,
		containerMarginLeft, setContainerMarginLeft,
		containerMarginRight, setContainerMarginRight,
	});

	return (
		<>
			<div className="main_container">
				
				<div className={`container ${containerMarginLeft} ${containerMarginRight}`}>
					<div className="content">
						<h1>들어온 연락 목록</h1>
					</div>


					<ContractList	
						mediaQuery={mediaQuery}
						key={'contractList'}
						reload={reload} setReload={setReload}
						option={option} setOption={setOption}
						resultList={resultList} setResultList={setResultList}	
						resultCount={resultCount}
						handleCount={handleCount}
					/>

				</div>
			</div>
		</>
	);
}

export default ContractForm;