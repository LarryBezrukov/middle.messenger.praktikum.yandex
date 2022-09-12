/* eslint-disable no-console */
const express = require('express');
const history = require('express-history-api-fallback');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));
app.use(history('index.html', { root: './dist' }));

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`);
});
