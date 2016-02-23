import requestpromise from 'request-promise';
import { Router } from 'express';

const rp = requestpromise.defaults( {
  json: true,
  url: `${ process.env.VAULT_URL }/v1/auth/app-id/login`,
  method: `POST`
} );

const router = new Router();

router.param( 'space', ( req, res, next, space ) => {
  req.spaceid = space;
  next();
})
router.param( 'service', ( req, res, next, service ) => {
  req.serviceid = service;
  next();
})
router.post( '/:space/:service', (req, res, next) => {
  if ( typeof req.body.app_instance !== 'string' ) {
    res.status( 400 ).send( 'Expected `app_instance` string in body.' );
    return;
  }
  rp( {
    body: {
      "app_id": req.spaceid,
      "user_id": req.serviceid
    }
  } )
  .then(responseBody => {
    res.json({
      token: responseBody.auth.client_token
    });
  }, vaultResp => vaultResp.pipe( res ) )
});


/*
router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
});

router.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

router.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
*/
export default router;
