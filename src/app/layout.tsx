import "../styles/globals.scss";
import { Metadata } from 'next';
import Theme from "../styles/theme";

export const metadata: Metadata = {
  title: 'Patient Insight',
  description: 'Explain your issues and have a diagnosis instantly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Theme>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Theme>
  )
}
