import React, { useState } from 'react';


import UserMenu from 'layout/UserMenu';

import { useStringToolContext } from './stringToolContext';
const StringTool = (props) => {

	const { 
		renderString,
		decodeBase64,
		decodeUTF8,
	} = useStringToolContext();

	const [stringValue, setStringValue] = useState('');

	return (
		<div>
			
			<div className="main_container">
				
				<div className="container_toolString">
					<div className="content width_100per">

						<div className='string_tool_heading'>
							문자열 도구
						</div>

						
						<textarea value={stringValue} onChange={(e) => setStringValue(e.target.value)} 
							class="string_tool_textarea"
							placeholder="문자열 내용"
							/>

						<ul className='string_tool_result'>
							<li>
								문자열 내용 : 
								<div>
									{renderString(stringValue)}
								</div>
							</li>
							<li>
								문자열 길이 : {stringValue.length}
							</li>
							<li>
								base64 디코딩 결과 : 
								<div>
									{renderString(decodeBase64(stringValue))}
								</div>
							</li>
							<li>
								utf-8 디코딩 결과 : 
								<div>
									{renderString(decodeUTF8(stringValue))}
								</div>
							</li>
							<li>
								대문자 변환 결과 : 
								<div>
									{renderString(stringValue.toUpperCase())}
								</div>
							</li>
							<li>
								소문자 변환 결과 : 
								<div>
									{renderString(stringValue.toLowerCase())}
								</div>
							</li>
						</ul>

					</div>
				</div>

			</div>
		</div>
	);
}

export default StringTool;