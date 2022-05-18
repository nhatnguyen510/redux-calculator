
import { chooseOperation } from '../redux/actions'
export default function OperationButton({ dispatch, operation }) {
  return (
    <button
      onClick={() => dispatch(chooseOperation(operation))}
    >
      {operation}
    </button>
  );
}
