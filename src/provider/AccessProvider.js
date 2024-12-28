import { useState, useEffect, useContext, createContext } from 'react';

// Context 생성
export const AccessContext = createContext();

// Provider 컴포넌트 생성
export const AccessProvider = ({ children }) => {

	const [code, setCode] = useState(null);
	const [id, setId] = useState(null);
	const [nick, setNick] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

	useEffect(() => {
		setCode(localStorage.getItem('code'));
		setId(localStorage.getItem('id'));
		setNick(localStorage.getItem('nick'));
		setAccessToken(localStorage.getItem('accessToken'));
		setRefreshToken(localStorage.getItem('refreshToken'));
	}, []);

    return (
        <AccessContext.Provider value={{ code, setCode, id, setId, nick, setNick, accessToken, setAccessToken, refreshToken, setRefreshToken }}>
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