const INITIAL_STATE = {
  testData: "Hello world!",
  tableItems : [],
  occupiedTables: [],
};

// bu switch degistirmek icin
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_TEST_DATA":
      return { ...state, testData: action.payload };
    case "GET_TABLE_ITEMS":
      return {...state, tableItems: action.payload}
    case "GET_OCCUPIED_TABLES":
      return {...state, occupiedTables: action.payload}
    default:
      return state;
  }
};
