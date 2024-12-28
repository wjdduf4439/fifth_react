import React, { useState, useEffect } from 'react';
import { useAxios } from 'provider/AxiosProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';  // 상단에 추가

import MuiTheme from 'css/MuiTheme';

export const useShortcutKeyContent = (props) => {

	const {
		replyInsertButtonId,
		replyUpdateButtonId,
		replyResponseButtonId,
		showWriteForm, setShowWriteForm,
		showViewForm, setShowViewForm,
		backParams,
	} = props;

	const navigate = useNavigate();  // 추가
    const [searchParams] = useSearchParams();  // 추가

	const mappingShortcutKey = {
		'Escape': () => {
			backParams();
		}
	}

	const mappingReplyShortcutKey = {
		'Enter': (event) => {
			if (event.shiftKey) {
				event.preventDefault(); // 기본 Enter 동작 방지
				const replyInsertButton = document.getElementById(replyInsertButtonId);
				if (replyInsertButton) {
					replyInsertButton.click();
				}
			}
		}
	}

	const mappingReplyUpdateShortcutKey = {
		'Enter': (event) => {
			if (event.shiftKey) {
				event.preventDefault(); // 기본 Enter 동작 방지
				const replyUpdateButton = document.getElementById(replyUpdateButtonId);
				if (replyUpdateButton) {
					replyUpdateButton.click();
				}
			}
		}
	}

	const mappingResponseShortcutKey = {
		'Enter': (event) => {
			if (event.shiftKey) {
				event.preventDefault(); // 기본 Enter 동작 방지
				const replyResponseButton = document.getElementById(replyResponseButtonId);
				if (replyResponseButton) {
					replyResponseButton.click();
				}
			}
		}
	}

	const handleKeyDown = (event) => {
		const handler = mappingShortcutKey[event.key];
		//handler가 성공적으로 구현되면 실행
		if (handler) {
			handler();
		}
	};

	const handleReplyTextareaKeyDown = (event) => {
		const handler = mappingReplyShortcutKey[event.key];
		if (handler) {
			handler(event);
		}
	};

	const handleReplyUpdateTextareaKeyDown = (event) => {
		const handler = mappingReplyUpdateShortcutKey[event.key];
		if (handler) {
			handler(event);
		}
	};

	const handleResponseTextareaKeyDown = (event) => {
		const handler = mappingResponseShortcutKey[event.key];
		if (handler) {
			handler(event);
		}
	};

	// 키보드 이벤트 핸들러 추가
    useEffect(() => {

        // 이벤트 리스너 등록
        window.addEventListener('keydown', handleKeyDown);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
		//return () 이 실행되는 시점은 useEffect의 클린업 함수가 실행되는 시점이므로 이벤트 리스너가 제거됩니다:
		// 다음 두 경우에 실행됨:
		// 1. 컴포넌트 언마운트 시
		// 2. mappingShortcutKey가 변경되어 useEffect가 다시 실행되기 직전
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [mappingShortcutKey]);

	return {
		mappingShortcutKey,
		handleReplyTextareaKeyDown,
		handleReplyUpdateTextareaKeyDown,
		handleResponseTextareaKeyDown,
	}
}