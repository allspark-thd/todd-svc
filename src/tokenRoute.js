import requestpromise from 'request-promise';
import { Router } from 'express';

const rp = requestpromise.defaults( {
	json: true,
	url: `${ process.env.VAULT_URL }/v1/auth/app-id/login`,
	method: 'POST',
} );

const router = new Router();

router.param( 'space', ( req, res, next, space ) => {
	req.spaceid = space;
	next();
} );
router.param( 'service', ( req, res, next, service ) => {
	req.serviceid = service;
	next();
} );
router.post( '/:space/:service',
	( req, res, next ) => {
		if ( typeof req.body.app_instance !== 'string' ) {
			const err = new Error( 'Expected `app_instance` string in body.' );
			err.statusCode = 400;
			res.status( 400 ).send( err );
			return;
		}
		next();
	},
	( req, res, next ) =>
		rp( {
			body: {
				app_id: req.spaceid,
				user_id: req.serviceid,
			},
		} )
		.then( responseBody =>
			res.json( { token: responseBody.auth.client_token } ),
			vaultResp => vaultResp.pipe( res ) )
);

export default router;
