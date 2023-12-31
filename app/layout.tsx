import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/Layouts/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { SessionProviders } from "@/components/SessionProviders";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={clsx("min-h-screen bg-background ")}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <SessionProviders>
            {/* <div className="relative flex flex-col h-screen"> */}
            {/* <main className="container flex-grow px-6 pt-5 mx-auto max-w-7xl"> */}
            {children}
            {/* </main> */}
            {/* <footer className="flex items-center justify-center w-full py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                  title="nextui.org homepage"
                >
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary">NextUI</p>
                </Link>
              </footer> */}
            {/* </div> */}
          </SessionProviders>
        </Providers>
      </body>
    </html>
  );
}
