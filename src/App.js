import React, {useState} from 'react';
import './App.css';

function Calculator(){
	const [displayValue, setDisplayValue] = useState(0);
	return (
		<div className='calculator'>
			<Display val={displayValue} />
			<Buttons displayValue={displayValue} handleDisplayValue={setDisplayValue} />
		</div>
	);
}

function Display({val}){
	return (
		<div>
			<input className='formulaScreen' id="display" value={val} readOnly />
		</div>
	);
}

function Buttons({displayValue, handleDisplayValue}){
	const [result, setResult] = useState('0');
	const [currentExpression, setCurrentExpression] = useState('0');
	
	const handleClearClick = (event) => {
		handleDisplayValue('0');
		setResult('0');
		setCurrentExpression('0');
	}
	
	const handleDigitClick = (event) => {
		let newClick = event.target.value;
		//console.log("digit clicked:", newClick);
		handleDisplayValue(newClick);

		if(currentExpression==='0')
			setCurrentExpression(newClick);
		else if(!isNaN(currentExpression))
			setCurrentExpression((currentExpression)=> currentExpression + newClick);
		else if(currentExpression==='+' || currentExpression==='-'|| currentExpression==='*' || currentExpression==='/')
		{
			setResult((result)=> result + currentExpression);
			setCurrentExpression(newClick);
		}
		else if(currentExpression.includes('.'))
		{
			setCurrentExpression((currentExpression)=> currentExpression + newClick);
		}
		else
		{
			//console.log("handleDigitClick : unknown current expression:", currentExpression);
		}

		//console.log("current expression:", currentExpression);
		//console.log("result:", result);

	};

	const handleOperatorClick = (event) => {
		let operator = event.target.value;
		//console.log("operator clicked:", operator);
		if(currentExpression === '0')
		{
			if(result !== '0')
				setCurrentExpression(operator)
			else if(result==='0' && operator==='-')
				setCurrentExpression(operator);
		}
		else if(!isNaN(currentExpression))
		{
			if(result === '0')
			{
				setResult(currentExpression);
			}
			else 
			{
				setResult((result)=> result + currentExpression);
			}
			setCurrentExpression(operator);
		}
		else if(currentExpression==='+' || currentExpression==='-'|| currentExpression==='*' || currentExpression==='/')
		{
			setCurrentExpression(operator);
		}
		else if(currentExpression.includes("."))
		{
			setResult((result)=> result + (currentExpression.replace(".", "")));
			setCurrentExpression(operator);
			//console.log(currentExpression);
		}
		else
		{
			//console.log("handleOperatorClick : unknown current expression:", currentExpression);
		}
		//console.log("current expression:", currentExpression);
		//console.log("result:", result);
	}

	const handleEqualToClick = (event) => {
		//console.log("handleEqualToClick");
		if(!isNaN(currentExpression))
		{
			handleDisplayValue(eval(result+currentExpression));
			setResult((result) => eval(result+currentExpression));
		}
		else
		{
			handleDisplayValue(eval(result));
			setResult((result) => eval(result));
		}
		setCurrentExpression('0');
		//console.log("current expression:", currentExpression);
		//console.log("result:", result);
	};

	const handleDecimalClick = (event) => {
		if(currentExpression === '0')
		{
			setCurrentExpression((currentExpression) => currentExpression + '.');
		}
		else if(!isNaN(currentExpression))
		{
			if(!currentExpression.includes('.')){
				setCurrentExpression((currentExpression) => currentExpression + '.');
			}
		}
		else if(currentExpression==='+' || currentExpression==='-'|| currentExpression==='*' || currentExpression==='/')
		{
			setResult((result) => result + currentExpression);
			setCurrentExpression('0.');
		}
	};

	return (
		<div>
			<button id="clear" value='AC' className='extraWideButton' style={{backgroundColor:"#CB0107"}} onClick={handleClearClick}>AC</button>
			<button id="divide" value='/' className='operatorStyle' onClick={handleOperatorClick}>/</button>
			<button id="seven" value='7' onClick={handleDigitClick}>7</button>
			<button id="eight" value='8' onClick={handleDigitClick}>8</button>
			<button id="nine" value='9' onClick={handleDigitClick}>9</button>
			<button id="multiply" value='*' className='operatorStyle' onClick={handleOperatorClick}>X</button>
			<button id="four" value='4' onClick={handleDigitClick}>4</button>
			<button id="five" value='5' onClick={handleDigitClick}>5</button>
			<button id="six" value='6' onClick={handleDigitClick}>6</button>
			<button id="add" value='+' className='operatorStyle' onClick={handleOperatorClick}>+</button>
			<button id="one" value='1' onClick={handleDigitClick}>1</button>
			<button id="two" value='2' onClick={handleDigitClick}>2</button>
			<button id="three" value='3' onClick={handleDigitClick}>3</button>
			<button id="subtract" value='-' className='operatorStyle' onClick={handleOperatorClick}>-</button>
			<button id="zero" value='0' className='wideButton' onClick={handleDigitClick}>0</button>
			<button id="decimal" value='.' onClick={handleDecimalClick}>.</button>
			<button id="equals" value='=' style={{backgroundColor:"#365481"}} onClick={handleEqualToClick}>=</button>
		</div>
	);
}

export default Calculator;
