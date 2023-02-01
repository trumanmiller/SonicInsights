const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json())
// const router



app.listen(PORT, () => {
  console.log(`LISTEN ON PORT ${PORT}`);
})