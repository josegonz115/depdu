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




const messages: BaseMessage[] = [
    new HumanMessage({ content: "hi! I'm bob" }),
    new AIMessage({ content: "hi!" }),
    new HumanMessage({ content: "I like vanilla ice cream" }),
    new AIMessage({ content: "nice" }),
    new HumanMessage({ content: "whats 2 + 2" }),
    new AIMessage({ content: "4" }),
    new HumanMessage({ content: "thanks" }),
    new AIMessage({ content: "No problem!" }),
    new HumanMessage({ content: "having fun?" }),
    new AIMessage({ content: "yes!" }),
    new HumanMessage({ content: "That's great!" }),
    new AIMessage({ content: "yes it is!" }),
];

const messageHistories: Record<string, InMemoryChatMessageHistory> = {};
const filterMessages = ({ chat_history }: { chat_history: BaseMessage[] }) => {
    return chat_history.slice(-10);
};
const runnablePass = RunnablePassthrough.assign({
    // @ts-ignore
    chat_history: filterMessages,
});

// const filteredMessages = filterMessages({chat_history: messages});
// const filterMessages = (input: { chat_history: BaseMessage[] }) => {
//     return input.chat_history.slice(-10);
// };

// const filterMessages = (input: Record<string, unknown>) => {
//     const chat_history = input['chat_history'] as BaseMessage[];
//     return chat_history.slice(-10);
// };
// const createGPTInstance = () => {
//     return new ChatOpenAI({
//         modelName: "gpt-4", // Defaults to "text-davinci-003" if no model provided.
//         temperature: 0, // previously 0.9
//         openAIApiKey: OPENAPI_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
//     });
// };

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are a helpful assistant who remembers all details the user shares with you.`,
    ],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
]);

const model = new ChatOpenAI({
    modelName: "gpt-4o-2024-05-13",
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY!,
});


const createGPTInstance = () => {
    return new ChatOpenAI({
        modelName: "gpt-4o-2024-05-13",
        temperature: 0.9,
        openAIApiKey: process.env.OPENAI_API_KEY!, // In Node.js defaults to process.env.OPENAI_API_KEY
    });
};


const starterPrompts = `You are an assistant dedicated to helping young women and girls learn about their birth control options. To provide personalized advice, ask them 10 questions that will help determine the best birth control method for their individual needs and preferences. Ensure your questions are clear, respectful, and considerate of their privacy and comfort.`;

export const startResponse = async() => {
    const llm = createGPTInstance();
    const stream = await llm.stream(starterPrompts);
    const chunks = [];
    
    // for await (const chunk of stream) {
    //   chunks.push(chunk);
    //   console.log(`${chunk.content}|`);
    // }

    return (await stream) as unknown as ReadableStream<{
        response: string
    }>;
};




export interface IGeneratedSuggestions {
    description: string;
    followUpQuestions: string[];
}
export const streamResponse = async (): Promise<ReadableStream<{ suggestions: IGeneratedSuggestions }>> => {
    const llm = createGPTInstance();
    const prompt = new PromptTemplate({
        template: starterPrompts,
        inputVariables: [],
        templateFormat: "f-string",
    });
    const outputParser = new StringOutputParser();

    const chain = prompt.pipe(llm).pipe(outputParser);
    const stream = await chain.stream({ output: "string" });

    return new ReadableStream({
        async start(controller) {
            for await (const chunk of stream) {
                controller.enqueue({ suggestions: JSON.parse(chunk) });
            }
            controller.close();
        },
        cancel() {
            stream.return();
        }
    });
}


        // const chain = prompt.pipe(model).pipe(outputParser);
    // const stream = await chain.stream({
    //     topic: "parrot",
    //   });
      
    //   for await (const chunk of stream) {
    //     console.log(`${chunk}|`);
    //   }




const chain = RunnableSequence.from([runnablePass, prompt, model]);

const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: async (sessionId) => {
        if (messageHistories[sessionId] === undefined) {
            const messageHistory = new InMemoryChatMessageHistory();
            await messageHistory.addMessages(messages);
            messageHistories[sessionId] = messageHistory;
        }
        return messageHistories[sessionId];
    },
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
});

const testModel = asyncMiddleware(async (req, res, next) => {
    const stream = await startResponse();
    const readableStreams = await startResponse();
    let responseWrapper;
    for await (responseWrapper of readableStreams) {
        const overview = responseWrapper;

    }
});


export { testModel, testTwo };
