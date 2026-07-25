import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Cabinet d'Affaires Juridiques – Certifications Internationales d'Excellence",
  description:
    "Obtenez une certification professionnelle en Pratique Juridique ou Immobilière avec le Dr Lobé. Bourse Mamadou TOURÉ disponible.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-[#0B0F19] text-gray-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}