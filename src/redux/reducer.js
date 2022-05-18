export const initState = {
  overwrite: false,
  operation: null,
  previousOperand: null,
  currentOperand: null,
};

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

export const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.payload,
          overwrite: false,
        };
      }
      if (state.previousOperand && /(\+|\-|\*|\÷)/.test(state.operation) === false) return {
        ...state,
        previousOperand: `${state.previousOperand || ""}${action.payload}`,
        operation: null,
        currentOperand: null
      }
      if (action.payload === "0" && state.currentOperand === "0") return state;
      if (action.payload === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${action.payload}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return state;

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: action.payload,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: action.payload,
        };
      }

      return {
        ...state,
        operation: action.payload,
        previousOperand: evaluate(state),
        currentOperand: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      )
        return state;
      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          currentOperand: state.currentOperand.slice(0, -1),
        };

      if (state.currentOperand == null) {
        if (state.previousOperand != null) {
          return {
            ...state,
            overwrite: false,
            operation: null,
            previousOperand:
              state.operation == null
                ? state.previousOperand.slice(0, -1)
                : state.previousOperand,
          };
        }

        return state;
      }

      if (state.currentOperand.length === 1)
        return {
          ...state,
          currentOperand: null,
        };

      return {
        ...state,
        overwrite: true,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    default:
      return state;
  }
};

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      break;
  }

  return computation.toString();
}
