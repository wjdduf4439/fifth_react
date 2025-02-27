import { useContext, useState, useEffect, useRef } from 'react';

import { MdSearch } from "react-icons/md";

import MuiTheme from 'css/MuiTheme';

import { useProfileModalContext } from 'layout/profile/ProfileModalContext';

const ProfileModal = (props) => {

	const { 
		setIsProfileMenuVisible,
		loginButtonPlaceRef,
		profileImgRef,
	} = props;

	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [pwShow, setPwShow] = useState(true);

	const profileModalRef = useRef(null);

	const { 
		handleLogOut,
	} = useProfileModalContext( 
		setIsProfileMenuVisible,
	);

	const handleCloseModal = () => {
		setIsProfileMenuVisible(false);
	}

    useEffect(() => {
		const loginButtonPlaceElement = loginButtonPlaceRef.current;
		const profileImgElement = profileImgRef.current;
		const profileModalElement = profileModalRef.current;

		if (profileImgElement && profileModalElement) {

			const imgRect = profileImgElement.getBoundingClientRect();

			const parentWidth = loginButtonPlaceElement.offsetWidth;
			console.log('parentWidth : ', parentWidth);
	
			// // 프로필 이미지의 왼쪽 경계에 모달의 왼쪽 경계를 맞추기
			const leftPosition = loginButtonPlaceElement.offsetLeft
								 + profileImgElement.offsetLeft
								 + (profileImgElement.offsetWidth/1.3);
	
			// // 프로필 이미지의 아래쪽 경계에 모달의 위쪽 경계를 맞추기
			const topPosition = loginButtonPlaceElement.offsetTop + profileModalRef.current.offsetHeight + loginButtonPlaceElement.offsetHeight;
	
			// // 스타일 업데이트
			profileModalElement.style.left = `${leftPosition}px`;
			profileModalElement.style.top = `${topPosition}px`;

		}
	}, [profileImgRef]);

	return (
		<>
								
			<div className="profile_modal">
				<div className="profile_modal_content" ref={profileModalRef}>
					<ul className='profile_modal_ul'>
						<li>
							<MuiTheme.ProfileModalButton onClick={handleLogOut} >
								로그아웃
							</MuiTheme.ProfileModalButton>	
						</li>
					</ul>
				</div>
				<div className="modal_overlay" onClick={() => handleCloseModal()}>
				</div>
			</div>
		</>
	);

}

export default ProfileModal;
