const stripe = require('stripe')('sk_test_51NhgwWFObZ85V6LzRLrMegQ5ggZkvf4n0C8umth3DGCbVGMQAyoLrE4fKAP7Gzz0BGp89nONq52I2a3Ox989E65400fW6qWHPb');


exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        const requestData = JSON.parse(event.body);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: requestData.items.map(item => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: Math.round(item.price * 100),
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: 'https://crest-clothing.netlify.app',
            cancel_url: 'https://crest-clothing.netlify.app',
        });
        console.log(session.url)
        return {
            statusCode: 200,
            body: JSON.stringify({ url: session.url }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message }),
        };
    }
};
