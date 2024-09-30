const express = require('express')
const mongoose = require("mongoose")
const app = express()
const port = 3000
mongoose.connect("mongodb+srv://sauzxa:node-1233@learning-mongodb.ei6rl.mongodb.net/"
).then(()=>{
    app.listen(port,()=>{
        console.log(`http://localhost:${port}`);
        
    })
})
.catch((err)=>{
    console.log(err);
    
})



app.get('/', (req, res) => {
  res.send('Hello')
})

