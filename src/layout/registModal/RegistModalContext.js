import axios from 'axios';
import { useCallback, useContext, useEffect } from 'react';
import { AccessContext } from 'provider/AccessProvider';

export const useRegistModalContext = (props) => {
	const { 
		setIsRegistModalVisible,
		id,
		nick,
		nickCheck, setNickCheck,
		tag, setTag,
		pw,
		pwCheck,
		email, setEmail,
		authEmailShow, setAuthEmailShow,
		authEmailCode, setAuthEmailCode,
		authEmailCodeShow, setAuthEmailCodeShow,
		authEmailAuthSuccess, setAuthEmailAuthSuccess,
		warning, setWarning,
		targetRef, setTargetRef,
		warningRef,
		idInputRef,
		nickInputRef,
		tagInputRef,
		pwInputRef,
		pwCheckInputRef,
		emailInputRef,
		authEmailCodeInputRef,
	} = props;
	
	const useAccess = useContext(AccessContext);
	const { setCode, setId, setNick, setAccessToken, setRefreshToken } = useAccess;	

	const handleNickCheck = (nick) => {
		console.log("nick : " + nick);

		const requestNodeData = {
			nick: nick,
		};

		getNickNameCheck(requestNodeData);
	}

	const handleAuthEmailAuthSuccess = () => {
		const requestNodeData = {
			email: email,
			authEmailCode: authEmailCode,
		};
		getAuthEmailAuthCode(requestNodeData);
	}

	const handleAuthEmailShow = (email) => {
		let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		let emailIsEmpty = (email === '' || email === null || email === undefined);

		// console.log("email : " + email);
		// console.log("emailIsEmpty : " + emailIsEmpty);

		if(emailIsEmpty){
			setTargetRef('email');
			setWarning('이메일을 입력해주세요.');
			return;
		}
		if(!emailReg.test(email)){
			setTargetRef('email');
			setWarning('이메일 형식이 올바르지 않습니다.');
			return;
		}
		const requestNodeData = {
			email: email,
		};
		getAuthMail(requestNodeData);
		setAuthEmailShow(true);
	}

	const handleRegist = () => {
		//console.log("id : " + id + " > " + (id === '') + " > " + (id === null) + " > " + (id === undefined));

		if (id === '') {
			setTargetRef('id');
			setWarning('아이디를 입력해주세요.');
			return;
		}

		if (nick === '') {
			setTargetRef('nick');
			setWarning('닉네임을 입력해주세요.');
			return;
		}

		if (tag === '') {
			setTargetRef('tag');
			setWarning('태그를 입력해주세요.');
			return;
		}

		if (tag.length + nick.length > 30) {
			setTargetRef('tag');
			setWarning('닉네임과 태그의 총 길이는 30자 이하로 입력해주세요.');
			return;
		}

		if(nick.includes('#') || tag.includes('#')){
			setTargetRef('nick');
			setWarning('닉네임과 태그에 #을 포함할 수 없습니다.');
			return;
		}

		if(!nickCheck){
			setTargetRef('nick');
			setWarning('닉네임 중복확인을 진행해주세요.');
			return;
		}
	
		if (pw === '') {
			setTargetRef('pw');
			setWarning('비밀번호를 입력해주세요.');
			return;
		}
	
		if (pw !== pwCheck) {
			setTargetRef('pwCheck');
			setWarning('비밀번호가 일치하지 않습니다.');
			return;
		}

		if(!authEmailAuthSuccess){
			setTargetRef('email');
			setWarning('이메일 인증을 진행해주세요.');
			console.log("이메일 인증을 진행해주세요.");
			return;
		}
	
		const requestNodeData = {
			id: id,
			nick: nick,
			tag: tag,
			pw: pw,
			email: email,
		};
		getRegist(requestNodeData);
	};

	const handleCloseModal = () => {
		setIsRegistModalVisible(false);
	}

	const checkTag = (e) => {
		const newValue = e.target.value.toUpperCase();
		if (/^[A-Z0-9]*$/.test(newValue)) {
			setTag(newValue);
		}
	}

	//기본형 axios 사용하기
	const getRegist = async (requestNodeData) => {
		await axios.post('/api/common/accRegist.go', requestNodeData, {
			headers: { 'Content-Type': 'application/json' }
		}).then(response => {
			const data = response.data;
			if (data.result) {
				alert(data.message);
				setIsRegistModalVisible(false);
			} else {
				alert("문제가 발생했습니다 : " + data.message);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
			alert("문제가 발생해서 요청이 차단되었습니다.");
		});
	};

	//회원가입 중 이메일 인증 코드 발급
	const getAuthMail = async (requestNodeData) => {
		await axios.post('/api/emailCheck.go', requestNodeData, {
			headers: { 'Content-Type': 'application/json' }
		}).then(response => {
			//console.log(response.data);
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	};

	//이메일과 인증코드를 비교해서 회원가입 인증
	const getNickNameCheck = async (requestNodeData) => {
		await axios.post('/api/common/nickNameCheck.go', requestNodeData, {
			headers: { 'Content-Type': 'application/json' }
		}).then(response => {
			//console.log(response.data);
			const data = response.data;
			if(data.result){
				setNickCheck(true);
			}else{
				setTargetRef('nick');
				setWarning('이미 사용중인 닉네임입니다.');
				setNickCheck(false);
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	};

	//이메일과 인증코드를 비교해서 회원가입 인증
	const getAuthEmailAuthCode = async (requestNodeData) => {
		await axios.post('/api/emailAuth.go', requestNodeData, {
			headers: { 'Content-Type': 'application/json' }
		}).then(response => {
			//console.log(response.data);
			const data = response.data;
			if(data.result){
				setAuthEmailAuthSuccess(true);
			}else{
				setAuthEmailAuthSuccess(false);
				setTargetRef('authEmailCode');
				setWarning('이메일 인증 코드가 일치하지 않습니다.');
			}
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	};

    useEffect(() => {
        const warningDiv = warningRef.current;
		let target = null;

		if(	targetRef === 'id' )					target = idInputRef.current;
		else if( targetRef === 'nick' )				target = nickInputRef.current;
		else if( targetRef === 'tag' )				target = tagInputRef.current; 
		else if( targetRef === 'pw' )				target = pwInputRef.current;
		else if( targetRef === 'pwCheck' )			target = pwCheckInputRef.current;
		else if( targetRef === 'email' )			target = emailInputRef.current;
		else if( targetRef === 'authEmailCode' )	target = authEmailCodeInputRef.current;
		else 										target = null;

		warningDiv.style.position = 'absolute';
		warningDiv.style.display = 'block';
		warningDiv.style.opacity = '0';
		warningDiv.style.zIndex = '10002';
		warningDiv.style.maxWidth = '40%';

        if (warningDiv && target) {
            const targetRect = target.getBoundingClientRect();
            // id input의 중심에 위치하도록 설정
			warningDiv.style.opacity = '1';
            warningDiv.style.top = `${targetRect.top - warningDiv.offsetHeight - 10}px`;
            warningDiv.style.left = `${targetRect.left + (targetRect.width / 2)}px`;
			warningDiv.classList.add('toast-enter');
			warningDiv.classList.remove('toast-exit');

			// 애니메이션이 끝난 후에 toast-enter 클래스를 제거
			setTimeout(() => {
				warningDiv.classList.remove('toast-enter');
			}, 500); // fadeIn 애니메이션 시간과 일치시킴

			// toast-exit 애니메이션을 시작
			setTimeout(() => {
				warningDiv.classList.add('toast-exit');
				setTimeout(() => {
					warningDiv.classList.remove('toast-exit');
					warningDiv.style.opacity = '0'; // 애니메이션이 끝난 후에 요소를 숨김
					warningDiv.style.top = `0px`;
					setTargetRef(null); // 애니메이션이 끝난 후에 targetRef를 null로 설정
				}, 500); // fadeOut 애니메이션 시간과 일치시킴
			}, 1500); // 원하는 시간 후에 fadeOut 시작
        }else{
		}

    }, [targetRef]);

	return {
		handleNickCheck,
		handleAuthEmailAuthSuccess,
		handleAuthEmailShow,
		handleRegist,
		handleCloseModal,
		checkTag,
	}
}