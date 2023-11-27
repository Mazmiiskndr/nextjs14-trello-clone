"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  NavbarItem,
  DropdownSection,
} from "@nextui-org/react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import { Avatar } from "@nextui-org/react";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <NavbarItem className="hidden md:flex">
      <div className="flex flex-row items-center gap-x-2">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              size="sm"
              radius="lg"
              src={(user?.image as string) || ""}
              className="transition-all duration-200 ease-in-out cursor-pointer hover:scale-95"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownSection title="Actions" showDivider>
              <DropdownItem key="profile" className="gap-2 h-14">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="new">Profile</DropdownItem>
              <DropdownItem key="copy">Forgot Password</DropdownItem>
              <DropdownItem key="edit">Change Password</DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem
                key="sign-out"
                className="text-danger"
                color="danger"
                onClick={(event) => {
                  event.preventDefault();
                  signOut({
                    callbackUrl: `${window.location.origin}/sign-in`,
                  });
                }}
                startContent={<TbLogout size={20} />}
              >
                <p className="font-semibold">Sign Out</p>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </NavbarItem>
  );
}
