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

	if (!memoryInfo) return null;

	return (
		<div className={`underline_box ${memoryInOut ? 'left_60per' : ''}`}>
			<ul className='underline_box_ul'>
				<li onClick={() => handleMemoryInOut()}>
					<span className='font_size_30'>
						{memoryInOut ? <IoIosArrowDropright /> : <IoIosArrowDropleft />}
					</span>
				</li>
				<li>
					총 JS 힙 크기: {formatBytes(memoryInfo.totalJSHeapSize)}
				</li>
				<li>
					현재 사용중인 메모리: {formatBytes(memoryInfo.usedJSHeapSize)}
				</li>
			</ul>
		</div>
	);
}

export default UnderlineBox;