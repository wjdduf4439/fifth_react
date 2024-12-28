import { useContext, useState } from 'react';

import { MdSearch } from "react-icons/md";

import MuiTheme from 'css/MuiTheme';

import { useProfileModalContext } from 'layout/profile/ProfileModalContext';

const ProfileModal = (props) => {

	const [id, setId] = useState('');
	const [pw, setPw] = useState('');
	const [pwShow, setPwShow] = useState(true);

	const { 
		handleLogOut,
	} = useProfileModalContext( 
		props.setIsProfileMenuVisible,
	);

	const handleCloseModal = () => {
		props.setIsProfileMenuVisible(false);
	}

	return (
		<>
			<div className="profile_modal">
				<div className="profile_modal_content">
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
