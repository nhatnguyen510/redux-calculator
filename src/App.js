import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
import { ACTIONS } from './redux/reducer';

// export const ACTIONS = {
//   ADD_DIGIT: "add-digit",
//   CHOOSE_OPERATION: "choose-operation",
//   CLEAR: "clear",
//   DELETE_DIGIT: "delete-digit",
//   EVALUATE: "evaluate",
// };

// function reducer(state, { type, payload }) {
//   switch (type) {
//     case ACTIONS.ADD_DIGIT:
//       if (state.overwrite) {
//         return {
//           ...state,
//           currentOperand: payload.digit,
//           overwrite: false,
//         };
//       }
//       if (payload.digit === "0" && state.currentOperand === "0") return state;
//       if (payload.digit === "." && state.currentOperand.includes("."))
//         return state;
//       return {
//         ...state,
//         currentOperand: `${state.currentOperand || ""}${payload.digit}`,
//       };

//     case ACTIONS.CHOOSE_OPERATION:
//       if (state.currentOperand == null && state.previousOperand == null)
//         return state;

//       if (state.previousOperand == null) {
//         return {
//           ...state,
//           operation: payload.operation,
//           previousOperand: state.currentOperand,
//           currentOperand: null,
//         };
//       }

//       if (state.currentOperand == null) {
//         return {
//           ...state,
//           operation: payload.operation,
//         };
//       }

//       return {
//         ...state,
//         operation: payload.operation,
//         previousOperand: evaluate(state),
//         currentOperand: null,
//       };

//     case ACTIONS.EVALUATE:
//       if (
//         state.operation == null ||
//         state.currentOperand == null ||
//         state.previousOperand == null
//       )
//         return state;
//       return {
//         ...state,
//         overwrite: true,
//         currentOperand: evaluate(state),
//         previousOperand: null,
//         operation: null,
//       };

//     case ACTIONS.CLEAR:
//       return {};

//     case ACTIONS.DELETE_DIGIT:
//       if (state.overwrite)
//         return {
//           ...state,
//           overwrite: false,
//           currentOperand: state.currentOperand.slice(0, -1),
//         };

//       if (state.currentOperand == null) {
//         if (state.previousOperand != null) {
//           return {
//             ...state,
//             overwrite: false,
//             operation: null,
//             previousOperand:
//               state.operation == null
//                 ? state.previousOperand.slice(0, -1)
//                 : state.previousOperand,
//           };
//         }

//         return state;
//       }

//       if (state.currentOperand.length === 1)
//         return {
//           ...state,
//           currentOperand: null,
//         };

//       return {
//         ...state,
//         overwrite: true,
//         currentOperand: state.currentOperand.slice(0, -1),
//       };

//     default:
//       return state;
//   }
// }

// function evaluate({ currentOperand, previousOperand, operation }) {
//   const prev = parseFloat(previousOperand);
//   const current = parseFloat(currentOperand);
//   if (isNaN(prev) || isNaN(current)) return "";
//   let computation;
//   switch (operation) {
//     case "+":
//       computation = prev + current;
//       break;
//     case "-":
//       computation = prev - current;
//       break;
//     case "*":
//       computation = prev * current;
//       break;
//     case "÷":
//       computation = prev / current;
//       break;
//     default:
//       break;
//   }

//   return computation.toString();
// }

function App() {
  // const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
  //   reducer,
  //   {}
  // );
  const previousOperand = useSelector((state) => state.previousOperand);
  const operation = useSelector((state) => state.operation);
  const currentOperand = useSelector((state) => state.currentOperand);

  const dispatch = useDispatch();

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}{" "}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>

      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.DELETE_DIGIT });
        }}
      >
        DEL
      </button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
