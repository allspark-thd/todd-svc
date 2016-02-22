/* eslint-env mocha */
import rp from 'request-promise';

const VAULT_URL = process.env.VAULT_URL;
export default () => rp( {
	uri: VAULT_URL + '/v1/sys/init',
	method: 'PUT',
	body: JSON.stringify( { secret_shares:1, secret_threshold:1 } ),
} ).then( console.log )
