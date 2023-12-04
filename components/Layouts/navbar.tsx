import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import { TwitterIcon, GithubIcon, DiscordIcon } from "@/components/icons";

import { Logo } from "@/components/icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { UserAccountNav } from "../UserAccountNav";
import { Button } from "@nextui-org/button";
import { TbExternalLink, TbLogin2 } from "react-icons/tb";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

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
        <NavbarItem className="flex gap-2">
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

      {/* <NavbarContent className="pl-4 sm:hidden basis-1" justify="end">
        
        <ThemeSwitch />
      </NavbarContent> */}
    </NextUINavbar>
  );
};
