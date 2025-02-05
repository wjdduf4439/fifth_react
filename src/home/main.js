import React, { useState, useRef, useEffect } from 'react';
import Slider from "react-slick";

import { RiServerFill } from "react-icons/ri";
import { FaServer, FaDatabase, FaQuestion } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { LuMonitor } from "react-icons/lu";
import { BiLogInCircle } from "react-icons/bi";
import { DiAws, DiReact } from "react-icons/di";
import { TbApi } from "react-icons/tb";
import { ImAmazon } from "react-icons/im";
import { GoUpload } from "react-icons/go";
import { IoMdPhonePortrait } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";

import MuiTheme from 'css/MuiTheme';

import { useMainContext } from 'home/mainContext';
import UserMenu from 'layout/UserMenu';

const Main = (props) => {

	let welcome_ment = '언제나 기술적인 고민, 방법을 찾고 문제 해결을 위해 노력하는 개발자';
	let howto_ment = '홈페이지의 구조와 기능';
	const [hoveredIndex, setHoveredIndex] = useState('');

	const [contact_ip, setContactIp] = useState('');
	const [leftSidebarMode, setLeftSidebarMode] = useState('sidebar_left');
	const [leftSidebarWidth, setLeftSidebarWidth] = useState('width_100per');
	const [profileDivWidth, setProfileDivWidth] = useState('width_100per');
	const [profileImgWidth, setProfileImgWidth] = useState('width_10per');
	const [profileDivAlign, setProfileDivAlign] = useState('text_align_center');
	const [displayNone, setDisplayNone] = useState('');
	const [containerMarginLeft, setContainerMarginLeft] = useState('margin_left_300');
	const [containerMarginRight, setContainerMarginRight] = useState('margin_right_300');
	const [contentWidth, setContentWidth] = useState('width_100per');
	const [projectArcLink, setProjectArcLink] = useState('/image/project_arc.png');

    // Slider Ref 생성
    const howToSliderRef = useRef(null);

	const { 
		aboutMeTitleSliderSettings,
		aboutMeHowToContentSliderSettings,
		handleHowToSliderClick,
		handleContactSubmit,
		handleContactSubmitReset,
		scrollToElementWithOffset,
	 } = useMainContext(
		howToSliderRef,
		contact_ip, setContactIp,
	 );
	 
	 

	 useEffect(() => {

		const handleResize = () => {
			if (window.innerWidth <= 800) {
				if (leftSidebarMode !== 'sidebar_up') setLeftSidebarMode('sidebar_up');
				if (leftSidebarWidth !== 'width_100per') setLeftSidebarWidth('width_100per');
				if (profileDivWidth !== 'width_30per') setProfileDivWidth('width_30per');
				if (profileDivAlign !== 'text_align_left padding_left_10') setProfileDivAlign('text_align_left padding_left_10');
				if (profileImgWidth !== 'width_30per') setProfileImgWidth('width_30per');
				if (displayNone !== 'display_none') setDisplayNone('display_none');
				if (containerMarginLeft !== '') setContainerMarginLeft('');
				if (containerMarginRight !== '') setContainerMarginRight('');
				if (contentWidth !== '') setContentWidth('');
				setProjectArcLink('/image/project_arc_mobile.png');
			} else {
				if (leftSidebarMode !== 'sidebar_left') setLeftSidebarMode('sidebar_left');
				if (leftSidebarWidth !== 'width_10per') setLeftSidebarWidth('width_10per');
				if (profileDivWidth !== 'width_100per') setProfileDivWidth('width_100per');
				if (profileDivAlign !== 'text_align_center') setProfileDivAlign('text_align_center');
				if (profileImgWidth !== 'width_100per') setProfileImgWidth('width_100per');
				if (displayNone !== '') setDisplayNone('');
				if (containerMarginLeft !== 'margin_left_300') setContainerMarginLeft('margin_left_300');
				if (containerMarginRight !== 'margin_right_300') setContainerMarginRight('margin_right_300');
				if (contentWidth !== 'width_100per') setContentWidth('width_100per');
				setProjectArcLink('/image/project_arc.png');
			}
			
		};

        // 초기 로드 시 크기 확인
        handleResize();

        // 창 크기 변경 이벤트 리스너 추가
        window.addEventListener('resize', handleResize);
		console.log('config useEffect');

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
		<div>
			<div className="main_container">
				<div className={`${leftSidebarMode} ${leftSidebarWidth} ${displayNone}`}>
					<div className={`profile_img_div ${profileDivWidth}`}>
						<img src="/image/profile.jpg" alt="프로필 사진" className={`profile_img margin_top_20 ${profileImgWidth}`} />
						<h4 className={`width_100per ${profileDivAlign} GumiDotumTTF`}>이정열</h4>
						<div className={`${profileDivAlign} GumiDotumTTF`}>- java 백엔드 개발자 -</div>
					</div>
					<ul className='left_menu_ul'>
						<li><a href="#none" onClick={(e) => { e.preventDefault(); scrollToElementWithOffset('welcome'); }}>WELCOME</a></li>
						<li><a href="#none" onClick={(e) => { e.preventDefault(); scrollToElementWithOffset('aboutme'); }}>ABOUT ME</a></li>
						<li><a href="#none" onClick={(e) => { e.preventDefault(); scrollToElementWithOffset('stack'); }}>STACK</a></li>
						<li><a href="#none" onClick={(e) => { e.preventDefault(); scrollToElementWithOffset('howto'); }}>HOW TO</a></li>
						<li><a href="#none" onClick={(e) => { e.preventDefault(); scrollToElementWithOffset('contract'); }}>CONTACT</a></li>
					</ul>
				</div>
				{/*
				<div className="sidebar_right">
					<h4>페이지 소개</h4>
					<p>여기에 페이지 소개 내용을 추가하세요.</p>
				</div>
				 */}
								
				<div className={`container ${containerMarginLeft} ${containerMarginRight}`}>
					<div className={`content ${contentWidth}`}>
						
						window width : {window.innerWidth}
						<div id="welcome" className='about_me_meta'>WELCOME</div>

						<Slider {...aboutMeTitleSliderSettings} className='about_me_slider'>
							<div className='about_me_slider_div'>
								<h2>안녕하십니까. <br/> 저는 <br/>  이정열입니다.</h2>
							</div>
							<div className='about_me_slider_div'>
								<h2>저는 <br/> '개발자'를<br/> 목표로<br/> 합니다</h2>
								<p>문제 해결에 대한 열정이 강하며, <br/> 개인과 단체의 문제 해결을 위해 백엔드 개발에 전념하는 개발자입니다.</p>
							</div>
						</Slider>
						
					</div>
				</div>
			
				<div className={`container ${containerMarginLeft} ${containerMarginRight}`}>
					<div className={`content ${contentWidth}`}>

						<div id="aboutme" className='about_me_meta'>ABOUT ME</div>
							
						<div className='about_me_heading'>
							{welcome_ment}
						</div>

						<div className='about_me_bar margin_bottom_10'></div>
						<div className='about_me_content padding_20'>
							<div className='margin_top_20 margin_bottom_20'>
								저는 대학교에 우연히 입학한 컴퓨터 계열 대학생활 동안, 코드에 대한 작동 방식에 대한 이해와, 제가 이루어낼 수 있는 결과물, 게임과 홈페이지, 공장 기계 작동 작업 등을 아우르는 다양한 기능 구현에 매력을 느껴서, 앞으로 제가 만든 기능을 사용해볼 사용자들에게 제가 평소 컴퓨터를 사용하며 구현할 수 있는 편안함과 즐거움을 느낄 수 있게 해주고 싶습니다.
							</div>
							<div className='margin_top_20 margin_bottom_20'>
								졸업 후에는 다양한 프로젝트를 진행하며 접한 문제 해결과, 복잡한 일의 과정을 더 간소화하고, 회사 내부/외부 업무 프로세스를 개선하는데 기여했습니다. 앞으로 제가 입사하게 될 회사에서도 저의 기술적인 고민과 방법을 찾아내고, 문제 해결을 위해 노력하는 개발자가 되고 싶습니다.
							</div>
						</div>


					</div>
				</div>

				
				<div className={`container ${containerMarginLeft} ${containerMarginRight}`}>
					<div className={`content ${contentWidth}`}>

						<div id="stack" className='about_me_meta'>STACK</div>

						<ul className='stack_ul'>
							{['blue', 'orange', 'purple', 'green'].map((color, index) => (
								<li
									key={index}
									onMouseEnter={() => setHoveredIndex(index)}
									onMouseLeave={() => setHoveredIndex('')}
									className={`${hoveredIndex === index ? 'border_li_'+color : ''} padding_left_10`}
									
								>
									<div 
										className={ `about_me_bar border_${color} margin_bottom_10 margin_top_10`}
									></div>

									

									<div>
										{index === 0 && (
											<div>
												<span className={`font_size_24 margin_right_10 ${hoveredIndex === index ? 'text_'+color : ''}`}><LuMonitor /></span>
												<span>web</span><br />
												<div className='margin_left_10 font_size_14'>
													react, nginx<br />
													javascript&jquery,<br />
													jsp&jstl
												</div>
											</div>
										)}
										{index === 1 && (
											<div>
												<span className={`font_size_24 margin_right_10 ${hoveredIndex === index ? 'text_'+color : ''}`}><RiServerFill /></span>	
												<span>was</span><br />
												<div className='margin_left_10 font_size_14'>
													tomcat,<br />
													nDocker
												</div>
											</div>
										)}
										{index === 2 && (
											<div>
												<span className={`font_size_24 margin_right_10 ${hoveredIndex === index ? 'text_'+color : ''}`}><FaDatabase /></span>
												<span>db</span><br />
												<div className='margin_left_10 font_size_14'>
													Amazon RDS & mariadb & mysql
												</div>
											</div>
										)}
										{index === 3 && (
											<div>
												<span className={`font_size_24 margin_right_10 ${hoveredIndex === index ? 'text_'+color : ''}`}><FaServer /></span>
												<span>server</span><br />
												<div className='margin_left_10 font_size_14'>
													linux(CentOS) + AWS
												</div>
											</div>
										)}
									</div>
								</li>
							))}
						</ul>

					</div>
				</div>


				<div className={`container ${containerMarginLeft} ${containerMarginRight}`}>
					<div className={`content ${contentWidth}`}>

						<div id="howto" className="about_me_meta">HOW TO</div>

						<div className="howto_heading">
							{howto_ment}
						</div>

						<img src={projectArcLink} alt="프로젝트 구조도" />
												
						<div className="howto-content">
							<ul className="howto-content-ul">
								<li onClick={() => handleHowToSliderClick(0)}>
									<span className="font_size_46"><ImAmazon /></span><br/>Front-end 소개
								</li>
								<li onClick={() => handleHowToSliderClick(1)}>
									<span className="font_size_46"><DiReact /></span><br/>Back-end 소개
								</li>
								<li onClick={() => handleHowToSliderClick(2)}>	
									<span className="font_size_46"><FaDatabase /></span><br/>DB
								</li>
							</ul>
						</div>

						<div className='howto_bar margin_bottom_10'></div>
{/* 												
						<Slider ref={howToSliderRef}  {...aboutMeHowToContentSliderSettings} className='howto_slider'>
							<div className='about_me_slider_div min_height_500'>
								<h3><span className="font_size_32 margin_right_10"><FaQuestion /></span>왜 React로 구현했나요?</h3>
								<p className='margin_bottom_50'>
								리엑트에서 사용하는 컴포넌트라는 구조 자체가 재사용성이 높고,<br/><br/>
								처음 접속하기만 하면 이후 홈페이지를 쾌적하게 사용할 수 있고,<br/><br/>
								세계적으로 여러군데 쓰이는 리액트를 배워두면 나중에 취업시장에서 수요를 챙길 수 있을것 같아서 배워두었습니다.<br/><br/>
								전자정부프레임워크도 리액트를 활용가능하게 한다는 소식도 들어서 저는 미래에는 js보다는 jsx 기반의 자바스크립트 라이브러리가 쓰일거라고 생각하고 있습니다.
								</p>

								<h3><span className="font_size_32 margin_right_10"><FaQuestion /></span>왜 nginx를 사용했나요?</h3>
								<p>
								리버스 프록시 구조를 통한 클라이언트의 직접적인 서버 접근 제한 기능과<br/><br/>
								경로 설정을 통해서 하나의 도메인 안에서 백엔드에 요청을 보낼지, 프론트엔드에 요청을 보낼지 결정할 수 있고<br/><br/>
								HTTPS 프로토콜을 사용하기 위해서 nginx를 사용하기로 했습니다.
								</p>
							</div>
							<div className='about_me_slider_div min_height_500'>
								<h3><span className="font_size_32 margin_right_10"><FaQuestion /></span>왜 spring boot를 사용했나요?</h3>
								<p className='margin_bottom_50'>
									spring boot는 자바 기반의 프레임워크로, 오픈소스이고, 라이브러리가 많고, 커뮤니티가 활발하기 때문입니다.<br/><br/>
									spring framework에 비해 프로필 기반의 어노테이션 작성을 통한 개발/서비스 코드 세분화가 쉽습니다.<br/><br/>
									spring starter 기능을 통해 초기 설정을 쉽게 할 수 있고, 각 라이브러리에 대한 권장 버전 안내를 통해, 버전 관리가 쉽습니다.<br/><br/>
									부가적인 기능으로 내장 서버가 있어, jar 파일을 배포 후 구동하기 쉽고, java 17 버전을 사용하여 코드 블록과 같은 편의성 기능을 사용할 수 있습니다.
								</p>
								<h3><span className="font_size_32 margin_right_10"><FaQuestion /></span>왜 docker를 사용했나요?</h3>
								<p>
								Docker은 컨테이너 기반 가상화 기술로, 가상 서버를 컨테이너라는 단위로 패키징하고 배포, 실행할 수 있게 해주는 프로그램입니다<br/><br/>
								Dockerfile, Docker compose로 이미지를 정의하고, 컨테이너를 실행합니다.<br/><br/>
								기존 가상 서버에 비해 부팅 속도가 빠르고, 어떤 운영체제 환경이든 Docker을 설치할수만 있다면 구동할수 있기 때문에 사용했습니다.
								</p>
							</div>
							<div className='about_me_slider_div min_height_500'>
								<h3><span className="font_size_32 margin_right_10"><FaQuestion /></span>왜 Mysql DB를 사용했나요?</h3>
								<p>
									MariaDB는 MySQL의 오픈소스 버전이며, 대부분의 기능이 동일하고, 라이선스가 무료이기 때문에 사용했습니다.<br/><br/>
									소형 프로젝트에서 효과적인 인덱싱을 지원해서 소형 프로젝트에서의 빠른 성능을 더 돋보이게 만들 수 있다고 판단했습니다.<br/><br/>
									관계형 데이터베이스는 데이터를 행과 열로 미리 구성된 테이블 형태로 저장하고, 테이블 간의 관계를 설정하여 데이터를 조회할 수 있습니다.
								</p>
							</div>
						</Slider>
						 */}

					</div>
				</div>

				<div className={`container ${containerMarginLeft} ${containerMarginRight}`}>
					<div className={`content ${contentWidth}`}>

						<div id="contract" className='about_me_meta'>CONTACT</div>

						<ul className='contact_ul min_height_500 position_relative'>
							<li>
								<ul className='contact_my_ul'>
									<li className='padding_10 height_140'>
										<span className={`font_size_24 margin_right_10`}><FaHouse /></span>
										wjdduf4439@gmail.com
									</li>
									<li className='padding_10 height_140'>
										<span className={`font_size_24 margin_right_10`}><IoMailOutline /></span>
										대구 중구 공평로 31-11 
									</li>
									<li className='padding_10 height_140'>
										<span className={`font_size_24 margin_right_10`}><IoMdPhonePortrait /></span>
										010-2933-4813
									</li>
								</ul>
							</li>
							<li>
								<form name="contact_form" id="contact_form" >
									<input type="hidden" name="ip" id="ip" value={contact_ip} />
									<ul className='contact_contact_ul margin_left_20'>
										<li className='padding_10'>
										<input type="text" name="name" id="name" className="form-control" placeholder="연락자명" />
									</li>
									{/* 								
									<li className='padding_10'>
										<input type="text" name="email" className="form-control" placeholder="회신 받을 E-Mail" />
									</li>
									*/}

									<li className='padding_10'>
										<input type="text" name="subject" id="subject" className="form-control" placeholder="제목" />
									</li>
									<li className='padding_10 height_300'>
									<textarea name="message" id="message" cols="30" rows="7" className="form-control height_100per" placeholder="내용(200자 제한)"></textarea>
										</li>
									</ul>
								</form>
							</li>
						</ul>
						<MuiTheme.ContractButton 
							onClick={handleContactSubmit}
							className="position_relative"> 연락 보내기 </MuiTheme.ContractButton>

					</div>
				</div>
			</div>
		</div>
    );
}

export default Main;