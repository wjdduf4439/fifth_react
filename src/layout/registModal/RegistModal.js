import { useContext, useState, useEffect, useRef } from 'react';

import { MdSearch } from "react-icons/md";

import MuiTheme from 'css/MuiTheme';

import { useRegistModalContext } from 'layout/registModal/RegistModalContext';
import { Margin } from '@mui/icons-material';

const RegistModal  = (props) => {

	const { 
		setIsRegistModalVisible,
	} = props;

	const [id, setId] = useState('');
	const [nick, setNick] = useState('');
	const [nickCheck, setNickCheck] = useState(false);
	const [tag, setTag] = useState('NUM1');
	
	const [pw, setPw] = useState('');
	const [pwCheck, setPwCheck] = useState('');
	const [pwShow, setPwShow] = useState(true);
	const [pwShowCheck, setPwShowCheck] = useState(true);

	const [email, setEmail] = useState('');
	const [authEmailShow, setAuthEmailShow] = useState(false);
	const [authEmailCode, setAuthEmailCode] = useState('');
	const [authEmailCodeShow, setAuthEmailCodeShow] = useState(false);
	const [authEmailAuthSuccess, setAuthEmailAuthSuccess] = useState(false);

	const [warning, setWarning] = useState('warning');
	const [targetRef, setTargetRef] = useState(null);

	const warningRef = useRef(null);
    const idInputRef = useRef(null);
    const nickInputRef = useRef(null);
    const tagInputRef = useRef(null);
    const pwInputRef = useRef(null);
    const pwCheckInputRef = useRef(null);
	const emailInputRef = useRef(null);
	const authEmailCodeInputRef = useRef(null);

	const { 
		handleNickCheck,
		handleAuthEmailAuthSuccess,
		handleAuthEmailShow,
		handleRegist,
		handleCloseModal,
		checkTag,
	} = useRegistModalContext({
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
	});

	return (
		<>
			<div className="modal">
				<div className="modal_content">
					<div className='margin_bottom_10'>
						<span className="close" onClick={() => handleCloseModal()}>&times;</span>
						<h2>회원가입</h2>
						<div className='font_size_10 margin_top_15 margin_bottom_15 '>회원가입 후, 관리자의 승인이 있어야 회원등록이 완료됩니다.</div>
						<label htmlFor="username">등록 아이디:</label>
						<div>
							<input ref={idInputRef} type="text" id="id" name="id" value={id} onChange={(e) => setId(e.target.value)} />
						</div>
						<br />
						<label htmlFor="nickname">등록 닉네임:</label>
						<div>
							<input ref={nickInputRef} type="	text" className='width_40per margin_right_10' id="nick" name="nick" value={nick} onChange={(e) => setNick(e.target.value)} />
							<span className='margin_right_10'>#</span>
							<input ref={tagInputRef} type="text" className='width_20per' id="tag" name="tag" value={tag} onChange={(e) => checkTag(e)} />
							<MuiTheme.IdCheckButton type="button" onClick={() => handleNickCheck(nick + '#' + tag)} > 
								중복확인
							</MuiTheme.IdCheckButton>
							{nickCheck ? (	
								<span className='font_size_10 text_border-color'>사용가능한 닉네임입니다.</span>
							) : (
								<></>
							)}
						</div>
						<br />
						<label htmlFor="password">등록 비밀번호:</label>
						<div>
							{pwShow ? (
								<input ref={pwInputRef} type="password" id="pw" name="pw" value={pw} onChange={(e) => setPw(e.target.value)} />
							) : (
								<input ref={pwInputRef} type="text" id="pw_show" name="pw_show" value={pw} onChange={(e) => setPw(e.target.value)} 	/>
							)}
							<span className='font_size_16' title="비밀번호 보기">
								<MuiTheme.ShowPwButton type="button" onClick={() => setPwShow(!pwShow)} > 
									<MdSearch/> 
								</MuiTheme.ShowPwButton>
							</span>
						</div>
						<br />
						<label htmlFor="password">등록 비밀번호 확인:</label>
						<div>
							{pwShowCheck ? (
								<input ref={pwCheckInputRef} type="password" id="pw_check" name="pw_check" value={pwCheck} onChange={(e) => setPwCheck(e.target.value)} />
							) : (
								<input ref={pwCheckInputRef} type="text" id="pw_check_show" name="pw_check_show" value={pwCheck} onChange={(e) => setPwCheck(e.target.value)} 	/>
							)}
							<span className='font_size_16' title="비밀번호 보기">
								<MuiTheme.ShowPwButton type="button" onClick={() => setPwShowCheck(!pwShowCheck)} > 
									<MdSearch/> 
								</MuiTheme.ShowPwButton>
							</span>
						</div>
						<br />
						<label htmlFor="email">등록 이메일:</label>
						<div>
							<input ref={emailInputRef} type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
							<span className='font_size_16' title="이메일 인증">
								<MuiTheme.AuthEmailButton type="button" onClick={() => handleAuthEmailShow(email)} > 
									인증하기
								</MuiTheme.AuthEmailButton>
							</span>
						</div>
						{authEmailShow ? (
							<>
								<span className='font_size_12 text_border-color'>이메일 인증은 3분동안 유효합니다.</span>
								<br />
								<br />
								<label htmlFor="authEmailCode">이메일 인증 코드:</label>
								<div>
								<input ref={authEmailCodeInputRef} type="text" id="authEmailCode" name="authEmailCode" value={authEmailCode} onChange={(e) => setAuthEmailCode(e.target.value)} />
								<span className='font_size_16' title="이메일 인증">
									<MuiTheme.AuthEmailButton type="button" onClick={() => handleAuthEmailAuthSuccess(true)} > 
										입력
									</MuiTheme.AuthEmailButton>
									</span>
								</div>
								{authEmailAuthSuccess ? (	
									<span className='font_size_10 text_border-color'>이메일 인증이 완료되었습니다.</span>
								) : (
									<></>
								)}
							</>
						) : (
							<></>
						)}
					</div>
					<MuiTheme.LoginButton className='margin_right_10' onClick={() => handleRegist()} >회원가입</MuiTheme.LoginButton>
					<MuiTheme.CancelButton className='margin_right_10' onClick={() => handleCloseModal()} >취소</MuiTheme.CancelButton>
				</div>
				<div className="modal_overlay" onClick={() => handleCloseModal()}>
				</div>
			</div>
			<div ref={warningRef} className="modal_warning">
				{warning}
			</div>
		</>
	);

}

export default RegistModal;
