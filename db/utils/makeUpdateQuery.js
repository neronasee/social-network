module.exports = (data, tableName) => {
  const columnNames = Object.keys(data).reduce((acc, key) => {
    return acc.concat(`${key} = $\{${key}\}`);
  }, []);

  const constructedString = `UPDATE ${tableName} SET ${columnNames.join(', ')} WHERE id = $\{id\}`;

  return constructedString;
};
