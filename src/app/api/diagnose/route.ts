import { NextResponse } from 'next/server';
import { OpenAI } from "openai";

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
            Please create a diagnosis through a list of the symptoms provided. Please determine what that next steps are required such as medication and treatment throughout the list. There should be 5 elements in the list.

        
        Transcript: ${transcript}`,
        }]
    });

    return NextResponse.json({ notes: chatCompletion.choices[0].message.content },
        {
            status: 200,
        },
    );
}