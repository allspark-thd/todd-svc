import express from 'express';
import tokenRouter from './tokenRoute';
export default () => express().use(tokenRouter).listen( process.env.PORT || 3000 );
