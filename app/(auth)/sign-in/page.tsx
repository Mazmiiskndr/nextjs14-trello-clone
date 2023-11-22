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
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ImSpinner2 } from "react-icons/im";
import { z } from "zod";
import { redirect } from "next/dist/server/api-utils";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setFormError(null);

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const values = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const loginSchema = z.object({
        email: z.string().email({ message: "Invalid email format" }),
        password: z.string().min(1, { message: "Password is required" }),
      });

      // Proses login dengan credentials
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        // callbackUrl: `${window.location.origin}`,
      });

      if (result?.error) {
        setFormError(result.error);
      }
    } catch (error: any) {
      console.log(error);

      if (error instanceof z.ZodError) {
        const errorMessages = Object.values(error.flatten().fieldErrors)
          .flat()
          .join(", ");
        setFormError(errorMessages);
      }
    } finally {
      setIsLoading(false);
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
                    isLoading ? (
                      <ImSpinner2 size={20} />
                    ) : (
                      <FcGoogle size={20} />
                    )
                  }
                  onClick={loginWithGoogle}
                  isDisabled={isLoading}
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
                isLoading={isLoading}
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
