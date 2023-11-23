"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  CardFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ImSpinner2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import useLoading from "@/hooks/useLoading";
import { LoginFormValues } from "@/types/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "@/validations/loginValidation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
  });
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

  const onSubmit = async (values: LoginFormValues) => {
    startCredentialsLoading();
    setFormError(null);

    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      result?.error ? setFormError(result.error) : router.push("/");
    } catch (error: any) {
      setFormError(error.message || "Something went wrong!");
    } finally {
      stopCredentialsLoading();
    }
  };

  const handleCloseError = () => {
    setFormError(null);
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="py-5 overflow-visible ">
            {formError && (
              <div className="flex items-center w-full px-3 py-2 mb-3 text-sm bg-[#f8d7da] rounded-lg justify-between">
                <p className="text-[#721c24] font-medium">{formError}</p>
                <FaTimes
                  className="text-[#721c24] cursor-pointer"
                  onClick={handleCloseError}
                />
              </div>
            )}
            <div className="flex flex-col items-start">
              <Input
                type="text"
                label="Email"
                size="sm"
                variant="bordered"
                isRequired
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                {...register("email")}
              />
            </div>
            <div className="flex flex-col items-start mt-5">
              <Input
                type="password"
                variant="bordered"
                {...register("password")}
                label="Password"
                size="sm"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                isRequired
              />
            </div>
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
                className={`w-full mt-3 ${
                  isLoadingCredentials ? "cursor-progress" : ""
                }`}
                isLoading={isLoadingCredentials}
              >
                Sign In
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
