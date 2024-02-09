import React, {useState} from 'react';
import './App.css';

function Calculator(){
	const [currentValue, setCurrentValue] = useState('0');
	const [operator, setOperator] = useState(null);
	const [result, setResult] = useState('0');
	const [hasDecimal, setHasDecimal] = useState(false);
	
	const handleClick = (event) => {
		let newClick = event.target.value;
		setCurrentValue(isNaN(Number(currentValue+newClick))
			? currentValue
			: (hasDecimal === true
				? currentValue+newClick
				: Number(currentValue+newClick)));
	};
	
	const handleMinus = (event) => {
		if(currentValue==='0'){
			// minus as operand
			setCurrentValue('-');
			setHasDecimal(false);
		}
		else{
			setCurrentValue('0');
			setOperator('-');
			setResult(operator === null
						? currentValue	//minus as a first operator
						: eval(result+operator+currentValue));
			setHasDecimal(false);
		}
		//console.log("After handleMinus", this.state);
	}
	
	const handleOperator = (event) => {
		const newClick = event.target.value;
		console.log(newClick);
		//handle change in operators
		if(result!=='0' && currentValue==='0'){
			setOperator(newClick);
			setCurrentValue('0');
			setHasDecimal(false);
		}
		//handle consecutive operators
		else if(result !== '0'
			&& currentValue !== '0'
			&& operator!=null){
			setResult(eval(result+operator+currentValue));
			setCurrentValue('0');
			setOperator(newClick);
			setHasDecimal(false);
		}
		else{
			setOperator(newClick);
			setCurrentValue('0');
			setResult(currentValue);
			setHasDecimal(false);
		}
		//console.log("After handleOperator:",this.state);
	}
	
	const handleEqualTo = (event) => {
		let result=eval(result+operator+currentValue);
		setCurrentValue(result);
		setOperator(null);
		//console.log("After handleEqualTo:", this.state);
	}
	
	const handleClear = (event) => {
		setCurrentValue('0');
		setOperator(null);
		setResult('0');
		setHasDecimal(false);
	}
	
	const handleDecimal = (event) => {
		setCurrentValue(hasDecimal?currentValue:(currentValue+'.'));
		setHasDecimal(true);
	}
	
	return (
		<div className='calculator'>
			<Display result={currentValue} />
			<Buttons handleClick={handleClick} handleOperator={handleOperator} handleEqualTo={handleEqualTo} handleClear={handleClear} handleDecimal={handleDecimal} handleMinus={handleMinus} />
		</div>
	);
}

function Display({result}){
	return (
		<div>
			<input className='formulaScreen' id="display" value={result}></input>
		</div>
	);
}

function Buttons({handleClear, handleOperator, handleClick, handleMinus, handleDecimal, handleEqualTo}){
	return (
		<div>
			<button id="clear" value='AC' className='extraWideButton' style={{backgroundColor:"#CB0107"}} onClick={handleClear}>AC</button>
			<button id="divide" value='/' className='operatorStyle' onClick={handleOperator}>/</button>
			<button id="seven" value='7' onClick={handleClick}>7</button>
			<button id="eight" value='8' onClick={handleClick}>8</button>
			<button id="nine" value='9' onClick={handleClick}>9</button>
			<button id="multiply" value='*' className='operatorStyle' onClick={handleOperator}>X</button>
			<button id="four" value='4' onClick={handleClick}>4</button>
			<button id="five" value='5' onClick={handleClick}>5</button>
			<button id="six" value='6' onClick={handleClick}>6</button>
			<button id="add" value='+' className='operatorStyle' onClick={handleOperator}>+</button>
			<button id="one" value='1' onClick={handleClick}>1</button>
			<button id="two" value='2' onClick={handleClick}>2</button>
			<button id="three" value='3' onClick={handleClick}>3</button>
			<button id="subtract" value='-' className='operatorStyle' onClick={handleMinus}>-</button>
			<button id="zero" value='0' className='wideButton' onClick={handleClick}>0</button>
			<button id="decimal" value='.' onClick={handleDecimal}>.</button>
			<button id="equals" value='=' style={{backgroundColor:"#365481"}} onClick={handleEqualTo}>=</button>
		</div>
	);
}

export default Calculator;
