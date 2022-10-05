import { ACTIONS } from "./App.js"

export default function Numbers ({dispatch, digit}){
    return <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit }})}
    >{digit}</button>
}