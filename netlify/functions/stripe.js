/* 
SUMMARY 
The main goal of this function is to handle incoming requests, 
create a Stripe checkout session based on the provided data, 
and return the generated session URL. It uses Stripe's library 
to facilitate the creation of checkout sessions for handling payments, 
*/


// Import the 'stripe' library and initialize it with your Stripe secret key
const stripe = require('stripe')('sk_test_51NhgwWFObZ85V6LzRLrMegQ5ggZkvf4n0C8umth3DGCbVGMQAyoLrE4fKAP7Gzz0BGp89nONq52I2a3Ox989E65400fW6qWHPb');

// Define the handler function for your Netlify serverless function
exports.handler = async (event) => {
    // Check if the HTTP method is not POST
    if (event.httpMethod !== 'POST') {
        // Return a 405 Method Not Allowed response
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        // Parse the request data from the event body
        const requestData = JSON.parse(event.body);

        // Create a Stripe checkout session using the parsed request data
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // Specify payment method type
            mode: 'payment', // Specify payment mode
            line_items: requestData.items.map(item => {
                return {
                    price_data: {
                        currency: 'usd', // Specify currency
                        product_data: {
                            name: item.name, // Use item name from the request data
                        },
                        unit_amount: Math.round(item.price * 100), // Convert and set unit amount
                    },
                    quantity: item.quantity, // Set quantity from the request data
                };
            }),
            success_url: 'https://crest-clothing.netlify.app', // URL to redirect on successful payment
            cancel_url: 'https://crest-clothing.netlify.app', // URL to redirect on canceled payment
        });

        // Log the generated session URL
        console.log(session.url);

        // Return a 200 OK response with the session URL
        return {
            statusCode: 200,
            body: JSON.stringify({ url: session.url }),
        };
    } catch (e) {
        // Return a 500 Internal Server Error response with the error message
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message }),
        };
    }
};
