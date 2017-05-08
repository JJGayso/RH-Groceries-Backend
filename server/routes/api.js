const express = require('express');
const router = express.Router();
var stripe = require('stripe')("sk_test_MtREatSFEPgIlVztY7Bn5sJ2");

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(__dirname + "/rh-groceries-firebase-adminsdk-2wcrw-02de137d16.json"),
  databaseURL: "https://rh-groceries.firebaseio.com"
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/create/:id/:email', (req, res) => {
  // console.log("Email: " + req.params.email);

  stripe.accounts.create({
    country: "US",
    managed: false,
    email: req.params.email + ""
  }, function(err, account) {
    // console.log(err);
    // console.log(account);
    admin.database().ref(`/users/${req.params.id}/stripeAccount`).set(account);
  });

  // keys:
  //  { secret: 'sk_live_jiD6v7ArQbYFiA8X38RBNrnx',
  //    publishable: 'pk_live_J4G8wN75fRjoIfbAGbGVKIBO' }


  res.sendStatus(200);

});

router.get('/pay/:payerId/:destinationId/:amount', (req, res) => {
  // console.log(req.params.payerKey);
  // console.log(req.params.destinationId);
  // console.log(req.params.amount);


  stripe.tokens.create({
    card: {
      "number": '4242424242424242',
      "exp_month": 12,
      "exp_year": 2018,
      "cvc": '123'
    }
  }, function(err, token) {
    // console.log(err);
    stripe.charges.create({
      amount: parseInt(req.params.amount) * 100,
      currency: "usd",
      source: token.id,
      destination: {
        account: req.params.destinationId,
      },
    }).then(function(charge) {
      console.log("Completed Transaction");
      console.log(charge);
    });
  });

  // stripe.tokens.create({
  //   customer: req.params.payerId,
  // }, {
  //   stripe_account: "acct_1AGyScD67QtxS1M3",
  // }).then(function(token) {
  // // asynchronously called
  // stripe.charges.create({
  //     amount: Number(req.params.amount) * 100,
  //     currency: "usd",
  //     source: token.id,
  //   }, {
  //     stripe_account: req.params.payerId,
  //   }).then(function(charge) {
  //   // asynchronously called
  //   });
  // });

  // stripe.charges.create({
  //   amount: Number(req.params.amount) * 100,
  //   currency: "usd",
  //   source: ,
  //   destination: {
  //     account: "acct_1AGyScD67QtxS1M3",
  //   },
  // }).then(function(charge) {
  //   console.log("Completed Transaction");
  //   console.log(charge);
  // });

  res.sendStatus(200);

});



module.exports = router;


// { id: 'acct_1AGyScD67QtxS1M3',
//   object: 'account',
//   business_logo: null,
//   business_name: null,
//   business_url: null,
//   charges_enabled: true,
//   country: 'US',
//   default_currency: 'usd',
//   details_submitted: false,
//   display_name: null,
//   email: 'gaysojj@gmail.com',
//   keys:
//    { secret: 'sk_live_jiD6v7ArQbYFiA8X38RBNrnx',
//      publishable: 'pk_live_J4G8wN75fRjoIfbAGbGVKIBO' },
//   managed: false,
//   metadata: {},
//   payouts_enabled: false,
//   statement_descriptor: null,
//   support_email: null,
//   support_phone: null,
//   timezone: 'Etc/UTC' }
