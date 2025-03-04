import { useState, useEffect, useContext, createContext } from 'react';

// Context 생성
export const AccessContext = createContext();

// Provider 컴포넌트 생성
export const AccessProvider = ({ children }) => {

	// const [code, setCode] = useState(null);
	// const [id, setId] = useState(null);
	// const [nick, setNick] = useState(null);
    // const [accessToken, setAccessToken] = useState(null);
    // const [refreshToken, setRefreshToken] = useState(null);

	const accessInfoReset = {
		accessCode: '',
		id: '',
		nick: '',
		role: '',
		accessToken: '',
		refreshToken: ''
	}

	const [accessInfo, setAccessInfo] = useState(accessInfoReset);

	useEffect(() => {
		setAccessInfo({
			accessCode: localStorage.getItem('accessCode'),
			id: localStorage.getItem('id'),
			nick: localStorage.getItem('nick'),
			role: localStorage.getItem('role'),
			accessToken: localStorage.getItem('accessToken'),
			refreshToken: localStorage.getItem('refreshToken')
		});
	}, []);

    return (
        <AccessContext.Provider value={{ accessInfo, setAccessInfo }}>
            {children}
        </AccessContext.Provider>
    );
};

export const useAccess = () => {	
	const context = useContext(AccessContext);

	if (!context) {
        throw new Error('useAccess must be used within an AccessProvider');
    }

    return context;
};