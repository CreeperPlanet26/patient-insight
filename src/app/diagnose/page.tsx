"use client";
import 'regenerator-runtime/runtime'
import Image from "next/image";
import { Button } from "@mui/material"
import Link from "next/link";
import { PatientIcon } from "@/icons/PatientIcon";
import { MicIcon } from "@/icons/MicIcon";
import { StopRecordingIcon } from "@/icons/StopRecordingIcon";
import { use, useEffect, useRef, useState } from "react";
import { StopWatch } from "@/components/StopWatch";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useInterval } from '@/hooks/useInterval';

type PageType = "prompt" | "recording" | "result";


export default function Diagnose() {

    const [currentPage, setCurrentPage] = useState<PageType>("prompt");
    const [promptPageClassNames, setPromptPageClassNames] = useState("fade-in");
    const [recordingPageClassNames, setRecordingPageClassNames] = useState("");
    const [resultPageClassNames, setResultPageClassNames] = useState("");

    const [isStopWatchRunning, setIsStopWatchRunning] = useState(true);
    const { transcript, listening, resetTranscript, } = useSpeechRecognition();
    const [lastSentTranscript, setLastSentTranscript] = useState("");

    const [questions, setQuestions] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    useEffect(() => {
        return () => {
            SpeechRecognition.stopListening();
            resetTranscript();
        }
    }, [])

    useInterval(async () => {
        if (transcript === lastSentTranscript || !transcript) { console.log("the transcript was not for questions."); return; };
        // console.log("This code should run every 5 seconds for questions");
        // const url = new URL("http://localhost:3000/api/questions");
        // url.searchParams.append("transcript questions", transcript);
        // console.log("received questions", transcript)
        // const r = await (await fetch(url)).json();
        // setLastSentTranscript(transcript);
        // setQuestions(r.questions);

        // console.log(r)

    }, 20000);

    useInterval(async () => {
        if (transcript === lastSentTranscript || !transcript) { console.log("the transcript was not sent for notes."); return; };
        // console.log("This code should run every 5 seconds for notes");
        // const url = new URL("http://localhost:3000/api/notes");
        // url.searchParams.append("transcript notes", transcript);
        // console.log("received notes", transcript)
        // const r = await (await fetch(url)).json();
        // setLastSentTranscript(transcript);
        // setNotes(r.notes);

        // console.log(r)

    }, 20000);


    const onRecordPress = () => {
        setPromptPageClassNames("fade-out");
        setRecordingPageClassNames("fade-in");

        setTimeout(() => {
            setCurrentPage("recording");
        }, 500)

        SpeechRecognition.startListening({ continuous: true })
    }

    const onStopRecordPress = () => {
        setRecordingPageClassNames("fade-out");

        if (transcript.split(" ").length <= 10) {
            setPromptPageClassNames("fade-in");
            resetTranscript();
        }

        SpeechRecognition.stopListening();


        setTimeout(() => {
            setRecordingPageClassNames("fade-in");
            transcript.split(" ").length <= 10 ? setCurrentPage("prompt") : setCurrentPage("result");
        }, 500)
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
                            results will be here
                        </p>
                    </div>}

                    {questions && <div className="card questions">
                        <h1>Questions</h1>
                        <p>
                            {questions.split("\n").map((q) => <>{q} <br /></>)}
                        </p>
                    </div>}
                    {notes && <div className="card notes">
                        <h1>Notes</h1>
                        <p>
                            {notes.split("\n").map((q) => <>{q} <br /></>)}
                        </p>
                    </div>}
                    <div className="card notes">
                        <h1>Transcript</h1>
                        <p>
                            {/* {transcript.spli} */}
                            {transcript}
                        </p>
                    </div>
                </div>
                <div className="transcript">{transcript}</div>

                <StopWatch isRunning={isStopWatchRunning} />
                <Button onClick={() => onStopRecordPress()} className="recording-btn record" variant="contained"><StopRecordingIcon /></Button>

            </div> : null}

        </div >
    )
}


