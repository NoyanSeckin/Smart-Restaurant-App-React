const INITIAL_STATE = {
  testData: "Hello world!",
  tableItems : [],
  currentTable: 1,
  tables: [],
  orderedItems: [],
  currentOrder: 1,
  authentication: '',
};

// bu switch degistirmek icin
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_TEST_DATA":
      return { ...state, testData: action.payload };
    case "GET_TABLE_ITEMS":
      return {...state, tableItems: action.payload};
    case "GET_CURRENT_TABLE":
      return {...state, currentTable: action.payload};
    case "GET_TABLES":
      return {...state, tables: action.payload};
   case "GET_ORDERED_ITEMS":
      return {...state, orderedItems: action.payload};
   case "GET_CURRENT_ORDER":
      return {...state, currentOrder: action.payload};
    case "GET_AUTHENTICATION":
      return {...state, authentication: action.payload};
    default:
      return state;
  }
};
