import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,

});

const openai = new OpenAIApi(configuration);

export async function POST(request){
    try{
        const { message } = await request.json();

        const completion = await openai.createChatCompletion({
            model: 'gpt-4o-mini',
            messages: [
                {role: 'system', content: 'You are a helpful assistant.'},
                {role: 'user', content: message},
            ],
        });

        const reply = completion.data.choices[0].message.content;
        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Error with OpenAI API: ', error);
        return NextResponse.json({error: 'Failed to get response from OpenAI'}, {status: 500});
    }
}

