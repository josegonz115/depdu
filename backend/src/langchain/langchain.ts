import { ChatOpenAI } from "@langchain/openai";
import { THistory } from "../server.js";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { createOpenAIFunctionsAgent } from "langchain/agents";
import { createRetrieverTool } from "langchain/tools/retriever";
import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";

/*
  [{"title":"Weather in December 2023 in San Francisco, California, USA","url":"https://www.timeanddate.com/weather/@5391959/historic?month=12&year=2023","content":"Currently: 52 °F. Broken clouds. (Weather station: San Francisco International Airport, USA). See more current weather Select month: December 2023 Weather in San Francisco — Graph °F Sun, Dec 17 Lo:55 6 pm Hi:57 4 Mon, Dec 18 Lo:54 12 am Hi:55 7 Lo:54 6 am Hi:55 10 Lo:57 12 pm Hi:64 9 Lo:63 6 pm Hi:64 14 Tue, Dec 19 Lo:61","score":0.96006},...]
*/

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


// // Parse the JSON response
// const data = JSON.parse(responseJson);

// Extract the required items from the "results" section
// const parsedResults = data.results.map((result, index) => ({
//     image: data.images[index] || null,  // Assuming the images correspond to the results in the same order
//     title: result.title,
//     url: result.url,
//     content: result.content
// }));


/*

const parsedResults = object["retrievedDocs".map((res)=>{

});

export type TSuggestions = {
    image: string;
    title: string;
    url: string;
    content: string;
};
{
    "retrievedDocs": [
        {
            "pageContent": "According to research and experts, several factors may determine which birth control suits the needs and preferences of an individual, including:\nThe Best Birth Control Options\n“When deciding on the best birth control, it’s really about finding the one that fits well into someone’s life,” emphasizes Horowitz. Regardless, it’s particularly valuable for gaining a clearer understanding of one’s cycle, she notes\nHow to Find More Information About Birth Control Options\nBoth Dr. Evans and Horowitz frequently direct individuals to Bedsider.org, a birth control support network for in-depth information on all things birth control, as well as a provider directory.\n “At a fundamental level, birth control works by blocking sperm from getting to eggs, and there are various ways that’s done,” explains Jessica Horowitz, a family nurse practitioner and the chief clinical officer at Tia, a network of online and in-person women’s health clinics offering primary care, mental health, gynecology, and wellness services.\n A Guide To The Best Birth Control Options\nMedically Reviewed\nTable of Contents\nSexual health plays a pivotal role in one’s overall well-being and life satisfaction, and contraception, or birth control, can be an essential part of sex for some. Horowitz says copper IUDs have the following benefits:\nHorowitz also notes the follow possible drawbacks of copper IUDs:\nIndividuals may experience anxiety about IUD insertion procedures, and it’s important for health care providers to address those concerns, say Dr. Evans and Horowitz.\n",
            "metadata": {
                "title": "The Best Birth Control Options: A 2024 Guide - Forbes Health",
                "source": "https://www.forbes.com/health/womens-health/best-birth-control/",
                "score": 0.97442,
                "images": null
            }
        },
        {
            "pageContent": "Pandia Health offers the Twirla and Xulane birth control patches. First, you'll pay $30 to fill out the company's online form. Next, the doctor will review your medical history and write a ...",
            "metadata": {
                "title": "The Best Birth Control Patch Brands to Try in 2024 - Healthline",
                "source": "https://www.healthline.com/health/birth-control/birth-control-patch-brands",
                "score": 0.96519,
                "images": null
            }
        },
        {
            "pageContent": "Birth control questions and answers\nWhat is the percentage of women on birth control?\nNinety-nine percent of women of reproductive age and who are sexually active have used birth control at least once in their lifetime.\n The cost of birth control\nFor a more in-depth analysis of each type of birth control and its cost, read this SingleCare article about the cost of birth control.\n Contraceptive use statistics worldwide\nBirth control statistics in the U.S.\nBirth control statistics by type of contraceptive\nBirth control effectiveness statistics\n | Birth control stats by contraception type | Birth control efficacy stats | Common complications | Costs | FAQs | Research\nBirth control is one of the miracles of modern medicine, letting people take their reproductive health and future into their own hands. Can you lower cholesterol fast?\nMore articles on:\nAlso Read\nFluconazole interactions to avoid\nPostpartum depression stats\n9 foods high in estrogen\nIs it PMS or early pregnancy?\n",
            "metadata": {
                "title": "2024 Birth control statistics - SingleCare",
                "source": "https://www.singlecare.com/blog/birth-control-statistics/",
                "score": 0.9272,
                "images": null
            }
        }
    ]
}
*/