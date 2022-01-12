const express = require ('express');

const app = express();

// app.use((req,res,next)=>{
// console.log('Step 1');
// next()

// });

// app.use((req,res,next)=>{
//     console.log('Step 2');
//     res.send('<h1>I made it to the End</h1>');
    
// });

app.use('/users',(req,res,next)=>{
    res.send('<h1>users</h1>');
    
});

app.use('/',(req,res,next)=>{
    res.send('<h1>Home Page</h1>');
    
});

app.listen(3000);