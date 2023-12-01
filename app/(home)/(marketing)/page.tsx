"use client";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { Medal } from "lucide-react";
import Link from "next/link";
import React from "react";
import { TbExternalLink } from "react-icons/tb";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";

const headingFont = localFont({
  src: "../../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function MarketingPage() {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.8,
      },
    },
  };
  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <div
        className={clsx(
          "flex flex-col items-center justify-center",
          headingFont.className
        )}
      >
        <div className="flex items-center p-4 mb-4 uppercase border rounded-full shadow-sm bg-amber-100 text-amber-700">
          <Medal className="w-6 h-6 mr-2" />
          No 1 Task Management
        </div>
        <h1 className="mb-6 text-4xl text-center md:text-6xl text-neutral-800 dark:text-neutral-200">
          Taskify Helps Team Move
        </h1>
        <div className="items-center justify-center px-4 py-3 text-5xl text-white md:px-8 md:py-4 rounded-xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 w-fit">
          Work Forward.
        </div>
      </div>
      <div className="max-w-xs mx-auto mt-4 text-sm text-center md:text-xl text-neutral-400 md:max-w-2xl dark:text-neutral-300">
        Collaborate, manage projects, and react new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplis it all with Taskify
      </div>
      <Button
        as={Link}
        href="/sign-up"
        color="primary"
        variant="solid"
        size="lg"
        className="flex items-center mt-5 font-semibold gap-x-2"
      >
        Get Taskify for free
        <TbExternalLink size={20} />
      </Button>
    </motion.div>
  );
}
