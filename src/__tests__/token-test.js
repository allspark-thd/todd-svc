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
			it( 'should 200', () => rp( url ) );
			// it( "should return json",
			// 	() => rp( url )
			// 		.then( JSON.parse )
			// );
		} );
} );
