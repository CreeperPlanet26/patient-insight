"use client";

import 'regenerator-runtime/runtime'
import Image from "next/image";
import { Box, Button, CircularProgress } from "@mui/material"
import Link from "next/link";
import { PatientIcon } from "@/icons/PatientIcon";
import { MicIcon } from "@/icons/MicIcon";
import { StopRecordingIcon } from "@/icons/StopRecordingIcon";
import { use, useEffect, useRef, useState } from "react";
import { StopWatch } from "@/components/StopWatch";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useInterval } from '@/hooks/useInterval';

type PageType = "prompt" | "recording" | "result";
const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://patient-insight.vercel.app";
console.log("BASE_URL", BASE_URL)

export default function Diagnose() {

    const [currentPage, setCurrentPage] = useState<PageType>("prompt");
    const [promptPageClassNames, setPromptPageClassNames] = useState("fade-in");
    const [recordingPageClassNames, setRecordingPageClassNames] = useState("");
    const [resultPageClassNames, setResultPageClassNames] = useState("");
    const transcriptCardRef = useRef<HTMLDivElement>(null);

    const [isStopWatchRunning, setIsStopWatchRunning] = useState(true);
    const { transcript, listening, resetTranscript, } = useSpeechRecognition();
    const [lastSentTranscript, setLastSentTranscript] = useState("");

    const [questions, setQuestions] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [results, setResults] = useState<string>('');

    useEffect(() => {
        return () => {
            SpeechRecognition.stopListening();
            resetTranscript();
        }
    }, [])

    useInterval(async () => {
        if (transcript === lastSentTranscript || !transcript) { console.log("the transcript was not for questions."); return; };
        console.log("This code should run every 5 seconds for questions");
        const url = new URL(`${BASE_URL}/api/questions`);
        url.searchParams.append("transcript", transcript);
        console.log("received questions", transcript)
        const r = await (await fetch(url)).json();
        setLastSentTranscript(transcript);
        setQuestions(r.questions);

        console.log(r)

    }, 35000);

    useInterval(async () => {
        if (transcript === lastSentTranscript || !transcript) { console.log("the transcript was not sent for notes."); return; };
        console.log("This code should run every 5 seconds for notes");
        const url = new URL(`${BASE_URL}/api/notes`);
        url.searchParams.append("transcript", transcript);
        console.log("received notes", transcript)
        const r = await (await fetch(url)).json();
        setLastSentTranscript(transcript);
        setNotes(r.notes);

        console.log(r)

    }, 35000);


    const onRecordPress = () => {
        setPromptPageClassNames("fade-out");
        setRecordingPageClassNames("fade-in");

        setTimeout(() => {
            setCurrentPage("recording");
        }, 500)

        SpeechRecognition.startListening({ continuous: true })
    }

    const onStopRecordPress = async () => {
        setRecordingPageClassNames("fade-out");

        if (transcript.split(" ").length <= 10) {
            setPromptPageClassNames("fade-in");
            resetTranscript();
        }

        SpeechRecognition.stopListening();



        setTimeout(() => {
            if (transcript.split(" ").length <= 10) {
                setCurrentPage("prompt")
            } else {
                setCurrentPage("result");
                setRecordingPageClassNames("fade-in");

                if (transcriptCardRef?.current) transcriptCardRef.current.style.display = "none";
                setTimeout(() => {
                    if (transcriptCardRef?.current) transcriptCardRef.current.style.display = "block";
                }, 1)
            }
        }, 500)

        if (transcript.split(" ").length > 10) {
            const url = new URL(`${BASE_URL}/api/diagnose`);
            url.searchParams.append("transcript", transcript);
            console.log("received diagnose", transcript)
            const r = await (await fetch(url)).json();
            setLastSentTranscript(transcript);
            setResults(r.results);
        }
    }


    return (
        <div className={"diagnose-page"}>
            <nav>
                <Link href="/"><Button className="patient-btn">
                    <PatientIcon /> Patient Insight</Button></Link>
            </nav>

            {currentPage === "prompt" && <article className={promptPageClassNames}>
                <main>
                    <section className="symptoms">
                        <h1><PatientIcon fill="white" /> Patient Insight</h1>
                        <p>What are your symptoms?</p>
                    </section>

                    <div className="img-container"> <Image src="/audio-small3.png" alt="Audio visual" width={4276} height={4376} /></div>

                    <section className="record-container">
                        <h2>Explain your issues and have a diagnosis instantly</h2>

                        <Button onClick={() => onRecordPress()} className="record" variant="contained"><MicIcon /></Button>
                    </section>
                </main>
            </article>}

            {(currentPage !== "prompt") ? <div className={"recording-container " + recordingPageClassNames}>
                <div className="cards-container">
                    {currentPage === "result" && <div className="card result">
                        <h1>Diagnosis</h1>
                        <p>
                            {results.split("\n").map((q) => <>{q} <br /></>)}
                            {/* {transcript} */}
                            {!results && <div className="progress"><CircularProgress size={60} /></div>}
                        </p>

                    </div>}

                    {transcript && <div className="card questions">
                        <h1>Questions</h1>
                        <p>
                            {questions.split("\n").map((q) => <>{q} <br /></>)}
                        </p>
                        {!questions && <div className="progress"><CircularProgress size={60} /></div>}


                    </div>}
                    {transcript && <div className="card notes">
                        <h1>Notes</h1>
                        <p>
                            {notes.split("\n").map((q) => <>{q} <br /></>)}

                        </p>
                        {!questions && <div className="progress"><CircularProgress size={60} /></div>}
                    </div>
                    }
                    <div className="card" ref={transcriptCardRef}>
                        <h1>Transcript</h1>
                        <p>
                            {transcript}
                        </p>
                    </div>
                </div>
                {/* <div className="transcript">{transcript}</div> */}

                {currentPage === "recording" && <><StopWatch isRunning={isStopWatchRunning} />
                    <Button onClick={async () => await onStopRecordPress()} className="recording-btn record" variant="contained"><StopRecordingIcon /></Button> </>}
            </div> : null}
        </div >
    )
}


