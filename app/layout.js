import { Space_Grotesk } from "next/font/google";
import "./globals.css";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata = {
  title: "TaskManager APP",
  description: "For Space APP AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} bg-[#0d1117] text-white min-h-screen antialiased`}
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}
