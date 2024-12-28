import React, { createContext, useState, useEffect, useContext } from 'react';

/**
 * createContext안에 provider을 담을수 있는 공간이 만들어지고,
 * 그 안에 ThemeProvider 기능을 넣어서 제공하는게 provider의 핵심
 * 
 * ThemeContext는 애플리케이션의 테마 상태를 관리하는 컨텍스트입니다.
 * 
 * ThemeProvider 컴포넌트는 하위 컴포넌트들에게 테마 관련 상태와 함수를 제공하는 역할을 합니다.
 * - isDarkMode: 현재 다크 모드 여부를 나타내는 상태입니다.
 * - toggleTheme: 다크 모드와 라이트 모드를 토글하는 함수입니다.
 * 
 * ThemeProvider는 다음과 같은 기능을 수행합니다:
 * 1. 사용자의 테마 선호도를 로컬 스토리지에서 가져와 초기 상태를 설정합니다.
 * 2. 테마 변경 시, body 클래스에 'dark-mode'를 추가하거나 제거하여 스타일을 변경합니다.
 * 3. 테마 상태를 로컬 스토리지에 저장하여, 사용자가 페이지를 새로고침해도 설정이 유지되도록 합니다.
 * 
 * ThemeContext.Provider는 value 속성을 통해 하위 컴포넌트들에게 isDarkMode 상태와 toggleTheme 함수를 전달합니다.
 * 이를 통해 하위 컴포넌트들은 ThemeContext를 구독하고, 테마 상태를 읽거나 변경할 수 있습니다.
 */

//ThemeContext는 애플리케이션 전체에서 테마 상태를 공유하기 위해 선언됩니다.
export const ThemeContext = createContext();

//ThemeProvider는 하위 컴포넌트들에게 테마 관련 상태와 함수를 제공하는 역할을 합니다.
export const ThemeProvider = ({ children }) => {
	//다크모드 여부
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 사용자의 테마 선호도를 로컬 스토리지에서 가져오기
    useEffect(() => {
        const storedTheme = localStorage.getItem('isDarkMode');
        if (storedTheme) {
            setIsDarkMode(JSON.parse(storedTheme));
        }
    }, []);

    // 테마 변경 시 클래스 토글 및 로컬 스토리지 업데이트
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

	//다크모드 토글
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
		//다크모드 여부와 토글 함수를 제공
        // ThemeContext.Provider는 하위 컴포넌트에 테마 관련 상태와 함수를 전달하는 역할을 합니다.
        // value 옵션은 Context를 통해 전달할 데이터를 정의합니다.
        // 여기서는 isDarkMode 상태와 toggleTheme 함수를 value로 전달하여,
        // 하위 컴포넌트들이 이를 사용할 수 있도록 합니다.
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {	
	const context = useContext(ThemeContext);

	if (!context) {
        throw new Error('useTheme must be used within an ThemeProvider');
    }

    return context;
}

