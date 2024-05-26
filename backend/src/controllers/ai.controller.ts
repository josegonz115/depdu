import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import type { BaseMessage } from "@langchain/core/messages";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
    RunnableWithMessageHistory,
    RunnablePassthrough,
    RunnableSequence,
} from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import asyncMiddleware from "../middleware/asyncMiddleware.js";
import {
    JsonOutputFunctionsParser,
    OutputFixingParser,
} from "langchain/output_parsers";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { JsonOutputParser } from "@langchain/core/output_parsers";


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