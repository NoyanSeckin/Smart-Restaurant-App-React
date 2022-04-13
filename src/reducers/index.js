const INITIAL_STATE = {
  testData: "Hello world!",
  tableItems : [],
};

// bu switch degistirmek icin
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_TEST_DATA":
      return { ...state, testData: action.payload };
    case "GET_TABLE_ITEMS":
      return {...state, tableItems: action.payload}
    default:
      return state;
  }
};
