import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
	const [hexColor, setHexColor] = useState(''); // переменная сохранения состояния поля hex
	const [rgbColor, setRgbColor] = useState(''); // переменная сохранения состония поля rgb 
	const [error, setError] = useState(false); // переменная состояния ошибки по умолчанию выключена

	const inputChangeHex = (event: React.ChangeEvent<HTMLInputElement>) => { // в ивенте указал реакту что это поле инпут

		const inputEvent = event.target.value; // записал в переменную данные ввода

		const isValidText = (event: string) => {
			if (event.charAt(0) !== '#' || event.length !== 7) { // проверка на волидность ввода hex 
				return false;
			}
			return true;
		}

		const hexToRgb = (hex: string) => { // преобразую вывод хекса в rgb из 16 в 10 значения
			const r = parseInt(hex.slice(1, 3), 16);
			const g = parseInt(hex.slice(3, 5), 16);
			const b = parseInt(hex.slice(5, 7), 16);
			return { r, g, b };
		};

		setHexColor(inputEvent); // обновление состояния текущего значения инпута 

		if (isValidText(inputEvent)) { // если данные прошли 
			setError(false); // ошибка выключена 
			const rgb = hexToRgb(inputEvent); // в переменую rgb сохраняю текущее значение поля инпут
			setRgbColor(`RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`); // вывожу в поле rgb текущее значение hex
			document.body.style.backgroundColor = inputEvent; // включаю стиль под введенный hex
		} else {
			setError(true); // ошибка включена
			setRgbColor('Ошибка'); //в поле rgb вывел ошибка 
			document.body.style.backgroundColor = 'Red'; // стиль по умолчанию красный 
		}
	}



	return (
		<div className="App">
			<h1>HEX to RGB Color Converter</h1>
			<input
				type="text"
				value={hexColor}
				onChange={inputChangeHex}
				placeholder="формат ввода #RRGGBB"
			/>
			{error && <div className="error">Ошибка</div>}
			<div>{rgbColor}</div>
		</div>
	);
};

export default App;
