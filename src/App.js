import logo from './logo.svg';

import React, { Component, useEffect, useState } from 'react'; //리액트 기본 컴포넌트 가져오기
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import 'css/Animation.css';
import 'css/Content.css';
import 'css/Layout.css';
import 'css/Color_layout.css';
import 'css/Font.css';
import 'css/Left_Menu_Content.css';
import 'css/admin/Menu.css';
import 'css/admin/CodeHead.css';
import 'css/Top_Menu_Content.css';
import 'css/Underline_box.css';
import 'css/Pagination.css';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import 'css/SlickSlider.css';
import MuiTheme from 'css/MuiTheme';

import { AccessProvider } from './provider/AccessProvider';
import { ThemeProvider } from './provider/ThemeContext';
import { AxiosProvider } from './provider/AxiosProvider';

import UserMenu from 'layout/UserMenu';
import Main from 'home/main'; // 절대 경로 사용
import StringTool from 'tool/stringTool/stringTool'; // 절대 경로 사용
import TodayWeather from 'tool/todayWeather/todayWeather'; // 절대 경로 사용
import CodeHeadForm from 'admin/codeHead/form';
import ContractForm from 'admin/contract/form';
import MenuForm from 'admin/menu/form';

import TemplateRouter from 'template/templateRouter';

function App() {
  return (
	<AccessProvider>
		<ThemeProvider>
			<AxiosProvider>
				<Router>
					<>
						<UserMenu />
						<Routes>
						<Route path="/" element={<Main />} /> {/* JSX 형태로 수정 */}
						<Route path="/tool/stringTool" element={<StringTool />} />
						<Route path="/tool/todayWeather" element={<TodayWeather />} />
						<Route path="/admin/codeHead" element={<CodeHeadForm />} />
						<Route path="/admin/contract" element={<ContractForm />} />
						<Route path="/admin/menu" element={<MenuForm />} />
						<Route path="/template/:codeHead" element={<TemplateRouter />} />
						</Routes>
					</>
			</Router>
			</AxiosProvider>
		</ThemeProvider>
	</AccessProvider>
  );
}

export default App;
