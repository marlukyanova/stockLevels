require('chai').should();

const {setStock, addStock, orderStock, calculateStock} = require('./helperfunctions.js');

describe('setStock', function () {
  let stock = {};

  it('should add new stock levels to store', function () {
    stock = setStock(stock, 'AB-1', '100');
    stock.should.eql({'AB-1': 100});
  })
})

describe('addStock', function () {
  let stock = {'AB-1': 100};

  it('should add stock level to existing stock', function () {
    stock = addStock(stock, 'AB-1', '100');
    stock.should.eql({'AB-1': 200});
  })
})

describe('orderStock', function () {
  let stock = {'AB-1': 200};

  it('should subtruct stock level from existing stock', function () {
    stock = orderStock(stock, 'AB-1', '100');
    stock.should.eql({'AB-1': 100});
  })
})

describe('Calculate stock', function () {
  
  let stock = {};
  const setInstructions = ['AB-1', '100', 'CD-2', '200'];
  const addInstructions = ['AB-1', '50'];
  const orderInstructions = ['ORDER1', 'CD-2', '50'];

  describe('calculateStock function', function () {
    it('should add new stocks and level', function () {
      stock = calculateStock(stock, 'set-stock', setInstructions);
      console.log(stock);
      stock.should.eql({'AB-1': 100, 'CD-2': 200});
    })
    it('should update stock levels', function () {
      stock = calculateStock(stock, 'add-stock', addInstructions);
      console.log(stock);
      stock.should.eql({'AB-1': 150, 'CD-2': 200});
    })
    it('should subtruct levels for existing stock', function () {
      stock = calculateStock(stock, 'order', orderInstructions);
      console.log(stock);
      stock.should.eql({'AB-1': 150, 'CD-2': 150});
    })
  })

})