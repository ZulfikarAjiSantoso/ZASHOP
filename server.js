const express = require("express");
const cors = require("cors");
const {v4: uuidv4} = require("uuid");
const stripe= require("stripe")("sk_test_51JxnZ7IUgXLU4As3ZC7ZLI8ewmvmte3A6S6wF9He7wFSI9PgAg62iRaC96LihJ8aBpkMSH4LRRZ3BBn3kwpg6ZJM00B3QvrliG");
const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send('Welcome to React Firebase Ecommerce Store');
})
app.post("/checkout",async (req,res)=>{
    let error;
    let status;
    try{
        const {cart,token}=req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const key = uuidv4();
        const charge = await stripe.charges.create({
            amount: cart.TotalPrice,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: 'products description here',
            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }    
        },{idempotencyKey:key})
        status="success"
    }
    catch(error){
        console.log(error);
        status="error"
    }
    res.json({status});    
})
app.listen(8080,()=>{
    console.log('your app is running at port 8080');
})