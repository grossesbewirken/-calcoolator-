import { ACTIONS } from "./App.js"

export default function OperationButton ({dispatch, operation}){
    return <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}>
        {operation}
        </button>
}