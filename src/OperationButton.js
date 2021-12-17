import {action} from './App.js'

export default function OperationButton({dispatch,operation})
{
    return <button onClick={()=>{ dispatch({type:action.CHOOSE_OPERATION,payload:{operation}})}}>{operation}</button>
}