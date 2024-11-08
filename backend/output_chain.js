import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { retriever_abramov } from './utils/retriever_abramov.js'
import { combineDocuments } from './utils/combineDocuments.js'
import { formatConvHistory } from './utils/formatConvHistory.js'


// This file is just to test whether retriever works or not

// Its a chain which retrieves data from retriever, create a standalone question from user input, puts it into a memory, create embeddings of standalone question, perform vector search and by combining results with LLM, chain is invoked and answer is given


const openAIApiKey = process.env.OPENAI_API_KEY
const llm = new ChatOpenAI({ openAIApiKey })

const standaloneQuestionTemplate = `Given some conversation history (if any) and a question, convert the question to a standalone question.
conversation history: {conv_history}
question: {question}
standalone question:`
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate)



const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question based on the context provided and the conversation history. Try to find the answer in the context. If the answer is not given in the context, find the answer in the conversation history if possible. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." Don't try to make up an answer. Always speak as if you were chatting to a friend.
context: {context}
conversation history: {conv_history}
question: {question}
answer: `
const answerPrompt = PromptTemplate.fromTemplate(answerTemplate)


const standaloneQuestionChain = standaloneQuestionPrompt
   .pipe(llm)
   .pipe(new StringOutputParser())


const retrieverChain = RunnableSequence.from([
   prevResult => prevResult.standalone_question,
   retriever_abramov,
   combineDocuments
])


const answerChain = answerPrompt
   .pipe(llm)
   .pipe(new StringOutputParser())



const chain = RunnableSequence.from([
    {
        standalone_question: standaloneQuestionChain,
        original_input: new RunnablePassthrough()
    },
    {
        context: retrieverChain,
        question: ({ original_input }) => original_input.question,
        conv_history: ({ original_input }) => original_input.conv_history
    },
    answerChain
 ])


const convHistory = []

const question = "Where was author born??"


const response = await chain.invoke({
    question: question,
    conv_history: formatConvHistory(convHistory)
})

convHistory.push(question)
convHistory.push(response)


console.log(response)