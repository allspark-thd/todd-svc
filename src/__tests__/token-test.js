/* eslint-env mocha */

import { expect } from 'chai';
import requestpromise from 'request-promise';
import toddsvc from '../';

const rp = requestpromise.defaults( { json: true } );

const SECRET_URL =
	`${ process.env.VAULT_URL }/v1/secret/some-secret-namespace/db`;

describe( ':space-id/:service-id', () => {
			var server, url;
			beforeEach( () => {
		// initialize server
				server = toddsvc();
				url = 'http://localhost:' + server.address().port;
	} );
			afterEach( () => {
				server.close();
	} );

			context( 'existing credentials', () => {
				const valid = '/pcf-space-id/pcf-service-instance-id';

				describe( 'POST', () => {
											describe( 'body', () => {
								describe( '`app_instance`', () => {
									it( 'is required', () =>
						rp( {
											method: 'POST',
											url: `${ url }${ valid }`,
						} )
						.then( expect.fail, response =>
							expect( response.statusCode ).to.equal( 400 ) )
					);
									it( 'must be a string', () =>
						rp( {
											method: 'POST',
											url: `${ url }${ valid }`,
											body: {
												app_instance: {},
							},
						} )
						.then( expect.fail, response =>
							expect( response.statusCode ).to.equal( 400 ) )
					);



									context( 'valid request', () => {
										var validRequest, result;
										beforeEach( () => {
											validRequest = {
												method: 'POST',
												url: `${ url }${ valid }`,
												body: {
													'app_instance': 'aa-bb-cc-dd',
								},
												resolveWithFullResponse: true,
												json: true,
							};
											return rp( validRequest )
								.then( response => {
													result = response;
								} );
						} );
										it( 'returns a 200', () => expect( result.statusCode ).to.equal( 200 ) );
										it( 'returns json', () =>
							expect( result.headers[ 'content-type' ] )
								.to
								.contain( 'application/json' ) );

										describe( '`token`', () => {
											it( 'is a string', () =>
								expect( result.body.token )
									.to.be.a( 'string' ) );
											it( 'can be used against vault', () =>
								rp( {
													url: SECRET_URL,
													headers: {
														'X-Vault-Token': result.body.token,
									},
								} )
							);
						} );
					} );



				} );
			} );

			// it( 'has 200 status', () => rp( {
			//		 url: validUrl,
			//		 resolveWithFullResponse: true,
			//	 } )
			//	 .then( response => expect( response.statusCode ).to.equal( 200 ) )
			// );
		} );
	} );
} );
