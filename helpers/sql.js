const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
/** Function for updating specified columns for users and companies
 * 
 * Converts js Object to be included in SQL query to database to update data
 * 
 * Throws BadRequestError if no data to update is entered
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // extracts  to update from js Object 
  const keys = Object.keys(dataToUpdate);
  // Throws error if no data is submitted
  if (keys.length === 0) throw new BadRequestError("No data");

  // Creates a map of js object converted to SQL
  
  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
