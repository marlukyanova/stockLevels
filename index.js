const fs = require('fs');
const {calculateStock} = require('./helperfunctions');

//read file path from command line input
const inputFile = process.argv[2];

const config = {
  env: 'prod'
};

function printStock (stock) {
  const skuAll = Object.keys(stock).sort();
  skuAll.forEach(sku => console.log(sku, stock[sku]));
}

function saveStock (stock) {
  const skuAll = Object.keys(stock).sort();
  const outputFile = 'res-'+new Date().toISOString().slice(0, 10)+'.txt';
  skuAll.forEach(sku => {
    fs.appendFile(outputFile, sku + ' ' + stock[sku] + '\n', function (err) {
      if (err) throw err;
      console.log('Saved!');
    })
  });
}

fs.readFile(inputFile, (err, data) => {
  if (err) throw err;
  const inputData = data.toString().split('\n');
  const stock = inputData.reduce((accumulator, line) => {
    const curLine = line.split(' ');
    accumulator = calculateStock(accumulator, curLine[0], curLine.slice(1));
    return accumulator;
  }, {});
  if (config.env === 'debug') {
    printStock(stock);
  } else {
    saveStock(stock);
}
})