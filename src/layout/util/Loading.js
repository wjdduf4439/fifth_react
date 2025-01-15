import React, { useContext } from 'react';

import 'css/layout/LoadingStyle.css';

import { ThemeContext } from 'provider/ThemeContext';

const Loading = () => {

	const { isDarkMode } = useContext(ThemeContext);

	return (
		<>
			
			<div className="background_spinner">
				<img src={isDarkMode ? "/image/darkmode_spinner.gif" : "/image/spinner.gif"} alt="로딩중" />

				<div className="loading-text">
					잠시만 기다려 주세요.
				</div>
			</div>
		</>
	);
};

export default Loading;