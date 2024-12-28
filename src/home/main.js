import React, { useState, useRef, useEffect } from 'react';
import Slider from "react-slick";

import { RiServerFill } from "react-icons/ri";
import { FaServer, FaDatabase } from "react-icons/fa";
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
	let howto_ment = '포트폴리오를 작성하면서 겪은 문제점, 해결 방법';
	const [hoveredIndex, setHoveredIndex] = useState('');

	const [contact_ip, setContactIp] = useState('');

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

    return (
		<div>
			<div className="main_container">
				<div className="sidebar_left width_10per">
					<img src="/image/profile.jpg" alt="프로필 사진" className='profile_img margin_top_20'/>
					<h4 className='text_align_center GumiDotumTTF'>이정열</h4>
					<div className='text_align_center GumiDotumTTF'>- java 백엔드 개발자 -</div>
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
				<div className="container">
					<div className="content">
						
						<div id="welcome" className='about_me_meta'>WELCOME</div>

						<Slider {...aboutMeTitleSliderSettings}>
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
				

			
				<div className="container">
					<div className="content">

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

				
				<div className="container">
					<div className="content">

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
													react,<br />
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


				<div className="container">
					<div className="content">

						<div id="howto" className="about_me_meta">HOW TO</div>

						<div className="howto_heading">
							{howto_ment}
						</div>

						<div className="howto-content">
							<ul className="howto-content-ul">
								<li onClick={() => handleHowToSliderClick(0)}>
									<span className="font_size_46"><ImAmazon /></span><br/>AWS 활용에 대한 경험
								</li>
								<li onClick={() => handleHowToSliderClick(1)}>	
									<span className="font_size_46"><DiReact /></span><br/>리액트 활용에 대한 경험
									{/* 컴포넌트 활용에 대해서 적기 */}
								</li>
								<li onClick={() => handleHowToSliderClick(2)}>
									<span className="font_size_46"><GoUpload /></span><br/>이미지 내용첨부 기능
								</li>
								<li onClick={() => handleHowToSliderClick(3)}>
									<span className="font_size_46"><BiLogInCircle /></span><br/>jwt 로그인/인증 방식
								</li>
								<li onClick={() => handleHowToSliderClick(4)}>
									<span className="font_size_46"><TbApi /></span><br/>api 활용에 대한 경험
								</li>
								<li onClick={() => handleHowToSliderClick(5)}>
									<span className="font_size_46">+</span><br/>추가 백엔드 기능 구현
								</li>
								
							</ul>
						</div>

						<div className='howto_bar margin_bottom_10'></div>
						
						<Slider ref={howToSliderRef}  {...aboutMeHowToContentSliderSettings}>
							<div className='about_me_slider_div'>
								<p>aws 활용에 대한 경험</p>
							</div>
							<div className='about_me_slider_div'>
								<p>리액트 활용에 대한 경험</p>
							</div>
							<div className='about_me_slider_div'>
								<p>이미지 내용첨부 기능</p>
							</div>
							<div className='about_me_slider_div'>
								<p>jwt 로그인/인증 방식</p>
							</div>
							<div className='about_me_slider_div'>
								<p>api 활용에 대한 경험</p>
							</div>
							<div className='about_me_slider_div'>
								<p>백엔드 기능 구현에 대해서 적을것</p>
							</div>
						</Slider>

					</div>
				</div>

				<div className="container">
					<div className="content">

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