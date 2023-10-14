import Image from "next/image";
import { Button } from "@mui/material"
import Link from "next/link";
import { PatientIcon } from "@/icons/PatientIcon";
import { MicIcon } from "@/icons/MicIcon";

export default function Diagnose() {
    return (
        <div className="diagnose-page">
            <nav>
                <Link href="/"><Button className="patient-btn">
                    <PatientIcon /> Patient Insight</Button></Link>
            </nav>


            <section>
                <h1><PatientIcon fill="white" /> Patient Insight</h1>
                <p>What are your symptoms?</p>
            </section>

            <div className="img-container"> <Image src="/audio-small3.png" alt="Audio visual" width={4276} height={4376} /></div>

            <section>
                <h2>Explain your issues and have a diagnosis instantly</h2>

                <Button className="record" variant="contained"><MicIcon /></Button>
            </section>
        </div>
    )
}
