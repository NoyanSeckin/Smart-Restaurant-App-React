export const setTestData = (testData) => {
  return { type: "GET_TEST_DATA", payload: testData };
};

export const setTableItems = (tableItems) => {
  return {type: "GET_TABLE_ITEMS", payload: tableItems}
}