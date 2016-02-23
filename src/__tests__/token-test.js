/* eslint-env mocha */

import { expect } from 'chai';
import rp from 'request-promise';
import toddsvc from '../';

describe( "/auth/token", () => {
		var server, url;
		beforeEach( () => {
			// initialize server
			server = toddsvc();
			url = 'http://localhost:' + server.address().port + '/auth/token';
		} );
		afterEach( () => {
			server.close();
		} );


		describe( 'POST', () => {
			it( "should return json", done => {
				rp( url )
				.then( resp => expect( resp ).to.equal( 'Ok' ) )
				.then( () => done(), done )
				;
				} );
			it( "should return token from Vault when provided a recognized set of credentials", () => {
				expect(false).to.equal(true);
				} );
			} );
} );
