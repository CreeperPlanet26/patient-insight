"use client";

import Image from "next/image";
import { Button } from "@mui/material"
import Link from "next/link";
import { PatientIcon } from "@/icons/PatientIcon";
import { MicIcon } from "@/icons/MicIcon";
import { StopRecordingIcon } from "@/icons/StopRecordingIcon";
import { useState } from "react";



export default function Diagnose() {
    const [isRecording, setIsRecording] = useState(false);
    const [shouldRenderPrompt, setShouldRenderPrompt] = useState(true);

    const onRecord = (value: boolean) => {
        setIsRecording(value)

        setTimeout(() => {
            setShouldRenderPrompt(!value)
        }, 500)
    }


    return (
        <div className={"diagnose-page"}>
            <nav>
                <Link href="/"><Button className="patient-btn">
                    <PatientIcon /> Patient Insight</Button></Link>
            </nav>

            {shouldRenderPrompt && <article className={isRecording === true ? "is-recording" : ""}>
                <main>
                    <section className="symptoms">
                        <h1><PatientIcon fill="white" /> Patient Insight</h1>
                        <p>What are your symptoms?</p>
                    </section>

                    <div className="img-container"> <Image src="/audio-small3.png" alt="Audio visual" width={4276} height={4376} /></div>

                    <section className="record-container">
                        <h2>Explain your issues and have a diagnosis instantly</h2>

                        <Button onClick={() => onRecord(true)} className="record" variant="contained"><MicIcon /></Button>
                    </section>
                </main>
            </article>}

            {!shouldRenderPrompt && <div className={"recording-container " + (isRecording === false ? "is-recording" : "")}>
                <p>What are your symptoms?</p>
                <Button onClick={() => onRecord(false)} className="recording-btn record" variant="contained"><StopRecordingIcon /></Button>
            </div>}

        </div >
    )
}
