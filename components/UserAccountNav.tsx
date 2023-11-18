"use client";

import { Button } from "@nextui-org/button";
import { NavbarItem } from "@nextui-org/navbar";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <NavbarItem className="hidden md:flex">
      <Button
        className="text-sm font-normal text-default-600 bg-default-100"
        onClick={(event) => {
          event.preventDefault();
          signOut({
            callbackUrl: `${window.location.origin}/sign-in`,
          });
        }}
        startContent={<TbLogout className="text-danger" />}
        variant="flat"
      >
        Sign Out
      </Button>
    </NavbarItem>
  );
}
