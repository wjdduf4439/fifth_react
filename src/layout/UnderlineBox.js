import React, { useState, useEffect } from 'react';
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

const UnderlineBox = (props) => {
	const [memoryInfo, setMemoryInfo] = useState(null);
	const [memoryInOut, setMemoryInOut] = useState(false);

	useEffect(() => {
		if (window.performance && window.performance.memory) {
			const { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize } = window.performance.memory;
			setMemoryInfo({
				jsHeapSizeLimit,
				totalJSHeapSize,
				usedJSHeapSize,
			});
		} else {
			console.warn('window.performance.memory is not supported in this browser.');
		}
	}, []);

	const handleMemoryInOut = () => {
		setMemoryInOut(!memoryInOut);
	}

	const formatBytes = (bytes) => {
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) return '0 Bytes';
		const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
		return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
	};

	return (
		<>
			<div className={`underline_box ${memoryInOut ? 'left_70per' : ''}`}>
				{memoryInfo ? (
					<ul className='underline_box_ul'>
						{/* 
						<li>
							JS 힙 크기 한도: {formatBytes(memoryInfo.jsHeapSizeLimit)}
							jsHeapSizeLimit: 자바스크립트 힙이 사용할 수 있는 최대 메모리 크기.
						</li>
						*/}
						<li onClick={() => handleMemoryInOut()}>
							<span className='font_size_30'>
								{memoryInOut ? <IoIosArrowDropright /> : <IoIosArrowDropleft />}
							</span>
						</li>
						<li>
							총 JS 힙 크기: {formatBytes(memoryInfo.totalJSHeapSize)}
							{/* totalJSHeapSize: 현재 힙에 할당된 총 메모리 크기 (사용 중인 메모리 + 여유 메모리). */}
						</li>
						<li>
							현재 사용중인 메모리: {formatBytes(memoryInfo.usedJSHeapSize)}
							{/* usedJSHeapSize: 현재 힙에서 실제로 사용되고 있는 메모리 크기. */}
						</li>
					</ul>
				) : (
					<p>메모리 정보를 불러올 수 없습니다.</p>
				)}
			</div>
			{/* 기존 컴포넌트 내용 */}
		</>
	);
}

export default UnderlineBox;