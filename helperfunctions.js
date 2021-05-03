function setStock (stock, sku, stockLevel) {
  return {
    ...stock,
    [sku]: +stockLevel
  }
}

function addStock (stock, sku, additionalStock) {
  return {
    ...stock,
    [sku]: stock[sku] + +additionalStock
  }
}

function orderStock (stock, sku, orderedNumber) {
  return {
    ...stock,
    [sku]: stock[sku] - +orderedNumber
  }
}

function calculateStock (stock, command, instructions) {
  switch(command) {
    case 'set-stock':
      for (let j = 0; j < instructions.length; j += 2) {
        stock = setStock(stock, instructions[j], instructions[j+1]);
      }
      return stock;
    case 'add-stock':
      for (let j = 0; j < instructions.length; j += 2) {
        stock = addStock(stock, instructions[j], instructions[j+1]);
      }
      return stock;
    case 'order':
      for (let j = 1; j < instructions.length; j += 2) {
        stock = orderStock(stock, instructions[j], instructions[j+1]);
      }
      return stock;
  }
}

module.exports = {calculateStock, setStock, addStock, orderStock};