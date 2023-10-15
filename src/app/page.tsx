import { PatientIcon } from "@/icons/PatientIcon";
import Image from "next/image";
import { Button } from "@mui/material"
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
      <nav>
        <Link href="/"><Button className="patient-btn">
          <PatientIcon /> Patient Insight</Button></Link>
      </nav>

      <section>
        <h1>Diagnose in seconds</h1>
        <p>Are you feeling sick but unsure about what exactly your disorder is? Well, PatientInsight is here to assist you with personalized health insights! Our product takes in live-feed audio input and compares it to a vast database of medical conditions and case histories to diagnose your condition accurately in a matter of minutes. Simply describe your symptoms orally, and our product will take it from there!</p>
        <Link href="/diagnose"><Button className="try-btn" variant="contained" color="primary" target="_blank" href="/">
          Try now
        </Button> </Link>
      </section>

      <Image src="/medical-team.png" alt="Medical Team" width={512} height={512} />
    </div>
  )
}
