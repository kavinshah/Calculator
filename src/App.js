import React from 'react';
import './App.css';

class Calculator extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			currentValue:'0',
			operator:null,
			result:'0',
			hasDecimal:false
		};
			
		this.handleClick=this.handleClick.bind(this);
		this.handleOperator=this.handleOperator.bind(this);
		this.handleEqualTo=this.handleEqualTo.bind(this);
		this.handleClear=this.handleClear.bind(this);
		this.handleDecimal=this.handleDecimal.bind(this);
		this.handleMinus=this.handleMinus.bind(this);
	}
	
	handleClick(event){
		const newClick = event.target.value;
		this.setState((state)=>({
			currentValue: isNaN(Number(state.currentValue+newClick))
			? state.currentValue
			: (state.hasDecimal === true
				? state.currentValue+newClick
				: Number(state.currentValue+newClick))
			}));
		//console.log("After handleClick", this.state);
	}
	
	handleMinus(event){
		if(this.state.currentValue==='0'){
			// minus as operand
			this.setState((state)=>({
				currentValue : '-',
				operator : state.operator,
				result : state.result,
				hasDecimal:false
				}));
		}
		else{
			this.setState((state)=>({
				currentValue:'0',
				operator : '-',
				result : (state.operator === null
						? state.currentValue	//minus as a first operator
						: eval(state.result+state.operator+state.currentValue)), // minus as successive operator
				hasDecimal:false
				}));
		}
		//console.log("After handleMinus", this.state);
	}
	
	handleOperator(event){
		const newClick = event.target.value;
		console.log(newClick);
		//handle change in operators
		if(this.state.result!=='0' && this.state.currentValue==='0'){
			this.setState((state)=>({
				operator:newClick,
				currentValue:'0',
				result:state.result,
				hasDecimal:false
			}));
		}
		//handle consecutive operators
		else if(this.state.result !== '0'
			&& this.state.currentValue !== '0'
			&& this.state.operator!=null){
			this.setState((state)=>({
					result: eval(state.result
								+state.operator
								+state.currentValue),
					currentValue:'0',
					operator:newClick,
					hasDecimal:false
			}));
		}
		else{
			this.setState((state)=>({
				operator:newClick,
				currentValue:'0',
				result:state.currentValue,
				hasDecimal:false
			}));
		}
		//console.log("After handleOperator:",this.state);
	}
	
	handleEqualTo(event){
		const result=eval(this.state.result
						+this.state.operator
						+this.state.currentValue);
		
		this.setState((state)=>({
			currentValue:result,
			operator:null,
			result:result
		}));
		//console.log("After handleEqualTo:", this.state);
	}
	
	handleClear(event){
		this.setState({
			currentValue:'0',
			operandOne:null,
			operandTwo:null,
			operator:null,
			result:'0',
			hasDecimal:false
	  });
	}
	
	handleDecimal(event){
		this.setState((state)=>({
			currentValue:state.hasDecimal?state.currentValue:(state.currentValue+'.'),
			hasDecimal:true
		}));
	}
	
	render(){
		return (
			<div className='calculator'>
				<Display result={this.state.currentValue} />
				<Buttons handleClick={this.handleClick} handleOperator={this.handleOperator} handleEqualTo={this.handleEqualTo} handleClear={this.handleClear} handleDecimal={this.handleDecimal} handleMinus={this.handleMinus} />
			</div>
		);
	}
}

class Display extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
		};
	}
	
	render(){
		return (
			<div>
				<input id="display" value={this.props.result}></input>
			</div>
		);
	}
}

class Buttons extends React.Component
{
	constructor(props){
		super(props);
			this.state={
			};
		}

	render() {
		return (
			<div>
				<div className='row'>
						<button id="clear" value='AC' className='extraWideButton' style={{backgroundColor:"#CB0107"}} onClick={this.props.handleClear}>AC</button>
						<button id="divide" value='/' className='operatorStyle' onClick={this.props.handleOperator}>/</button>
				</div>
				<div className='row'>
						<button id="seven" value='7' className='' onClick={this.props.handleClick}>7</button>
					<button id="eight" value='8' className='' onClick={this.props.handleClick}>8</button>
						<button id="nine" value='9' className='' onClick={this.props.handleClick}>9</button>
						<button id="multiply" value='*' className='operatorStyle' onClick={this.props.handleOperator}>X</button>
				</div>
				<div className='row'>
					<button id="four" value='4' className='' onClick={this.props.handleClick}>4</button>
					<button id="five" value='5' className='' onClick={this.props.handleClick}>5</button>
					<button id="six" value='6' className='' onClick={this.props.handleClick}>6</button>
					<button id="subtract" value='-' className='operatorStyle' onClick={this.props.handleMinus}>-</button>
				</div>
				<div className='row'>
					<button id="one" value='1' className='col-xs-10' onClick={this.props.handleClick}>1</button>
					<button id="two" value='2' className='col-xs-10' onClick={this.props.handleClick}>2</button>
					<button id="three" value='3' className='col-xs-10' onClick={this.props.handleClick}>3</button>
					<button id="add" value='+' className='operatorStyle' onClick={this.props.handleOperator}>+</button>
				</div>
				<div className='row'>
					<button id="zero" value='0' className='col-xs-20 wideButton' onClick={this.props.handleClick}>0</button>
					<button id="decimal" value='.' className='col-xs-10' onClick={this.props.handleDecimal}>.</button>
					<button id="equals" value='=' className=' co-xs-10' style={{backgroundColor:"#365481"}} onClick={this.props.handleEqualTo}>=</button>
				</div>
			</div>
		);
	}
}

export default Calculator;
