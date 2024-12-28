import { useState, useEffect } from 'react';

export const useStringToolContext = (
	
) => {

	const renderString = (targetString) => {
		if (targetString.startsWith('http://') || targetString.startsWith('https://')) {
			return <a href={targetString} target="_blank" rel="noopener noreferrer">{targetString}</a>;
		} else if ( isJsonString(targetString) ) {
			return customFormatJson(targetString);
		} else {
			return targetString;
		}
	};

	function isJsonString(targetString) {
		try {
			JSON.parse(targetString);
			return true;
		} catch (error) {
			return false;
		}
	}

	function customFormatJson(targetString) {
		try {
			const jsonObject = JSON.parse(targetString);
			const formattedJson = JSON.stringify(jsonObject, (key, value) => {
				if (key === 'ip') {
					return `&nbsp;${value}`;
				}
				return value;
			}, 2);
	
			// 개행된 "ip" 키를 다시 한 줄로 합치기
			return formattedJson.replace(/"&nbsp;/g, '"');
		} catch (error) {
			console.error('JSON 포맷팅 오류:', error);
			return '유효한 JSON 문자열이 아닙니다.';
		}
	}

	const decodeBase64 = (targetString) => {
		try {
			// Base64 디코딩
			const binaryString = atob(targetString);
			return binaryString;
		} catch (error) {
			console.error('디코딩 오류:', error);
			return '디코딩에 실패했습니다.';
		}
	};

	const decodeUTF8 = (base64String) => {
		try {
			
			// 문자 코드를 Uint8Array로 변환
			const bytes = Uint8Array.from(base64String, char => char.charCodeAt(0));
			
			// TextDecoder를 사용하여 UTF-8 문자열로 디코딩
			const decoder = new TextDecoder('utf-8');

			return decoder.decode(bytes);
		} catch (error) {
			console.error('디코딩 오류:', error);
			return '디코딩에 실패했습니다.';
		}
	};

	return {
		renderString,
		decodeBase64,
		decodeUTF8,
    };
};