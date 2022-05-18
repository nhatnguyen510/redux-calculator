export const addDigit = (data) => {
  return {
    type: "add-digit",
    payload: data,
  };
};

export const chooseOperation = (data) => {
  return {
    type: "choose-operation",
    payload: data,
  };
};

export const deleteDigit = () => {
  return {
    type: "delete-digit",
  };
};

export const clear = () => {
  return {
    type: "clear",
  };
};

export const evaluate = () => {
  return {
    type: "evaluate",
  };
};
