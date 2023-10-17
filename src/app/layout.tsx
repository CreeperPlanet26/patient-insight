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
        <meta name="google-site-verification" content="b1c55Ng4j3VJXfO1MMohWhDDxe4iLPQy_c3DfxSZXq4" />
        <body>{children}</body>
      </html>
    </Theme>
  )
}
