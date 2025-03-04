import React, { useState, useContext } from 'react';
import { ThemeContext } from 'provider/ThemeContext';

import { TfiAlignLeft } from "react-icons/tfi";
import { MdOutlineArrowRight } from "react-icons/md";
import { TbExternalLink } from "react-icons/tb";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { FaHome, FaLightbulb } from "react-icons/fa";
import { RxEnter } from "react-icons/rx";
import { MdOutlineSegment } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

import MuiTheme from 'css/MuiTheme';
import LoginModal from 'layout/loginModal/LoginModal';
import RegistModal from 'layout/registModal/RegistModal';

import { AccessContext } from 'provider/AccessProvider';
import { useMobileTopMenuContext } from './TopMobileMenuContext';

const TopMenu = (props) => {

	const { rightMenuInfo } = props;

	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	const { accessToken, refreshToken } = useContext(AccessContext);	

	const [isTopMenuDropdownVisible, setIsTopMenuDropdownVisible] = useState(false);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isRegistModalVisible, setIsRegistModalVisible] = useState(false);
	const [isRightMenuVisible, setIsRightMenuVisible] = useState(false);
	const [isRightMenuVisibleValue, setIsRightMenuVisibleValue] = useState('hidden');

	const [openRightMenus, setOpenRightMenus] = useState({});
	const [mobileMenuDataList, setMobileMenuDataList] = useState([]);
	const [mobileSelectedMenuUid, setMobileSelectedMenuUid] = useState(0);

	const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);

	const { 
		handleLoginButtonClick, 
		handleCloseModal, 
		handleMobileMenuClick,
		handleMobileMenuLinkClick,
		handleRightMenuToggle,
		handleProfileMenuVisible,
		handleLogOut,
	} = useMobileTopMenuContext({
		setIsTopMenuDropdownVisible,
		setIsLoginModalVisible,
		isRightMenuVisible, setIsRightMenuVisible,
		setIsRightMenuVisibleValue,
		setOpenRightMenus,
		mobileMenuDataList, setMobileMenuDataList,
		mobileSelectedMenuUid, setMobileSelectedMenuUid,
		isMobileSidebarVisible, setIsMobileSidebarVisible,
	});
	
	const toggleMobileSidebar = () => {
		setIsMobileSidebarVisible(!isMobileSidebarVisible);
	};

	return (
		// React.Fragment는 여러 자식 요소를 그룹화하는 데 사용되며, 불필요한 DOM 노드를 추가하지 않습니다.
		<>
			<MuiTheme.MobileTopMenuButton 
				className={`${isMobileSidebarVisible ? 'hidden' : 'visible'}`}
				onClick={toggleMobileSidebar}><TfiAlignLeft /></MuiTheme.MobileTopMenuButton>
			<div className={`mobile_sidebar_top ${isMobileSidebarVisible ? 'visible' : 'hidden'}`}
					>
				<div className="mobile_dropdown_content_main margin_top_10 margin_left_20 font_size_20" >
					<div className='mobile_login_button' >
							<MuiTheme.TopMenuButton 
								className="position_relative"
								onClick={() => window.open('/', '_blank', 'noopener,noreferrer')}
								> 
								<FaHome />
							</MuiTheme.TopMenuButton>
							<MuiTheme.TopMenuButton 
								className="position_relative margin_left_15"
								onClick={() => toggleTheme()}
								> 
								{/* {isDarkMode ? <FaRegLightbulb /> : <FaLightbulb />} */}
								<FaLightbulb />
							</MuiTheme.TopMenuButton>
					</div>
					
							

					{localStorage.getItem('accessToken') && (
						<>
							<img src="/image/profile.jpg" alt="프로필 사진" className='login_profile_img' />
							<a href='#none' className='mobile_login_profile_logout'
									onClick={(e) => handleLogOut(e)}>
								로그아웃
							</a>
						</>
					)}
					<ul>
						{Array.isArray(mobileMenuDataList) && mobileMenuDataList.map((menu) => (
							<li data-key={`${menu.uid}`}>
								<a href='#none' target={menu.targetOption} onClick={(e) => { handleMobileMenuClick(e, menu.uid); }}>
									{menu.title}
									<TbExternalLink style={{ marginLeft: '0px', float: 'right' }} />
									<MdOutlineArrowRight style={{ marginLeft: '0px', float: 'right' }} 
										onClick={() => {  if(menu.path) handleMobileMenuLinkClick(menu.path); }}
									/>
								</a>
								{mobileSelectedMenuUid === menu.uid && menu.childNode.length > 0 && (
									<ul>
										{menu.childNode.map((child) => (
											<li>
												<a href={child.path} target={child.targetOption}>
													<MdSubdirectoryArrowRight className='margin_right_10' />
													{child.title}
												</a>
											</li>
										))}
									</ul>
								)}
							</li>
						))}
						<li>
							<a href="#menu3" onClick={(e) => { handleMobileMenuClick(e, 'away'); }}>
								기타 도구
								<MdOutlineArrowRight style={{ marginLeft: '0px', float: 'right' }} />
							</a>
							{mobileSelectedMenuUid === 'away' && (
								<ul>
									<li>
										<a href="/tool/stringTool" target="_blank" rel="noopener noreferrer">
											<MdSubdirectoryArrowRight className='margin_right_10' />
											문자열 도구
										</a>
									</li>
									<li>
										<a href="/tool/todayWeather" target="_blank" rel="noopener noreferrer">
											<MdSubdirectoryArrowRight className='margin_right_10' />	
											오늘의 날씨
										</a>
									</li>
								</ul>
							)}
						</li>
					</ul>
					{/* mobileSelectedMenuUid : {mobileSelectedMenuUid} */}

					

					{localStorage.getItem('accessToken') && localStorage.getItem('role').includes('admin') && (						
						<>
							<div className='font_size_14 margin_top_80'>
								관리자 관리 항목 <RiAdminFill />
							</div>
							<div className={ `mobile_menu_bar margin_bottom_10`} ></div>
							<ul>
								{rightMenuInfo.map((menu) => (
									<li>
										<a href={menu.link} target="_blank" rel="noopener noreferrer">
											{menu.title}
										</a>
									</li>
								))}
							</ul>
						</>
					)}
				</div>
			</div>

			{/* 오버레이 추가 */}
			{isMobileSidebarVisible && (
				<>
					<div 
						className="overlay"
						onClick={() => {
							setIsMobileSidebarVisible(false);
						}}
					></div>
				</>
			)}
			
			{isLoginModalVisible && (
				<LoginModal 
					setIsLoginModalVisible={setIsLoginModalVisible}
					setIsRegistModalVisible={setIsRegistModalVisible}
				/>
			)}

			{isRegistModalVisible && (
				<RegistModal 
					setIsRegistModalVisible={setIsRegistModalVisible}
				/>
			)}
		</>
	);
}

export default TopMenu;