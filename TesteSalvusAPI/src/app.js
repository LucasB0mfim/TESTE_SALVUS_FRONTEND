const express = require('express');
const cors = require('cors');

const app = express();
const productsRoute = require('./routes/products');

app.use(cors());
app.use(express.json());
app.use('/api', productsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});