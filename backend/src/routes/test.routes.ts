import express from 'express'
import asyncMiddleware from '../middleware/asyncMiddleware.js';
import { testModel, testTwo } from '../controllers/ai.controller.js';
import type { Server } from 'socket.io';

export default (io:Server) => {
    const testRouter = express.Router();

    testRouter.get('/',asyncMiddleware( async(req, res, next)=> {
        res.send({message: 'working correctly'});
    })); 
    testRouter.get('/langchain', asyncMiddleware( async(req, res, next)=> {
        res.send({message: 'you are in langchain'})
    }));
    
    testRouter.get('/testmodel', testModel);
    
    return testRouter;
}


