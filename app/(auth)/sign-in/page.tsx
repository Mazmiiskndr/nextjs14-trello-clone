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
import { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ImSpinner2 } from "react-icons/im";
import { z } from "zod";
import { useRouter } from "next/navigation";
import useLoading from "@/hooks/useLoading";

export default function LoginPage() {
  const router = useRouter();
  const {
    isLoading: isLoadingGoogle,
    startLoading: startGoogleLoading,
    stopLoading: stopGoogleLoading,
  } = useLoading();
  const {
    isLoading: isLoadingCredentials,
    startLoading: startCredentialsLoading,
    stopLoading: stopCredentialsLoading,
  } = useLoading();
  const [formError, setFormError] = useState<string | null>(null);

  const loginWithGoogle = async () => {
    startGoogleLoading();

    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    } finally {
      stopGoogleLoading();
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    startCredentialsLoading();
    setFormError(null);

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const values = {
      redirect: false,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const result = await signIn("credentials", values);

      if (result?.error) {
        setFormError(result.error);
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      setFormError(error);
    } finally {
      stopCredentialsLoading();
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <Card
        className="flex flex-col items-center justify-center px-2 py-4 w-96"
        shadow="lg"
      >
        <CardHeader className="flex-col items-center justify-center px-4 pt-2 pb-5">
          <h4 className="font-bold text-center text-large">Login Form</h4>
        </CardHeader>
        <Divider />
        <form onSubmit={handleSubmit}>
          <CardBody className="py-5 overflow-visible gap-y-5">
            {formError && <p className="text-red-500">{formError}</p>}
            <Input
              type="email"
              name="email"
              label="Email"
              size="sm"
              isRequired
            />
            <Input
              type="password"
              name="password"
              label="Password"
              size="sm"
              isRequired
            />
          </CardBody>
          <CardFooter>
            <div className="flex flex-col w-full gap-y-3">
              <div className="flex gap-x-3">
                <Button
                  color="default"
                  variant="bordered"
                  startContent={
                    isLoadingGoogle ? (
                      <ImSpinner2 size={20} />
                    ) : (
                      <FcGoogle size={20} />
                    )
                  }
                  onClick={loginWithGoogle}
                  isDisabled={isLoadingGoogle}
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
              <Button
                type="submit"
                color="primary"
                className="w-full mt-3"
                isLoading={isLoadingCredentials}
              >
                Submit
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
