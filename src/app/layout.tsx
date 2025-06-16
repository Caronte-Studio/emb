import type { Metadata } from "next";
// import { Inter_Tight } from "next/font/google";
import { Sidebar } from "./components/Sidebar";

import { Providers } from "./Providers";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import AddBootstrap from "./AddBootstrap";

// const interTight = Inter_Tight({
//   subsets: ["latin"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "EMB Group",
  description: "Plataforma interna de Caronte Studio",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
        url: "/logotipo-isotipo.png",
      },
      {
        rel: "icon",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
        url: "/logotipo-isotipo-ngtv.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AddBootstrap />
      {/* <Providers> */}
        <html lang="es" suppressHydrationWarning>
          <body suppressHydrationWarning  >
            <div className="d-flex h-100">
              <Sidebar role="superadmin"/>
              {/* Main content */}
              <main className="flex-grow-1 px-5 mb-5">{children}</main>
              <footer></footer>
            </div>
           
            
          </body>
        </html>
      {/* </Providers> */}
    </>
  );
}
