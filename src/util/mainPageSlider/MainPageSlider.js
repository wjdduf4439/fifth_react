import React, { useState, useEffect, useRef } from 'react';

import { ImAmazon } from "react-icons/im";
import { DiReact } from "react-icons/di";
import { FaDatabase } from "react-icons/fa";

import 'css/util/mainPageSlider/MainPageSlider.css';

const MainPageSlider = (props) => {
        // 기존 state들...

        const {
            mediaQuery = window.matchMedia('(max-width: 800px)'),
            slider_minWidth = "0px",
            slider_maxWidth = "100%",
            slider_defaultWidth = "100%",
            slides = [ { title: "슬라이더의 제목이 없습니다.", content: null } ],
            slider_dots = true,
            slider_button = false,
            slider_button_list = [
                { title: "버튼이 없습니다.", button_icon: <></> }
            ],
        } = props;

        const slideCount = Math.max(slides.length, 1);
        const slideShare = 100 / slideCount;

        const slideRef = useRef([]);

        const [currentSlide, setCurrentSlide] = useState(0); 
        const [currentSlideOn, setCurrentSlideOn] = useState(false);

        const divInterval = 0;
    
        const nextSlide = () => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        };
    
        const prevSlide = () => {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        };
    
        useEffect(() => {

            // const timer = setInterval(nextSlide, 5000); // 5초마다 자동 슬라이드
            // return () => clearInterval(timer);

        }, []);
    
        useEffect(() => {

            //페이지라 로드되자마자 스크롤이 이동하는것을 방지
            if (slideRef.current && mediaQuery.matches && currentSlideOn) {
                slideRef.current.scrollIntoView({ behavior: 'smooth' }); // 슬라이더로 스크롤
            }
            if(!currentSlideOn) {
                setCurrentSlideOn(true);
            }

        }, [currentSlide]);
    
        return (
            <>
                {slider_button && (
                <div className="main_page_welcome_slider_button_form">
                    <ul className="main_page_welcome_slider_button_ul">
                        {slider_button_list.map((button, index) => (
                            <li key={index} onClick={() => setCurrentSlide(index)}
                                style={{
                                    width: `${mediaQuery.matches ? '35%' : '15%'}`,
                                    minHeight: `${mediaQuery.matches ? '110' : '80'}px`,
                                }}
                                >
                                <span className="font_size_46">{button.button_icon}</span><br/>{button.title}
                            </li>
                        ))}
                    </ul>
                </div>
                )}
                
                <div className='main_page_welcome_slider'
                    style={{
                        width: `clamp(${slider_minWidth}, ${slider_defaultWidth}, ${slider_maxWidth})`,
                        maxWidth: '100%',
                    }}
                    ref={slideRef}  // slideRef를 여기서 사용
                >
                    <div className='main_page_welcome_slider-container' 
                    style={{ 
                        width: `${slideCount * 100}%`,
                        transform: `translateX(-${currentSlide * slideShare}%)`,
                        transition: 'transform 0.5s ease-in-out',
                        '&:hover': {
                            boxShadow: 'inset -2px -2px 0 4px var(--background-border-color)'
                        },
                    }}>
                        {slides.map((slide, index) => (
                            
                            <div key={index} 
                                className='main_page_welcome_slider_div'
                                style={{
                                    minWidth: `${slideShare}%`,
                                    width: `${slideShare}%`,
                                    boxSizing: 'border-box',
                                }}>
                                {/*제목 표시*/}
                                <h2>{slide.title.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}<br/>
                                    </React.Fragment>
                                ))}</h2>
                                {/*내용 표시*/}
                                {slide.content && (
                                    <p>{slide.content.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}<br/>
                                        </React.Fragment>
                                    ))}</p>
                                )}
                                {slide.title2 && (
                                    <h2>{slide.title2.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}<br/>
                                        </React.Fragment>
                                    ))}</h2>
                                )}
                                {slide.content2 && (
                                    <p>{slide.content2.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}<br/>
                                        </React.Fragment>
                                    ))}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* 버튼 표시 */}
                    {/* 
                    <button className='main_page_welcome_slider-btn prev' onClick={prevSlide}>&lt;</button>
                    <button className='main_page_welcome_slider-btn next' onClick={nextSlide}>&gt;</button>
                    */}
                </div>
                {slider_dots && (
                    <>
                        <div className='min_height_50'></div>
                        <div className='main_page_welcome_slider-dots'>
                        {slides.map((_, index) => (
                            <span 
                                key={index}
                                className={`main_page_welcome_slider-dot ${currentSlide === index ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                            />
                            ))}
                        </div>
                    </>
                )}
            </>
            // ... existing code ...
        );
    }

export default MainPageSlider;
