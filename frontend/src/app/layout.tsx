import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import 'react-toastify/ReactToastify.min.css'

const rubik = Rubik({ subsets: ["latin"] , weight: "400"});

export const metadata: Metadata = {
  title: "Diário Caxias",
  description: "Plataforma para projetos educacionais em Caxias, MA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        {children}
      </body>
    </html>
  );
}

