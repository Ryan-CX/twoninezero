'use strict';

const PORT = 3000;

// The variable stocks has the same value as the variable stocks in the file 'stocks.js'
const stocks = require('./stocks.js').stocks;

const express = require('express');
const app = express();

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.static('public'));
// Note: Don't add or change anything above this line.

// Add your code here
app.post('/stockorder', (req, res) => {
	//sent html paragraph with the stock order
	const name = req.body.stocks;
	//find the stock with the name in the stocks array
	const stock = stocks.find((stock) => stock.company === name);
	const count = req.body.count;
	res.send(
		`Hi you have placed an order for ${count} stocks of ${
			stock.company
		}. The price is ${stock.price} and the total is ${count * stock.price}`
	);
});

app.get('/stocksearch', (req, res) => {
	//write a function called findStockByPrice , check stocksearch.html and find the value of the radio button input, if it's 'highest' then return the stock with the highest price, if it's 'lowest' then return the stock with the lowest price.
	const option = req.query.option;
	function findStockByPrice() {
		if (option === 'highest') {
			const result = stocks.reduce((prev, current) =>
				prev.price > current.price ? prev : current
			);
			res.send(result);
		} else {
			const result = stocks.reduce((prev, current) =>
				prev.price < current.price ? prev : current
			);
			res.send(result);
		}
	}

	findStockByPrice();
});

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
