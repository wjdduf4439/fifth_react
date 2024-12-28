import { styled } from '@mui/material/styles';

import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Box from '@mui/material/Box';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import TextField from '@mui/material/TextField';
import { brown } from '@mui/material/colors';

// 기본 버튼 스타일 정의
const BaseButton = styled(Button)({
    color: 'var(--text-color)',
    border: '1px solid var(--background-border-color)',
    '&:hover': {  
        backgroundColor: 'var(--background-hover-color)',
        color: 'var(--text-color)',
        border: '1px solid var(--background-border-color)' 
    },
});

const AdminMenuTheme = {

	// BaseButton을 상속받아 확장
    RightClickMenuButton: styled(BaseButton)({
        backgroundColor: 'var(--background-color)',
        width: '120px',
        height: '30px',
    }),

    DisableButton: styled(BaseButton)({
        backgroundColor: 'var(--disable-color)',
        width: '140px',
        height: '30px',
    }),

    DeleteButton: styled(BaseButton)({
        backgroundColor: 'var(--delete-color)',
        width: '70px',
        height: '25px',
    }),

	RestoreButton: styled(BaseButton)({
        backgroundColor: 'var(--resotre-color)',
        width: '70px',
        height: '25px',
    }),

	NodeOpenButton: styled(BaseButton)({
		backgroundColor: 'transparent',
		border: '1px solid var(--background-border-color)',
        width: '60px',
        height: '25px',
		marginRight: '5px',
	}),
	NodeCloseButton: styled(BaseButton)({
		backgroundColor: 'transparent',
		border: '1px solid var(--background-border-color)',
        width: '60px',
        height: '25px',
		marginRight: '5px',
	}),

	ListButton1: styled(Button)({
		backgroundColor: 'var(--background-color)',
		color: 'var(--text-color)',
		'&:hover': {
			backgroundColor: 'var(--background-hover-color)',
		},
		border: '1px solid var(--background-border-color)',
		marginLeft:'3px',
		marginBottom:'3px',
		width: '60px',
		height: '23px',
	}),

};

export default AdminMenuTheme;