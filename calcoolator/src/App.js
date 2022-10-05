import {  useReducer } from "react"
import Numbers from "./Numbers"
import Operations from "./Operations"
import "./styles.css"


export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}


const reducer = (state, {type, payload}) => {
  switch(type){

      // Zahlen hinzufügen
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{                                                           //neu reinschreiben nach ergebnis
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === "0" && state.currentOperand === "0") {         //nur eine Null eingeben
        return state
      }        
      if(payload.digit === "," && state.currentOperand.includes(",")) {   // nur ein Komma eingeben
        return state
      }  
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }

      // O P E R A T I O N S    U N D    E D G E C A S E S
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null){    //nichts eingegeben
        return state
      }
      if(state.currentOperand == null){
        return {
          ...state,
          operation: payload.operation,       // operation ändern wollen
        }
      }
      if(state.previousOperand == null){
        return{
          ...state, 
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return{
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }

      // C L E A R - B U T T O N
    case ACTIONS.CLEAR:
      return {}

      // D E L E T E - B U T T O N
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite){
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }

      if (state.currentOperand === null){          // man kann nichts löschen, was nicht da ist
        return state
      }

      if (state.currentOperand.length === 1){           // man kann nichts löschen, was nur 1 lang ist
        return {...state, currentOperand: null}         // stattdessen komplett löschen
      }

      return{
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)   // letztes Digit wird weggeschnitten
      }

      
    case ACTIONS.EVALUATE:                          // wenn irgend eine Eingabe fehlt
      if (state.operation == null || 
          state.currentOperand == null || 
          state.previousOperand == null
        ) {
        return state
        }
      return{
        ...state,
        overwrite: true,                            // neu reinschreiben bei ergebnisausgabe
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
    default: 
  }
}

// P L U S - M I N U S - M A L - D U R C H
const evaluate = ({currentOperand, previousOperand, operation}) => {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation =""
  switch (operation){
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
    default:
  }
  return computation.toString()
}


function App() {
  const[{currentOperand, previousOperand, operation} , dispatch] = useReducer(
    reducer, 
    {}
  )

  return (
    <div className="calculator-grid">

      {/* O U T P U T - F I E L D S */}
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>

      {/* T O U C H P A D */}
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      
      <Operations operation="÷" dispatch={dispatch} className="span-two"/>

      <Numbers digit="7" dispatch={dispatch}/>
      <Numbers digit="8" dispatch={dispatch}/>
      <Numbers digit="9" dispatch={dispatch}/>
      <Operations operation="*" dispatch={dispatch}/>

      <Numbers digit="4" dispatch={dispatch}/>
      <Numbers digit="5" dispatch={dispatch}/>
      <Numbers digit="6" dispatch={dispatch}/>
      <Operations operation="+" dispatch={dispatch}/>

      <Numbers digit="1" dispatch={dispatch}/>
      <Numbers digit="2" dispatch={dispatch}/>
      <Numbers digit="3" dispatch={dispatch}/>
      <Operations operation="-" dispatch={dispatch}/>

      <Numbers digit="," dispatch={dispatch}/>
      <Numbers digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button>
      
    </div>
  );
}

export default App;