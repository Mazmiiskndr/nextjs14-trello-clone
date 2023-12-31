import { Navbar } from "@/components/Layouts/navbar";
import { Link } from "@nextui-org/link";
import React, { Suspense } from "react";
import Loading from "@/components/loading";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative flex flex-col h-screen">
        <Navbar />

        <main className="container flex-grow px-6 pt-20 mx-auto max-w-7xl">
          {children}
        </main>
        <footer className="flex items-center justify-center w-full py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
            title="nextui.org homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">NextUI</p>
          </Link>
        </footer>
      </div>
    </Suspense>
  );
};

export default MarketingLayout;
