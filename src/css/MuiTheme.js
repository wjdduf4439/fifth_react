import { styled } from '@mui/material/styles';

import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { brown } from '@mui/material/colors';

const CommonTextField = styled(TextField)({
    margin: '10px 5px',
    color: 'var(--text-color)',
    '& label': {
        color: 'var(--background-border-color)',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'var(--background-border-color) !important',
    },
	'& .MuiInputLabel-root.Mui-disabled': {
		color: 'var(--background-border-color) !important',
	},
    '& .MuiOutlinedInput-root': {
        color: 'var(--text-color)',
        '& fieldset': {
            borderColor: 'var(--background-border-color)',
        },
        '&:hover fieldset': {
            borderWidth: '2px',
            borderColor: 'var(--background-border-color)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'var(--background-border-color)',
        },
    },
	'& .MuiOutlinedInput-root.Mui-disabled': {
		color: 'var(--text-color)',
		'& fieldset': {
			borderColor: 'var(--background-border-color)',
		},
		'&:hover fieldset': {
			borderWidth: '2px',
			borderColor: 'var(--background-border-color)',
		},
		'&.Mui-focused fieldset': {
			borderColor: 'var(--background-border-color)',
		},
		// input 내용 색상 변경을 위한 스타일 추가
		'& input': {
			'-webkit-text-fill-color': 'var(--text-color) !important',
			color: 'var(--text-color)',
		},
	},
});

const CommonButton = styled(Button)({
	backgroundColor: 'var(--background-color)',
	color: 'var(--text-color)',
	'&:hover': {
	backgroundColor: 'var(--background-hover-color)',
	},
	border: '1px solid var(--background-border-color)',
});


