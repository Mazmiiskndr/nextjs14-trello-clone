'use client'
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { UserAccountNav } from "../UserAccountNav";
import { Button } from "@nextui-org/button";
import { TbExternalLink, TbLogin2 } from "react-icons/tb";
import { useSession } from "next-auth/react";

export const Navbar =  () => {
  const { data: session, status } = useSession();
  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      isBordered
      className="drop-shadow-sm"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Taskify</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex gap-2" >
          {!session?.user ? (
            <Button
              as={Link}
              href={`/sign-in`}
              color="default"
              variant="solid"
              size="sm"
              className="flex font-semibold"
            >
              Sign In
              <TbLogin2 size={20} />
            </Button>
          ) : null}

          <Button
            as={Link}
            href="/sign-up"
            color="primary"
            variant="ghost"
            size="sm"
            className="items-center hidden sm:flex "
          >
            Get Taskify for free
            <TbExternalLink size={20} />
          </Button>

          <ThemeSwitch  />
        </NavbarItem>
        {session?.user ? <UserAccountNav user={session.user} /> : null}
      </NavbarContent>
    </NextUINavbar>
  );
};
