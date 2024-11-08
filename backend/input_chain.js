import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { TextLoader } from "langchain/document_loaders/fs/text";
import { vector_store_abramov } from './utils/retriever_abramov.js'
import { vector_store_react } from './utils/retriever_react_wiki.js'
import { v4 as uuidv4 } from 'uuid'; 

 
async function chunkAndStore(datasource, meta_data, vector_db) {
    try {
        const loader = new TextLoader(
            datasource
          );
        const doc = await loader.load();
    
        doc[0].metadata["about"]  = meta_data
    
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 50,
            separators: ['\n\n', '\n', ' ', ''] // default setting
        })
       
        const chunks = await splitter.splitDocuments(doc)
        
        createEmbeddingAndStore(vector_db, chunks)

        console.log('Data chunked and stored to vector store');
    
       
     } catch (err) {
        console.log(err)
     }
 }

async function createEmbeddingAndStore(vector_store, document_chunks) {

    const ids = document_chunks.map(chunk => chunk.metadata.loc.lines.from.toString() + "-" + chunk.metadata.loc.lines.to.toString() + uuidv4() );

    await vector_store.addDocuments(document_chunks, { ids });

    console.log('Embeddings and Store complete!');
}



async function queryVectorStore(vector_store, filterSource, query){

    const filter = { source: filterSource };
        
    const similaritySearchResults = await vector_store.similaritySearch(
        query,
        2,
        filter
    );

    for (const doc of similaritySearchResults) {
    console.log(`* ${doc.pageContent} [${JSON.stringify(doc.metadata, null)}]`);
    }


}




chunkAndStore('./data/abromov.txt', "Essay written by Dan Abramov (Founder of ReactJS) of what he did in college", vector_store_abramov)


chunkAndStore('./data/react_wiki.txt', "A wikipedia page on ReactJS library", vector_store_react)






/* For testing */

// queryVectorStore(vector_store_react, "./data/react_wiki.txt", "what is react?") // for testing


// queryVectorStore(vector_store_abramov, "./data/abromov.txt", "programming") // for testing