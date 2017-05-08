const express = require('express');
const router = express.Router();
var stripe = require('stripe')("sk_live_HcVULo30ZwZDZxZbzcENaOYi");

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/create/:email', (req, res) => {
  console.log("Email: " + req.params.email);

  stripe.accounts.create({
    country: "US",
    managed: false,
    email: req.params.email + ""
  }, function(err, account) {
    console.log(err);
    console.log(account);
  });

  // keys:
  //  { secret: 'sk_live_jiD6v7ArQbYFiA8X38RBNrnx',
  //    publishable: 'pk_live_J4G8wN75fRjoIfbAGbGVKIBO' }


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
