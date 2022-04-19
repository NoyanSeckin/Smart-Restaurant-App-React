export const setTestData = (testData) => {
  return { type: "GET_TEST_DATA", payload: testData };
};

export const setTableItems = (tableItems) => {
  return {type: "GET_TABLE_ITEMS", payload: tableItems}
}

export const setCurrentTable = (currentTable) => {
  return {type: "GET_CURRENT_TABLE", payload: currentTable}
}

export const setTables = (tables) => {
  return {type: "GET_TABLES", payload: tables}
}