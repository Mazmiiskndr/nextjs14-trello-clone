"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  CardFooter,
  Button,
  Divider,
  Link,
} from "@nextui-org/react";
import { SignUpFormValues } from "@/types/formTypes";
import { signUpValidationSchema } from "@/validations/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useLoading from "@/hooks/useLoading";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { createUserAction } from "@/actions/UserActions";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpValidationSchema),
    mode: "onChange",
  });
  const {
    isLoading: isLoading,
    startLoading: startLoading,
    stopLoading: stopLoading,
  } = useLoading();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (values: SignUpFormValues) => {
    startLoading();
    setFormError(null);

    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("name", values.name);

      const actionResponse = await createUserAction(formData);

      if (actionResponse.error) {
        throw new Error(actionResponse.error);
      }

      console.log("User created successfully", actionResponse.user);
      reset();
      router.push("/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("An unexpected error occurred");
      }
    } finally {
      stopLoading();
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
          <h4 className="font-bold text-center text-large">Sign Up Form</h4>
        </CardHeader>
        <Divider />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="w-full py-5 overflow-visible">
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
                label="Name"
                size="sm"
                autoFocus={true}
                variant="bordered"
                isRequired
                fullWidth={true}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                {...register("name")}
              />
            </div>
            <div className="flex flex-col items-start mt-5">
              <Input
                type="email"
                label="Email"
                size="sm"
                variant="bordered"
                isRequired
                fullWidth={true}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                {...register("email")}
              />
            </div>
            <div className="flex flex-col items-start mt-5">
              <Input
                type="password"
                variant="bordered"
                label="Password"
                size="sm"
                isRequired
                fullWidth={true}
                {...register("password")}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
            </div>
            <div className="flex flex-col items-start mt-5">
              <Input
                type="password"
                variant="bordered"
                label="Confirm Password"
                size="sm"
                isRequired
                fullWidth={true}
                {...register("confirmPassword")}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
              />
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex flex-col w-full gap-y-3">
              <Button
                type="submit"
                color="primary"
                className={`w-full  mb-3`}
                isLoading={isLoading}
              >
                Register
              </Button>
              <Divider />
              <div className="flex items-center justify-center gap-x-1">
                <span className="text-sm">Already have an account?</span>
                <Link href="/sign-in" className="text-sm hover:underline">
                  Sign In
                </Link>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default SignUpPage;
