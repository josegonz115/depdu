import asyncMiddleware from "../middleware/asyncMiddleware.js";
import { webCrawl } from '../langchain/langchain.js';

export type TSuggestions = {
    image: string;
    title: string;
    url: string;
    content: string;
};

const crawlSuggestions = asyncMiddleware(async(req, res, next) => {
    const crawledResults = await webCrawl(req.body.options);
    const parsedResults: TSuggestions[] = crawledResults.retrievedDocs.map((res, i) => ({
        image: res.metadata.images[i], 
        title: res.metadata.title,
        url: res.metadata.source,
        content: res.pageContent
    }));
    res.send({options: parsedResults});
});

export { crawlSuggestions };