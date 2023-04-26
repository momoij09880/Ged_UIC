const { Configuration, OpenAIApi}= require("openai");
const { text } = require("pdfkit");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.key,
});
//const key='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';

const openai= new OpenAIApi(configuration);

 async function runCompletion(){
    const completion= await openai.createCompletion({
        model:"text-davinci-003",
        prompt:"bonjour comment tu vas??",
    });
    console.log(completion.data.choices[0].text);
 }

 runCompletion();

 