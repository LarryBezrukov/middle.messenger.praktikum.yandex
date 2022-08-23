/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});
