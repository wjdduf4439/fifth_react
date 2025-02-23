import { useState, useEffect } from 'react';

import axios from 'axios';

import { useAxios } from 'provider/AxiosProvider';

export const useMainContext = (
	howToSliderRef,
	contact_ip, setContactIp,
) => {

	const axiosInstance = useAxios();

	const aboutMeTitleSliderSettings = {
		arrows: false,   // 이전/다음 버튼 비활성화
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: true, // 상하 슬라이더로 변경
	};

	const aboutMeHowToContentSliderSettings = {
		//dots: true,
		arrows: false,   // 이전/다음 버튼 비활성화
		infinite: true,
		speed: 250,
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: true, // 상하 슬라이더로 변경
		afterChange: (current) => {
			console.log(current);
		}
	  };

	
    // Slider로 이동하는 함수
    const handleHowToSliderClick = (index) => {

		console.log("슬라이더 이동 요청 인덱스:", index);
		console.log("current Ref:", howToSliderRef.current); // 추가된 로그

        console.log(index);
        if (howToSliderRef.current) {
            howToSliderRef.current.slickGoTo(index);
        } else {
			console.error("슬라이더 참조가 유효하지 않습니다.");
		}
    };

	const handleContactSubmit = (event) => {
		event.preventDefault();

		const form = document.getElementById('contact_form');
		const formData = new FormData(form);

		const data = {};
		formData.forEach((value, key) => {
			data[key] = value;
		});

		if (data.name === '') {
			alert('연락자명을 입력해주세요.');
			return;
		}
		if (data.name.length < 50) {
			alert('연락자명을 50자 이내로 입력해주세요.');
			return;
		}
		if (data.subject === '') {
			alert('연락 제목을 입력해주세요.');
			return;
		}
		if (data.subject.length < 50) {
			alert('연락 내용을 50자 이내로 입력해주세요.');
			return;
		}
		if (data.message === '') {
			alert('연락 내용을 입력해주세요.');
			return;
		}

		if (data.message.length < 200) {
			alert('연락 내용을 200자 이내로 입력해주세요.');
			return;
		}

		insertContact(data);
	}

	const handleContactSubmitReset = () => {
		const form = document.getElementById('contact_form');
		form.reset();
	}

    const scrollToElementWithOffset = (id, offset = 150) => {
        const element = document.getElementById(id);
        if (element) {
            const bodyRectTop = document.body.getBoundingClientRect().top;
            const elementRectTop = element.getBoundingClientRect().top;
            const elementPosition = elementRectTop - bodyRectTop;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

	const insertContact = async (data) => {
		await axiosInstance.post('/api/contract/insert', data)
		.then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);	
				handleContactSubmitReset();
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
			alert("문제가 발생해서 요청이 차단되었습니다.");
		});
	}

	const getIp = () => {
		axios.get('https://api.ipify.org?format=json').then(response => {
			setContactIp(response.data.ip);
		}).then(response => {
			console.log( 'ip : ' + response);	
		});
	};

	useEffect(() => {
		getIp();
	}, []);

    return {
        aboutMeTitleSliderSettings,
		aboutMeHowToContentSliderSettings,
		handleHowToSliderClick,
		handleContactSubmit,
		handleContactSubmitReset,
        scrollToElementWithOffset
    };
};