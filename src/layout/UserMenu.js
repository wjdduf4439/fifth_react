import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

import TopMenu from 'layout/topMenu/TopMenu';
import UnderlineBox from 'layout/UnderlineBox';
import MobileUserMenu from 'layout/topMobileMenu/TopMobileMenu';

const UserMenu = (props) => {

	const {mediaQuery} = props;

	const [scrollProgress, setScrollProgress] = useState(0);

	const rightMenuInfo = [
		{title : '게시판 설정', link : '/admin/codeHead'},
		{title : '연락 보기', link : '/admin/contract'},
		{title : '메뉴 설정', link : '/admin/menu'},
		{title : '회원가입 승인', link : '/admin/accessAccount'},
	]
	
	const handleScroll = () => {
		const scrollTop = window.scrollY;
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		const scrollPercent = (scrollTop / docHeight) * 100;
		setScrollProgress(scrollPercent);
	  };

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
		  window.removeEventListener('scroll', handleScroll);
		};
	  }, []);
	  
	return (
		<>
		{mediaQuery.matches ? 
			<MobileUserMenu rightMenuInfo={rightMenuInfo} /> 
			: 
			<TopMenu rightMenuInfo={rightMenuInfo} />}
		<UnderlineBox />

		<div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '5px', background: '#f0f0f0', zIndex: 1000 }}>
		  <motion.div
			style={{
			  height: '100%',
			  background: 'var(--background-scroll-color)',
			  width: `${scrollProgress}%`
			}}
			initial={{ width: 0 }}
			animate={{ width: `${scrollProgress}%` }}
			transition={{ duration: 0.1 }}
		  />
		</div>
		
		</>
	);
}

export default UserMenu;