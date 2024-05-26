import { ChatOpenAI } from "@langchain/openai";
import { StreamingTextResponse } from 'ai';


const createGPTInstance = () => {
    return new ChatOpenAI({
        modelName: "gpt-4o-2024-05-13",
        temperature: 0.9,
        openAIApiKey: process.env.OPENAI_API_KEY!, // In Node.js defaults to process.env.OPENAI_API_KEY
    });
};

const starterPrompts = `You are an assistant dedicated to helping young women and girls learn about their birth control options. To provide personalized advice, ask them 10 questions that will help determine the best birth control method for their individual needs and preferences. Ensure your questions are clear, respectful, and considerate of their privacy and comfort.`;
// export const startResponse = async() => {
//     console.log('langchain startResponse');
//     const llm = createGPTInstance();
//     const stream = await llm.stream(starterPrompts);
//     const chunks = [];
    
//     // for await (const chunk of stream) {
//     //   chunks.push(chunk);
//     //   console.log(`${chunk.content}|`);
//     // }

//     return (await stream) as unknown as ReadableStream<{
//         response: string
//     }>;
// };

export type TllmResponse = {
    response:string
};
export const startResponse = async (): Promise<ReadableStream<TllmResponse>> => {
    console.log('langchain startResponse');
    const llm = createGPTInstance();
    const stream = await llm.stream(starterPrompts);

    return new ReadableStream({
        async start(controller) {
            try {
                for await (const chunk of stream) {
                    if (chunk) { // Ensure chunk is not null or undefined
                        controller.enqueue({ response: String(chunk.content) });
                    }
                }
            } catch (error) {
                controller.error(error);
            } finally {
                controller.close();
            }
        },
        cancel() {
            stream.return();
        }
    });
};


// export const appendResponses = async (): Promise<ReadableStream<TllmResponse>> => {
//     console.log('langchain startResponse');
//     const llm = createGPTInstance();
//     const stream = await llm.stream(starterPrompts);

//     return new ReadableStream({
//         async start(controller) {
//             try {
//                 for await (const chunk of stream) {
//                     if (chunk) { // Ensure chunk is not null or undefined
//                         controller.enqueue({ response: String(chunk.content) });
//                     }
//                 }
//             } catch (error) {
//                 controller.error(error);
//             } finally {
//                 controller.close();
//             }
//         },
//         cancel() {
//             stream.return();
//         }
//     });
// };