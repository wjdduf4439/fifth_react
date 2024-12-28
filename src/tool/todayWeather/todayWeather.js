import React, { useState } from 'react';


import UserMenu from 'layout/UserMenu';

import { useTodayWeatherContext } from './todayWeatherContext';
const TodayWeather = (props) => {

	const [tempLondon, setTempLondon] = useState('');
	const [descLondon, setDescLondon] = useState('');
	const [iconLondon, setIconLondon] = useState('');
	const [tempDaegu, setTempDaegu] = useState('');
	const [descDaegu, setDescDaegu] = useState('');
	const [iconDaegu, setIconDaegu] = useState('');
	const [ready, setReady] = useState(false);

	const url_London = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=8be41fa10c42d946a385340edfa0b94a&units=metric`;
	const url_Daegu = `https://api.openweathermap.org/data/2.5/weather?q=Daegu&appid=8be41fa10c42d946a385340edfa0b94a`;

	const { 
		
	} = useTodayWeatherContext(
		url_London, 
		tempLondon, setTempLondon,
		descLondon, setDescLondon,
		iconLondon, setIconLondon,
		url_Daegu,
		tempDaegu, setTempDaegu,
		descDaegu, setDescDaegu,
		iconDaegu, setIconDaegu,
		ready, setReady,
	);

	return (
		<div>
			<div className="main_container">
				<div className="container">
					<div className="content">
						<h2>오늘의 날씨</h2>
						런던 날씨 정보 주소  : https://api.openweathermap.org/data/2.5/weather?q=London&appid=8be41fa10c42d946a385340edfa0b94a <br/>
						<ul>
							<li> Temperature : { tempLondon } </li>
							<li> Description : { descLondon } </li>
							<li> <img src={ `https://openweathermap.org/img/wn/${iconLondon}@2x.png` } alt='weather icon' style={{ backgroundColor: 'black'}} /> </li>
						</ul>
						대구 날씨 정보 주소  : https://api.openweathermap.org/data/2.5/weather?q=Daegu&appid=8be41fa10c42d946a385340edfa0b94a <br/>
						<ul>
							<li> Temperature : { tempDaegu } </li>	
							<li> Description : { descDaegu } </li>
							<li> <img src={ `https://openweathermap.org/img/wn/${iconDaegu}@2x.png` } alt='weather icon' style={{ backgroundColor: 'black'}} /> </li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TodayWeather;