import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const COLLECTION_NAME = "react_rag_collection"

const EMBEDDING_MODEL = "text-embedding-3-small"


const embedding_model = new OpenAIEmbeddings({
    model: EMBEDDING_MODEL,
})  // read openai api key from env var OPENAI_API_KEY

export const vector_store_react = new Chroma(embedding_model, {
    collectionName: COLLECTION_NAME,
    collectionMetadata: {
      "hnsw:space": "cosine",
    }, // Optional, can be used to specify the distance method of the embedding space https://docs.trychroma.com/usage-guide#changing-the-distance-function
  });



const filter = { source: "./data/react_wiki.txt" };

export const retriever_react = vector_store_react.asRetriever({
    filter: filter,
    k: 2,
  });
