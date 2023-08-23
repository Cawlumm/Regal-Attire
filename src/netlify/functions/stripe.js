// Load environment variables
require('dotenv').config()

// Import the 'express' library
const express = require('express')
const cors = require('cors')
// Create an instance of Express app
const app = express()
// Enable CORS for all routes
app.use(cors());
// Enable JSON parsing for request bodies
app.use(express.json())

// Import and configure the Stripe library with your private key
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

// Define your store items
const storeItems = []

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: Math.round(item.price * 100)
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}`,
            cancel_url: `${process.env.SERVER_URL}`
        })
        res.json({ url: session.url})
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})
// Start the Express app to listen on port 3000
app.listen(() => {
  console.log('Server is listening')
})
