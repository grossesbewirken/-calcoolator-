import { ACTIONS } from "./App.js"

export default function Operations ({dispatch, operation}){
    return <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}>
        {operation}
        </button>
}