import { NextResponse } from 'next/server';
import { OpenAI } from "openai";

export const config = {
    runtime: 'edge',
}


export async function GET(req: Request) {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });


    const { searchParams } = new URL(req.url)
    const transcript = searchParams.get('transcript')
    console.log("questions", transcript);

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",

        messages: [{
            role: "user", content: `The following transcript is either from just a patient or a conversation of both a doctor and a patient. 
            Please create a diagnosis through a list of the symptoms provided. Please determine what that next steps are required such as medication and treatment throughout the list. It should be a list of 5 items. Refer to them as if you were a doctor. Do not ask for more information. Do not repeat a dialog.

        
        Transcript: ${transcript}`,
        }]
    });

    return NextResponse.json({ results: chatCompletion.choices[0].message.content },
        {
            status: 200,
        },
    );
}
