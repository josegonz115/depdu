import express from 'express';
import { crawlSuggestions } from '../controllers/ai.controller.js';
import asyncMiddleware from '../middleware/asyncMiddleware.js';

const aiRouter = express.Router();

aiRouter.post('/crawl', crawlSuggestions);


aiRouter.post('/test', asyncMiddleware(async(req, res, next)=> {
    console.log(req);
    console.log(req.body);
    console.log(req.body.options);
}));


export default aiRouter;