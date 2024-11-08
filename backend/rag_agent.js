import { createRetrieverTool } from "langchain/tools/retriever";
import { retriever_react } from './utils/retriever_react_wiki.js'
import { retriever_abramov } from './utils/retriever_abramov.js'
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { createOpenAIToolsAgent, AgentExecutor } from "langchain/agents";

const llm = new ChatOpenAI({ temperature: 0 });

const abromovTool = createRetrieverTool(retriever_abramov, {
    name: "dan_abromov_tool",
    description:
      "Searches and returns data from essay written by Dan Abromov about his college life.",
  });


const reactTool = createRetrieverTool(retriever_react, {
    name: "react_tool",
    description:
      "Searches and returns excerpts from ReactJS wikipedia page.",
  });

const systemPrompt = `
Be a helpful AI companion who communicates technical information in an approachable way.
Instead of giving general answers, use your tools and knowledge to provide detailed, relevant responses based on the specific information at hand.
`

const prompt = ChatPromptTemplate.fromMessages(
    [
        ("system",systemPrompt),
        ("human", "{input}"),
        new MessagesPlaceholder("agent_scratchpad")
    ]
)


const tools = [abromovTool, reactTool]

const agent = await createOpenAIToolsAgent({
    llm,
    tools,
    prompt,
  });

const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });




export async function getAgentResponse(query){
    const result = await agentExecutor.invoke(
        { 
            input: query
        }
        
    );
    
    return result.output
}



