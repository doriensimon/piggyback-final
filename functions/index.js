const functions = require("firebase-functions");


exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
    // const YOUR_DOMAIN = 'https://piggyback-aa8c3.web.app';
    // console.log("this is the data", data)
    // // console.log("this is the context", context)
    // const stripe = require('stripe')('sk_test_51LE1u6FpIZcDi74lCXvbgO3Cqc1sufBCAqErqFhyJ5phgoh5tDgYyouUQRGvfcTZTv3lVh1X2fhCZAKqt4VClKJk00tOROdknA');
    // const session = await stripe.checkout.sessions.create({
    //     line_items: [
    //       {
    //         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //         price: 'price_1LEhPGFpIZcDi74l6go7qrNy',
    //         quantity: 1,
    //       },
    //     ],
    //     mode: 'payment',
    //     success_url: `${YOUR_DOMAIN}?success=true`,
    //     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    //   });
    
    //   return {
    //       id: session.id
    //   }
    return 'hello world'
});

// this works, but not sure how I could change parameters on front end to pass to back end
// Also need to sort how to grab parameters from url so I know if it was successful or not
exports.createStripeCheckoutV3 = functions.https.onRequest(async (req, res) => {
    const YOUR_DOMAIN = 'http://localhost:3000';
    const stripe = require('stripe')('sk_test_51LE1u6FpIZcDi74lCXvbgO3Cqc1sufBCAqErqFhyJ5phgoh5tDgYyouUQRGvfcTZTv3lVh1X2fhCZAKqt4VClKJk00tOROdknA');
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1LEhPqFpIZcDi74lNmzD40Yj',
            quantity: req.query.quantity,
          },
          {
            price_data: {
              currency: 'usd',
              unit_amount: Math.round(req.query.prod_fee * 100),
              product_data: {
                name: 'Fee',
                description: 'Transaction Fee',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true$session_id={CHECKOUT_SESSION_ID}&quantity=${req.query.quantity}&user_id=${req.query.user_id}`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true$session_id={CHECKOUT_SESSION_ID}&quantity=${req.query.quantity}&user_id=${req.query.user_id}`,
      });
      
    //   res.send(session)
      res.redirect(303, session.url);
});


exports.createStripeCheckoutV5 = functions.https.onRequest(async (req, res) => {
    const YOUR_DOMAIN = 'http://localhost:3000';
    console.log("I'm in the request you should log!!")
    console.log("this is the data", req)
    console.log("this is the context", res)
    console.log("this is the fee: ", req.prod_fee)
    const stripe = require('stripe')('sk_test_51LE1u6FpIZcDi74lCXvbgO3Cqc1sufBCAqErqFhyJ5phgoh5tDgYyouUQRGvfcTZTv3lVh1X2fhCZAKqt4VClKJk00tOROdknA');
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1LEhPGFpIZcDi74l6go7qrNy',
            quantity: 1,
          },
          {
            price_data: {
              currency: 'usd',
              unit_amount: 478,
              product_data: {
                name: 'Fee',
                description: 'Transaction Fee',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true$session_id={CHECKOUT_SESSION_ID}&quantity=1&user_id=${req.query.user_id}`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true$session_id={CHECKOUT_SESSION_ID}&quantity=1&user_id=${req.query.user_id}`,
      });
    
      res.redirect(303, session.url);
});





// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
