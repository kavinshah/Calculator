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
	//const [currentValue, setCurrentValue] = useState('0');
	const [result, setResult] = useState('0');
	const [operator, setOperator] = useState(null);
	const [hasDecimal, setHasDecimal] = useState(false);

	const handleClick = (event) => {
		let newClick = event.target.value;
		handleDisplayValue(isNaN(Number(displayValue+newClick))
			? displayValue
			: (hasDecimal === true
				? displayValue+newClick
				: Number(displayValue+newClick)));
	};
	
	const handleMinus = (event) => {
		if(displayValue==='0'){
			// minus as operand
			handleDisplayValue('-');
			setHasDecimal(false);
		}
		else{
			handleDisplayValue('0');
			setOperator('-');
			setResult(operator === null
						? displayValue	//minus as a first operator
						: eval(result+operator+displayValue));
			setHasDecimal(false);
		}
		//console.log("After handleMinus", this.state);
	}
	
	const handleOperator = (event) => {
		const newClick = event.target.value;
		console.log(newClick);
		//handle change in operators
		if(result!=='0' && displayValue==='0'){
			setOperator(newClick);
			handleDisplayValue('0');
			setHasDecimal(false);
		}
		//handle consecutive operators
		else if(result !== '0'
			&& displayValue !== '0'
			&& operator!=null){
			setResult((result) => eval(result+operator+displayValue));
			handleDisplayValue('0');
			setOperator(newClick);
			setHasDecimal(false);
		}
		else{
			setOperator(newClick);
			handleDisplayValue('0');
			setResult(displayValue);
			setHasDecimal(false);
		}
		//console.log("After handleOperator:",this.state);
	}
	
	const handleEqualTo = (event) => {
		//console.log("result:", result);
		if(operator===null)
		{
			handleDisplayValue(result);
			return;
		}
		
		//console.log("result:", result, "\toperator:", operator, "\tcurrentvalue:", currentValue);
		//console.log("eval:", eval(result+operator+currentValue));
		setResult((result) => eval(result+operator+displayValue));
		handleDisplayValue(result);
		setOperator(null);
		//console.log("After handleEqualTo:", this.state);
	}
	
	const handleClear = (event) => {
		handleDisplayValue('0');
		setOperator(null);
		setResult('0');
		setHasDecimal(false);
	}
	
	const handleDecimal = (event) => {
		if(!hasDecimal)
		{
			handleDisplayValue(displayValue+'.');
		}
		setHasDecimal(true);
	}
	
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
