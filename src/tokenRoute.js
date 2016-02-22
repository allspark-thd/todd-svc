import { Router } from 'express';

const router = new Router();
router.get('/auth/token', (request, response, next) => response.end("Ok") );

export default router; 
