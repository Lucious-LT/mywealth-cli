import { Card, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ErrorDisplay, SuccessDisplay } from "~/components/ui/error-display";
import { api } from "~/utils/api";
import { getTenantId } from "~/components/util/tenant";
import React, { useEffect, useState } from "react";
import SignInForm from "~/pages/auth/signin/form";
import ForgotPasswordForm from "./forgot-password-form";


const SignInPage = () => {
  const searchParam = useSearchParams();
  const [error, setError] = useState(searchParam.get("error"));
  const [message, setMessage] = useState<{ error?: string, success?: string }>({ error: "", success: "" });
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const { data: logo } = api.profile.getTenantLogo.useQuery({ tenantId: getTenantId() }, { cacheTime: 3600 });
  const handleToggleForgotPassword = () => setShowForgotPassword(!showForgotPassword);


  let errorTimeout: NodeJS.Timeout;
  let responseMessageTimeout: NodeJS.Timeout;

  // Set timeout for error or success messages
  useEffect(() => {
    if (error !== "") {
      errorTimeout = setTimeout(
        () => setError(""),
        8000
      );
    }
    if (message.error != "" || message.success != "") {
      responseMessageTimeout = setTimeout(
        () => setMessage({ error: "", success: "" }),
        8000
      );
    }
    return () => {
      if (responseMessageTimeout) clearTimeout(responseMessageTimeout);
      if (errorTimeout) clearTimeout(errorTimeout);
    };
  }, [message]);




  return (
    <>
      <div className="h-screen font-nun md:flex">
        <div className=" hidden w-1/2 items-center justify-around  bg-white md:flex">
          <div>
            <div className="flex items-center space-x-4">
              <Image
                src={logo != null ? logo : "/logo.svg"}
                alt="MyWealth Inc."
                width={70}
                height={70}
              />
              <h1 className=" text-4xl font-bold text-gray-900">
                Online Account Access
              </h1>
            </div>

          </div>
        </div>
        <div
          className="relative flex items-center justify-center overflow-hidden bg-[#1E293B] py-10 shadow-md md:w-1/2">
          {!showForgotPassword ?
            <Card color="transparent" className="flex flex-col justify-center" shadow={false} placeholder="">
              <Typography variant="h1" className="text-center" color="white" placeholder="">
                Welcome back!
              </Typography>
              <Typography
                className="mt-4 text-center text-[#90a1b4] font-normal"
                placeholder={undefined}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Don't have an account?{" "}
                <Link href="/auth/signup" className="font-medium text-[#b1bfc2] hover:text-white ml-1">
                  Sign up
                </Link>
              </Typography>
              {!!error && <ErrorDisplay className="text-center">Authentication failed</ErrorDisplay>}
              <SignInForm />

              <span className="text-center mt-2 text-[#b1bfc2]  hover:text-white cursor-pointer"
                    onClick={() => setShowForgotPassword(prev => !prev)}>Forgot password?</span>
            </Card> : <Card color="transparent" shadow={false} placeholder="">
              <Typography variant="h1" className="text-center" color="white" placeholder="">
                Forgot password?
              </Typography>
              <Typography color="gray" className="font-normal text-[#90a1b4] text-center" placeholder="">
                Please enter your username below to reset your password
              </Typography>
              {message.error ? (
                <ErrorDisplay>{message.error}</ErrorDisplay>
              ) : message.success ? (
                <SuccessDisplay>{message.success}</SuccessDisplay>) : ""}
              <ForgotPasswordForm />
              <Typography
                className="mt-4 text-center text-[#90a1b4] font-normal"
                placeholder={undefined}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Return to{" "}
                <span onClick={() => handleToggleForgotPassword()}
                      className="font-medium cursor-pointer text-[#b1bfc2] hover:text-white ml-1">
                Sign in
              </span>
              </Typography>
            </Card>}
          <div
            className="absolute -bottom-32 -left-40 h-80 w-80 rounded-full border-2 border-t-4 border-opacity-30 shadow-md"></div>
          <div
            className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full border-2 border-t-4 border-opacity-30 shadow-md"></div>
        </div>
      </div>
    </>
  );
};
export default SignInPage;
