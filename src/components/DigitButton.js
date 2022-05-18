import { addDigit } from '../redux/actions';
export default function DigitButton({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch(addDigit(digit))}
    >
      {digit}
    </button>
  );
}
