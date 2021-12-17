import {action} from './App.js'

export default function DigitButton({dispatch,digit})
{
    return <button onClick={()=>{ dispatch({type:action.ADD_DIGIT,payload:{digit}})}}>{digit}</button>
}