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
        <p>Lorem ipsum dolor sit amet consectetur. Nibh augue sed ornare in cras malesuada. Malesuada bibendum tristique vitae aenean ac. </p>
        <Link href="/diagnose"><Button className="try-btn" variant="contained" color="primary" target="_blank" href="/">
          Try now
        </Button> </Link>
      </section>

      <Image src="/medical-team.png" alt="Medical Team" width={512} height={512} />
    </div>
  )
}
