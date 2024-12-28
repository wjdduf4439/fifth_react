import React, { useState, useContext } from 'react';
import { ThemeContext } from 'provider/ThemeContext';

import { FaHome } from "react-icons/fa"
import { FaRegLightbulb, FaLightbulb  } from "react-icons/fa6";
import { RxEnter } from "react-icons/rx";
import { MdOutlineSegment } from "react-icons/md";

import MuiTheme from 'css/MuiTheme';
import LoginModal from 'layout/loginModal/LoginModal';
import ProfileModal from 'layout/profile/ProfileModal';

import { AccessContext } from 'provider/AccessProvider';
import { useTopMenuContext } from './TopMenuContext';

const TopMenu = (props) => {

	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	const { accessToken, refreshToken } = useContext(AccessContext);	

	const [isTopMenuDropdownVisible, setIsTopMenuDropdownVisible] = useState(false);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
	const [isRightMenuVisible, setIsRightMenuVisible] = useState(false);
	const [isRightMenuVisibleValue, setIsRightMenuVisibleValue] = useState('hidden');

	const [openRightMenus, setOpenRightMenus] = useState({});
	const [topMenuDataList, setTopMenuDataList] = useState([]);

	const { 
		handleLoginButtonClick, 
		handleCloseModal, 
		handleRightMenu, 
		handleRightMenuToggle 
	} = useTopMenuContext({
		setIsTopMenuDropdownVisible,
		setIsLoginModalVisible,
		setIsProfileMenuVisible,
		isRightMenuVisible, setIsRightMenuVisible,
		setIsRightMenuVisibleValue,
		setOpenRightMenus,
		topMenuDataList, setTopMenuDataList,
	});

	return (
		// React.Fragment는 여러 자식 요소를 그룹화하는 데 사용되며, 불필요한 DOM 노드를 추가하지 않습니다.
		<>
			<div className="sidebar_top position_sticky"
				onMouseEnter={() => setIsTopMenuDropdownVisible(true)} 
				onMouseLeave={() => setIsTopMenuDropdownVisible(false)}>
				<div
					className="dropdown_content_main margin_top_10 margin_left_20 font_size_20" >
					<ul>
						{Array.isArray(topMenuDataList) && topMenuDataList.map((menu) => (
							<li key={`${menu.uid}`}>
								<a href={`${menu.path}`} target={menu.targetOption}>{menu.title}</a>
							</li>
						))}
						<li><a href="#menu3">기타 도구</a></li>
					</ul>
					<div className='login_button' >
						<MuiTheme.TopMenuButton 
							className="position_relative"
							onClick={() => window.open('/', '_blank', 'noopener,noreferrer')}
							> 
							<FaHome />
						</MuiTheme.TopMenuButton>
						<span className='margin_left_20'></span>
						<MuiTheme.TopMenuButton 
							className="position_relative"
							onClick={() => toggleTheme()}
							> 
							{/* {isDarkMode ? <FaRegLightbulb /> : <FaLightbulb />} */}
							<FaLightbulb />
						</MuiTheme.TopMenuButton>

						{!localStorage.getItem('accessToken') && (
							<>
								<span className='margin_left_20'></span>
								<MuiTheme.TopMenuButton 
									className="position_relative"
									onClick={() => handleLoginButtonClick()}
									> 
									<RxEnter />
								</MuiTheme.TopMenuButton>
							</>
						)}
						

						{localStorage.getItem('accessToken') && (
							<>
								<span className='margin_left_30'></span>
								<img src="/image/profile.jpg" alt="프로필 사진" className='login_profile_img position_relative' onClick={() => setIsProfileMenuVisible(!isProfileMenuVisible)}/>
								
								<span className='margin_left_20'></span>
								<MuiTheme.TopMenuButton 
									className="position_relative"
									onClick={() => handleRightMenu()}
									> 
									<MdOutlineSegment />
								</MuiTheme.TopMenuButton>
							</>
						)}
						
					</div>
				</div>
				{isTopMenuDropdownVisible && (
					<div className="dropdown_content_header padding_top_10 padding_left_40 padding_bottom_30">
						<ul className='dropdown_content_menu_ul'>
							{Array.isArray(topMenuDataList) && topMenuDataList.map((menu) => (
								<li>
									{menu.childNode.length > 0 && (
										<ul className='dropdown_content_menu'>
											{menu.childNode.map((child) => (
												<li>
													<a href={`${child.path}`} target={child.targetOption}>{child.title}</a>
												</li>
											))}
										</ul>
									)}
								</li>
							))}
							<li>
								<ul className='dropdown_content_menu'>
									<li>
										<a href="/tool/stringTool" target="_blank" rel="noopener noreferrer">문자열 도구</a>
									</li>
									<li>
										<a href="/tool/todayWeather" target="_blank" rel="noopener noreferrer">오늘의 날씨</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				)}
			</div>
			{localStorage.getItem('accessToken') && (
				<div className={`sidebar_right
									${isRightMenuVisibleValue === 'hidden' ? 'slide-hidden' : 
											`${isRightMenuVisible ? 'slide-in' : 'slide-out'}`
									}
								`}>
					<ul className='right_menu_ul'>
						<li>
							<MuiTheme.RightMenuButton
								data-menutype="right"
								data-menucode="0"
								data-menurole="head"
								onClick={() => handleRightMenuToggle('right', '0')}
								>시스템 설정</MuiTheme.RightMenuButton>
							{openRightMenus['right-0'] && (	
								<ul className='right_content_menu' data-menutype="right" data-menucode="0" data-menurole="body">
									<li>
										<MuiTheme.RightMenuButton 
											onClick={() => window.open('/admin/codeHead', '_blank', 'noopener,noreferrer')}>
												게시판 설정
										</MuiTheme.RightMenuButton>
									</li>
									<li>
										<MuiTheme.RightMenuButton
											onClick={() => window.open('/admin/contract', '_blank', 'noopener,noreferrer')}
										>연락 보기</MuiTheme.RightMenuButton>
									</li>
									<li>
										<MuiTheme.RightMenuButton
											onClick={() => window.open('/admin/menu', '_blank', 'noopener,noreferrer')}
										>메뉴 설정</MuiTheme.RightMenuButton>
									</li>
								</ul>
							)}
						</li>
						<li>
							<MuiTheme.RightMenuButton
								data-menutype="right"
								data-menucode="1"
								data-menurole="head"
								onClick={() => handleRightMenuToggle('right', '1')}
							>그외</MuiTheme.RightMenuButton>
							{openRightMenus['right-1'] && (	
								<ul className='right_content_menu' data-menutype="right" data-menucode="1" data-menurole="body">
									<li>
									<MuiTheme.RightMenuButton>게시판 내용은 여기에</MuiTheme.RightMenuButton>
									</li>
								</ul>
							)}
						</li>
					</ul>
				</div>
			)}

			{/* 오버레이 추가 */}
			{isTopMenuDropdownVisible && (
				<div 
					className="overlay"
					onClick={() => setIsTopMenuDropdownVisible(false)}
				></div>
			)}

			{/* 로그인 프로필 모달 */}

			{isProfileMenuVisible && (
				<ProfileModal 
					setIsProfileMenuVisible={setIsProfileMenuVisible}
				/>
			)}
			
			{isLoginModalVisible && (
				<LoginModal 
					setIsLoginModalVisible={setIsLoginModalVisible}
				/>
			)}
		</>
	);
}

export default TopMenu;