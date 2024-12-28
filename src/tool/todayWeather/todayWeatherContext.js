import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTodayWeatherContext = (
	url_London, 
	tempLondon, setTempLondon,
	descLondon, setDescLondon,
	iconLondon, setIconLondon,
	url_Daegu,
	tempDaegu, setTempDaegu,
	descDaegu, setDescDaegu,
	iconDaegu, setIconDaegu,
	ready, setReady,
) => {

	const getLondonWeather = async (siteCode) => {		
			
		//console.log("addNewNode Parent node siteCode: ", siteCode);
	
		await axios.post(url_London).then(response => {
			const data = response.data;
			setTempLondon(data.main.temp);
			setDescLondon(data.weather[0].description);
			setIconLondon(data.weather[0].icon);
			setReady(true);
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	};

	
	const getDaeguWeather = async (siteCode) => {		
			
		//console.log("addNewNode Parent node siteCode: ", siteCode);
	
		await axios.post(url_Daegu).then(response => {
			const data = response.data;
			setTempDaegu(data.main.temp);
			setDescDaegu(data.weather[0].description);
			setIconDaegu(data.weather[0].icon);
			setReady(true);
		}).catch(error => {
			console.error('Error updating data:', error);
		});
	};

	useEffect(() => {
		
		getLondonWeather();
		getDaeguWeather();

	}, []);

	return {
		
    };
};