import { ChatOpenAI } from "@langchain/openai";
import { THistory } from "../server.js";
import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";

const createGPTInstance = () => {
    return new ChatOpenAI({
        modelName: "gpt-4o-2024-05-13",
        temperature: 0.9,
        openAIApiKey: process.env.OPENAI_API_KEY!, // In Node.js defaults to process.env.OPENAI_API_KEY
    });
};

// const starterPrompts = `You are an assistant helping young women and girls with birth control options. Ask 5 simple and clear questions to understand their needs and suggest the best method. Be respectful and straightforward.`;
// const questions = `
// Lifestyle and Preferences:
// 1. How often are you comfortable with taking or using birth control (e.g., daily, weekly, monthly, long-term)?
// 2. Are you looking for a birth control option without hormones?
// 3. Do you want a birth control method that also protects against STDs?
// 4. Are you planning to have children in the future?

// Medical History and Health:
// 5. Do you have any pre-existing medical conditions that might affect your choice of birth control?
// 6. Are you currently breastfeeding?
// 7. Have you had any issues with birth control in the past, such as side effects from hormonal birth control?

// Convenience and Access:
// 8. What is your budget for birth control?
// 9. Do you have access to medical facilities for birth control methods that require a doctor's visit, like IUDs or implants?
// `;

const starterPrompts = `Pretend you are an birth control assistant helping young women and girls find the best birth control options. You will ask them the following questions and wait for their response:
1. How often are you comfortable using birth control (e.g., daily, weekly, monthly, long-term)?
2. Do you want a birth control method that also protects against STDs?
3. Do you have any medical conditions or past issues with birth control (e.g., side effects)?
4. What is your budget for birth control?
5. Do you have access to medical facilities for methods that require a doctor's visit, like IUDs or implants?

Be clear and respectful.`;

export type TllmResponse = {
    response: string;
};
export const startResponse = async (): Promise<
    ReadableStream<TllmResponse>
> => {
    console.log("langchain startResponse");
    const llm = createGPTInstance();
    const stream = await llm.stream(starterPrompts);

    return new ReadableStream({
        async start(controller) {
            try {
                for await (const chunk of stream) {
                    if (chunk) {
                        // Ensure chunk is not null or undefined
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
        },
    });
};

// const appendStart = `You are an assistant helping young women and girls find the best birth control options. Make sure you responses are brief and concise, aim for understandability. The following is a series of conversation that we have been having. You are denoted by 'LLM' and I am denoted by 'User' No need to respond with 'LLM'`;
const appendStart = `You are an assistant helping young women and girls find the best birth control options. Make sure your responses are brief and concise, aiming for understandability. The following is a series of conversations we have been having. You are denoted by 'LLM' and I am denoted by 'User'. No need to respond with 'LLM'. When providing suggestions, list the products starting with 'options:', then in a comma-separated format, then a line break, and then elaborate concisely on each product.
Here are some birth control products to consider: birth control pills, condoms, IUDs, birth control implants, birth control patches, birth control shots, vaginal rings, emergency contraception, fertility awareness methods, and diaphragms.
Now, continue with the conversation based on the previous interactions.`;
export const appendResponses = async (
    chats: THistory[]
): Promise<ReadableStream<TllmResponse>> => {
    console.log("langchain append");
    const llm = createGPTInstance();
    const chatStrings = chats.map((chat) => `\n${chat.sender}: ${chat.text}`);
    const totalPrompt = appendStart + chatStrings.join("");
    const stream = await llm.stream(totalPrompt);

    return new ReadableStream({
        async start(controller) {
            try {
                for await (const chunk of stream) {
                    if (chunk) {
                        // Ensure chunk is not null or undefined
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
        },
    });
};

export const webCrawl = async (options: string) => {
    const optionsArray = options.split(",");
    const optionsString = optionsArray.join(", ");
    const suggestionStartingPrompt = `You are an assistant helping young women and girls find the best birth control options. Search up product information for the following items: ${optionsString}`;
    const amt = optionsArray.length;
    const retriever = new TavilySearchAPIRetriever({
        k: amt,
        includeImages:true,
    });
    const retrievedDocs = await retriever.invoke(suggestionStartingPrompt);
    return {retrievedDocs};
};