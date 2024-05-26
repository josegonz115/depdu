import express from 'express'
import asyncMiddleware from '../middleware/asyncMiddleware.js';
import { testModel } from '../controllers/ai.controller.js';
import type { Server } from 'socket.io';

const testRouter = express.Router();

testRouter.get('/',asyncMiddleware( async(req, res, next)=> {
    res.send({message: 'working correctly'});
})); 
testRouter.get('/langchain', asyncMiddleware( async(req, res, next)=> {
    res.send({message: 'you are in langchain'})
}));

    
export default testRouter;


