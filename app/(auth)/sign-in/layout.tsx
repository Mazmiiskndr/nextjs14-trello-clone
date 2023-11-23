import { Navbar } from "@/components/Layouts/navbar";
import Loading from "@/components/loading";
import { Link } from "@nextui-org/link";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "Login Page",
    template: `%s - Login Page`,
  },
  description:
    "Access your account quickly and securely on our Login Page. Offering Google, GitHub, and Twitter authentication options, we ensure a seamless and protected sign-in experience. Sign in now to explore our exclusive features and services.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative flex flex-col h-screen">
        <Navbar />

        <main className="flex-grow w-full pt-10">{children}</main>

        <footer className="flex items-center justify-center w-full py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
            title="nextui.org homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">Mazmiiskndr</p>
          </Link>
        </footer>
      </div>
    </Suspense>
  );
};

export default LoginLayout;
