import express from 'express';
import tokenRouter from './tokenRoute';
import { json } from 'body-parser-json';

export default () =>
  express()
    .use( json() )
    .use( tokenRouter )
    .listen( process.env.PORT || 3000 );



// http://todd.com/abcd-efg12-aaeeebbbb-123/aaabbcijejsiejro213
