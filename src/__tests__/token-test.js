/* eslint-env mocha */

import { expect } from 'chai';
import requestpromise from 'request-promise';
import toddsvc from '../';

const post = requestpromise.defaults( {
	method: 'POST',
	json: true,
	baseUrl: 'http://localhost:3000',
} );

const good = post.defaults( {
	url: '/pcf-space-id/pcf-service-instance-id',
	body: {
		app_instance: 'aa-bb-cc-dd',
	},
} );

const SECRET_URL =
	`${ process.env.VAULT_URL }/v1/secret/some-secret-namespace/db`;

describe( ':space-id/:service-id', () => {
	var server;
	beforeEach( () => {
		// initialize server
		server = toddsvc();
	} );
	afterEach( () => {
		server.close();
	} );

	describe( 'POST', () => {

		describe( 'body', () => {
			describe( '`app_instance`', () => {
				it( 'is required', () =>
					good( { body: { app_instance: null } } )
					.then(
						expect.fail,
						res => expect( res.statusCode ).to.equal( 400 ) )
				);

				it( 'must be a string', () =>
					good( { body: { app_instance: {} } } )
					.then(
						expect.fail,
						response => expect( response.statusCode ).to.equal( 400 ) )
				);
			} );
		} );


		context( 'with invalid credentials', () => {
			it( 'errors', () =>
				good( { url: 'space/svc' } )
					.then( expect.fail, () => {} )
			);
		} );


		context( 'with valid credentials', () => {
			describe( 'response', () => {
				it( 'has status code 200', () =>
					good( { resolveWithFullResponse: true } )
					.then( result =>
						expect( result.statusCode ).to.equal( 200 ) )
				);

				it( 'is json', () =>
					good( { resolveWithFullResponse: true } )
					.then( result =>
						expect( result.headers[ 'content-type' ] )
							.to.contain( 'application/json' ) )
				);

				describe( '`token`', () => {
					it( 'is a string', () =>
						good( { resolveWithFullResponse: true } )
						.then( result =>
							expect( result.body.token )
								.to.be.a( 'string' ) )
					);

					it( 'can be used against vault', () =>
						good()
						.then( ( { token } ) =>
							requestpromise( {
								uri: SECRET_URL,
								headers: {
									'X-Vault-Token': token,
								},
							} ) )
					);
				} );
			} );
		} );
	} );
} );
