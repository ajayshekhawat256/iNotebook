const connectToMongo=require('./db');
connectToMongo();
const express = require('express');
const router = require('./routes/auth');
const app = express();
const port = 5000
app.use(express.json());
var cors = require('cors');
app.use(cors())

// app.get('/', (req, res) => {
//   res.send('Hello !')
// })
// app.get('/me',(req,res)=>{
//     res.send("That's it");
// })
//Available routes

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})