const MuiTheme = {
	TopMenuButton: styled('button')({
		backgroundColor: 'var(--background-color)',
		color: 'var(--text-color)',
		'&:hover': {
		backgroundColor: 'var(--background-color)',
		},
		padding: '10px 20px',
		boxShadow: '1px 1px 1px 2px var(--background-border-color)',
		borderRadius: '1px',
	}),
	RightMenuButton: styled('button')({
		backgroundColor: 'var(--background-color)',
		color: 'var(--text-color)',
		'&:hover': {
		backgroundColor: 'var(--background-color)',
		cursor: 'pointer',
		boxShadow: '2px 2px 2px 4px var(--background-border-color)',
		fontWeight: 'bold',
		},
		position: 'relative',
		width: '100%',
		padding: '10px 20px',
		boxShadow: '1px 1px 1px 2px var(--background-border-color)',
		borderRadius: '1px',
	}),
	ContractButton: styled('button')({
		backgroundColor: 'var(--background-color)',
		color: 'var(--text-color)',
		'&:hover': {
		backgroundColor: 'var(--background-color)',
		},
		padding: '10px 20px',
		boxShadow: '1px 1px 1px 2px var(--background-border-color)',
		borderRadius: '1px',
	}),
	ShowPwButton: styled('button')({
		backgroundColor: 'var(--background-color)',
		color: 'var(--text-color)',
		'&:hover': {
		//   backgroundColor: 'var(--background-color_loginbutton)',
		boxShadow: '1px 1px 1px 3px var(--background-border-color)',
		},
		marginLeft: '10px',
		padding: '1px 20px',
		boxShadow: '1px 1px 1px 2px var(--background-border-color)',
		borderRadius: '1px',
	}),
	LoginButton: styled('button')({
		backgroundColor: 'var(--background-color)',
		color: 'var(--text-color)',
		'&:hover': {
		//   backgroundColor: 'var(--background-color_loginbutton)',
		boxShadow: '1px 1px 1px 3px var(--background-border-color)',
		},
		padding: '10px 20px',
		boxShadow: '1px 1px 1px 2px var(--background-border-color)',
		borderRadius: '1px',
	}),
	CancelButton: styled('button')({
		backgroundColor: 'var(--background-color)',
		color: 'var(--text-color)',
		'&:hover': {
		//backgroundColor: 'var(--background-color_cancelbutton)',
		boxShadow: '1px 1px 1px 3px var(--background-border-color)',
		},
		padding: '10px 20px',
		boxShadow: '1px 1px 1px 2px var(--background-border-color)',
		borderRadius: '1px',
	}),
	ProfileModalButton: styled('button')({
		backgroundColor: 'var(--background-color)',
		color: 'var(--text-color)',
		'&:hover': {
		backgroundColor: 'var(--modal-menu-hover-color)',
		},
		border: '0px solid var(--background-border-color)',
		padding: '5px 20px',
	}),
	LikeButton: styled('button')({
		width: '120px',
		margin: '5px 20px',
		padding: '10px 15px',
		backgroundColor: 'var(--background-color)',
		color: 'var(--text-color)',
		'&:hover': {
		backgroundColor: 'var(--modal-menu-hover-color)',
		},
		boxShadow: '0px 0px 0px 1px var(--background-border-color)',
	}),

	ListButton1: styled(CommonButton)({
		marginRight: '20px',
		padding: '5px 20px',
	}),
	ReplyInsertButton: styled(CommonButton)({
		width: '100%',
		height: '100%',
		padding: '0px 20px',
	}),
	ReplyUpdateButton: styled(CommonButton)({
		minWidth: '40px',
		minHeight: '100%',
		height: '100%',
		padding: '0px 2px',
	}),
	ReplyDeleteButton: styled(CommonButton)({
		minWidth: '40px',
		minHeight: '100%',
		height: '100%',
		padding: '0px 2px',
	}),

	ListItemCheckbox: styled(Checkbox)({
		color: 'var(--text-color)', // 기본 테두리 색상
		'&.Mui-checked': {
		color: 'var(--text-color)', // 체크된 상태의 색상
		},
		'&:hover': {
		backgroundColor: 'transparent', // hover 시 배경색 제거
		},
	}),

	ListItem1: styled(ListItem)({
		color: 'var(--text-color)', // 기본 테두리 색상
		'&.Mui-checked': {
		color: 'var(--text-color)', // 체크된 상태의 색상
		},
		'&:hover': {
			boxShadow: '0px 0px 1px 1px var(--background-border-color)',
			backgroundColor: 'transparent', // hover 시 배경색 제거
		},
	}),

	ListItemText1: styled(ListItemText)({
		'& .MuiTypography-root': {
		color: 'var(--text-color)', // 기본 텍스트 색상
		},
		'& .MuiTypography-secondary': {
		color: 'var(--secondary-text-color)', // secondary 텍스트 색상
		},
	}),

	FormControlLabel1: styled(FormControlLabel)({
		//justifyContent: 'center',
		alignItems: 'center', // 수직 중앙 정렬 추가
		height: '54px',
		margin: '10px 0px',
		padding: '0px 10px',
		border: '1px solid var(--background-border-color)',
		borderRadius: '5px',
	}),
	
    CustomBox: styled(Box)({
        border: '1px solid var(--background-border-color)',
        // margin: '16px',
        padding: '16px',
        width: '95%',
		minHeight: '450px',
    }),
	MenuInfoBox: styled(Box)({
        border: '1px solid var(--background-border-color)',
		padding: '16px',
		width: '95%',
		height: '450px',
    }),

	InputLabel1: styled(InputLabel)({
		color: 'var(--background-border-color)', // 라벨 색상 설정
		padding: '25px 0px',
		'&.Mui-focused': {
			color: 'var(--background-border-color)', // 포커스 상태의 라벨 색상 설정
		},
	}),
	Select1: styled(Select)({
		margin: '25px 2px',
		color: 'var(--text-color)', // 기본 텍스트 색상 설정
		border: '1px solid var(--background-border-color)',
		// 아이콘 색상 변경을 위한 스타일 추가
		'& .MuiSelect-icon': {
			color: 'var(--background-border-color)',  // 기본 아이콘 색상
		},

		'&.Mui-disabled .MuiSelect-icon': {
			color: '#000000',  // 비활성화 상태의 아이콘 색상
		},
		
		'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
			// borderColor: 'var(--background-border-color)', // 활성화 상태의 테두리 색상 설정
		},
        '&.Mui-disabled': {
			// '.css-w76bbz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input .Mui-disabled'			
            color: 'var(--background-border-color)',
            borderColor: 'var(--background-border-color)',
        },
		'& .MuiSelect-select.Mui-disabled': {
			'-webkit-text-fill-color': 'var(--background-border-color) !important',
		},
	}),

	MenuItem1: styled(MenuItem)({
		color: 'var(--background-border-color)', // 기본 텍스트 색상 설정
	}),

	DialogContent1: styled(DialogContent)({
		// height: '500px',
		color: 'var(--text-color)',
		backgroundColor: 'var(--background-color)',
		border: '1px solid var(--background-border-color)',
	}),

	TextField1: styled(CommonTextField)({
		width: '32%',
	}),

	TextField2: styled(CommonTextField)({
		margin: '10px 0px',
		width: '100%',
	}),



};

export default MuiTheme;