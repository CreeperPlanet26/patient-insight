"use client";
import 'regenerator-runtime/runtime'
import Image from "next/image";
import { Button } from "@mui/material"
import Link from "next/link";
import { PatientIcon } from "@/icons/PatientIcon";
import { MicIcon } from "@/icons/MicIcon";
import { StopRecordingIcon } from "@/icons/StopRecordingIcon";
import { useState } from "react";
import { StopWatch } from "@/components/StopWatch";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

type PageType = "prompt" | "recording" | "result";

export default function Diagnose() {
    // const [isRecording, setIsRecording] = useState(false);

    const [currentPage, setCurrentPage] = useState<PageType>("prompt");
    const [promptPageClassNames, setPromptPageClassNames] = useState("fade-in");
    const [recordingPageClassNames, setRecordingPageClassNames] = useState("");
    const [resultPageClassNames, setResultPageClassNames] = useState("");

    const [isStopWatchRunning, setIsStopWatchRunning] = useState(true);

    const {
        transcript,
        listening,
        resetTranscript,

    } = useSpeechRecognition();

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

        transcript.split(" ").length <= 10 ? setPromptPageClassNames("fade-in") : setResultPageClassNames("fade-in");
        SpeechRecognition.stopListening();
        resetTranscript();

        setTimeout(() => {
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

            {currentPage === "recording" && <div className={"recording-container " + recordingPageClassNames}>
                <StopWatch isRunning={isStopWatchRunning} />
                <Button onClick={() => onStopRecordPress()} className="recording-btn record" variant="contained"><StopRecordingIcon /></Button>

                <div className="transcript">{transcript}</div>

            </div>}

        </div >
    )
}


