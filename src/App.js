import { useReducer } from "react"
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import  './style.css';
export const action={
    ADD_DIGIT: 'add-digit',
    CLEAR:'clear',
    DELETE_DIGIT:'delete-digit',
    CHOOSE_OPERATION:'choose-operation',
    EVALUATE:'evaluate'

}
function reducer(state,{type,payload})
{
    
switch(type)
{
    case action.ADD_DIGIT:
        if(state.overwrite)
        {
            return{
                ...state,
                currentOperand:payload.digit,
                overwrite:false
            }
        }
        if(payload.digit==="0"&&state.currentOperand==="0")return state;
        if(payload.digit==="."&&state.currentOperand.includes("."))return state;
       return {
            ...state,
            currentOperand:`${state.currentOperand || ""}${payload.digit}`
            
        }
    case action.DELETE_DIGIT:
        if (state.overwrite) {
            return {
              ...state,
              overwrite: false,
              currentOperand: null,
            }
          }
          if (state.currentOperand == null) return state
          if (state.currentOperand.length === 1) {
            return { ...state, currentOperand: null }
          }
    
          return {
            ...state,
            currentOperand: state.currentOperand.slice(0, -1),
          }

    case action.EVALUATE:
        if(state.operation==null||state.currentOperand==null||state.previousoperand==null)return state
        return{
            ...state,
            operation:null,
            overwrite:true,
            previousoperand:null,
            currentOperand:evaluate(state)
        }    
    case action.CHOOSE_OPERATION:
        if(state.currentOperand==null&&state.previousoperand==null)return state;
        if(state.currentOperand==null)
        {
            return{
                ...state,
                operation:payload.operation
            }
            

        }
        if(state.previousoperand==null)
        {
            return{
                ...state,
                operation:payload.operation,
                previousoperand:state.currentOperand,
                currentOperand:null
            }
        }
     return{
        ...state,
        operation:payload.operation,
        previousoperand:evaluate(state),
        currentOperand:null
     }   
    case action.CLEAR:
        return{}    
          
}
}
function evaluate({ currentOperand, previousoperand, operation }) {
    const prev = parseFloat(previousoperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch (operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "*":
        computation = prev * current
        break
      case "÷":
        computation = prev / current
        break
    }
  
    return computation.toString()
  }
  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  })
  function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }
function Aapp() { 
    const[{previousoperand,currentOperand,operation},dispatch]=useReducer(reducer,
        {})

        return <div className='calculator-grid'>
            <div className='output'>
                   <div className='previous-operand'>{formatOperand(previousoperand)}{operation}</div>
                   <div className='current-operand'>{formatOperand(currentOperand)}</div>
            </div> 
            <button className='span-two' onClick={()=>{dispatch({type:action.CLEAR})}}>AC</button>
            <button onClick={()=>{dispatch({type:action.DELETE_DIGIT})}}>DEL</button>
            <OperationButton  operation="÷" dispatch={dispatch}/>
            <DigitButton digit="1" dispatch={dispatch}/>
            <DigitButton digit="2" dispatch={dispatch}/>
            <DigitButton digit="3" dispatch={dispatch}/>
            <OperationButton  operation="*" dispatch={dispatch}/>
            <DigitButton digit="4" dispatch={dispatch}/>
            <DigitButton digit="5" dispatch={dispatch}/>
            <DigitButton digit="6" dispatch={dispatch}/>     
            <OperationButton  operation="+" dispatch={dispatch}/>
            <DigitButton digit="7" dispatch={dispatch}/>
            <DigitButton digit="8" dispatch={dispatch}/>
            <DigitButton digit="9" dispatch={dispatch}/>  
            <OperationButton  operation="-" dispatch={dispatch}/> 
            <DigitButton digit="." dispatch={dispatch}/>
            <DigitButton digit="0" dispatch={dispatch}/>  
            <button className='span-two' onClick={()=>{dispatch({type:action.EVALUATE})}}>=</button>     
        </div>;
    }

 
export default Aapp;