import { useContext, useState } from 'react';

import { MdSearch } from "react-icons/md";

import MuiTheme from 'css/MuiTheme';

import { useLoginModalContext } from 'layout/loginModal/LoginModalContext';

const LoginModal = (props) => {

	const { 
			setIsLoginModalVisible,
			setIsRegistModalVisible,
		} = props;

	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [pwShow, setPwShow] = useState(true);

	const { 
		handleLogin,
		handleCloseModal,
		handleRegistModal,
	} = useLoginModalContext({
			id,
			pw,
			setIsLoginModalVisible,
			setIsRegistModalVisible,
	});

	return (
		<>
			<div className="modal">
				<div className="modal_content">
					<span className="close" onClick={() => handleCloseModal()}>&times;</span>
					<h2>로그인</h2>
					<form name='loginForm' id='loginForm' onSubmit={handleLogin}>
						<label htmlFor="username">id:</label>
						<div>
							<input type="text" id="id" name="id" value={id} onChange={(e) => setId(e.target.value)} />
						</div>
						<br />
						<label htmlFor="password">pw:</label>
						<div>
							{pwShow ? (
								<input type="password" id="pw" name="pw" value={pw} onChange={(e) => setPw(e.target.value)} />
							) : (
								<input type="text" id="pw_show" name="pw_show" value={pw} onChange={(e) => setPw(e.target.value)} 	/>
							)}
							<span className='font_size_16' title="비밀번호 보기">
								<MuiTheme.ShowPwButton type="button" onClick={() => setPwShow(!pwShow)} > 
									<MdSearch/> 
								</MuiTheme.ShowPwButton>
							</span>
						</div>
						<br />
						<MuiTheme.LoginButton className='margin_right_10' type="submit">로그인</MuiTheme.LoginButton>
						<MuiTheme.CancelButton className='margin_right_10' onClick={() => handleCloseModal()} >취소</MuiTheme.CancelButton>
						<MuiTheme.CancelButton className='margin_right_10' onClick={() => handleRegistModal()} >회원가입</MuiTheme.CancelButton>
					</form>
				</div>
				<div className="modal_overlay" onClick={() => handleCloseModal()}>
				</div>
			</div>
		</>
	);

}

export default LoginModal;
