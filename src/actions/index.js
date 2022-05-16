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

export const setOrderedItems = (orderedItems) => {
  return {type: "GET_ORDERED_ITEMS", payload: orderedItems}
}

export const setCurrentOrder = (currentOrder) => {
  return {type: "GET_CURRENT_ORDER", payload: currentOrder}
}

export const setAuthentication = (authentication) => {
  return {type: "GET_AUTHENTICATION", payload: authentication}
}