"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Input,
  CardFooter,
  Button,
  Divider,
  Checkbox,
} from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      console.log("error");

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md px-2 py-4 w-96" shadow="lg">
      <CardHeader className="flex-col items-center justify-center px-4 pt-2 pb-5">
        <h4 className="font-bold text-center text-large">Login Form</h4>
      </CardHeader>
      <Divider />
      <form>
        <CardBody className="py-5 overflow-visible gap-y-5">
          <Input type="email" label="Email" isRequired size="sm" />
          <Input type="password" label="Password" isRequired size="sm" />
          <Checkbox isRequired size="sm">
            Remember Me
          </Checkbox>
        </CardBody>
        <CardFooter>
          <div className="flex flex-col w-full gap-y-3">
            <div className="flex gap-x-3">
              <Button
                color="default"
                variant="bordered"
                startContent={isLoading ? null : <FcGoogle size={20} />}
                onClick={loginWithGoogle}
                disabled={isLoading}
              >
                Google
              </Button>
              <Button
                color="default"
                variant="bordered"
                startContent={<BsGithub size={20} />}
              >
                Github
              </Button>
              <Button
                color="default"
                variant="bordered"
                startContent={<FaSquareXTwitter size={20} />}
              >
                Twitter
              </Button>
            </div>
            <Button type="submit" color="primary" className="w-full mt-3">
              Submit
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
