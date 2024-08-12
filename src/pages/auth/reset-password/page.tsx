import { Card, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { api } from "~/utils/api";
import { getTenantId } from "~/components/util/tenant";
import React, { useEffect, useState } from "react";
import ResetPasswordForm from "./reset-password-form";
import { useRouter } from "next/navigation";


const ResetPasswordPage = () => {
  const [message, setMessage] = useState<{ error?: string, success?: string }>({ error: "", success: "" })
  const { data: logo } = api.profile.getTenantLogo.useQuery({ tenantId: getTenantId() }, { cacheTime: 3600 });
  const router = useRouter();

  let responseMessageTimeout: NodeJS.Timeout;

  // Set timeout for error or success messages
  useEffect(() => {
    if (message.error != "" || message.success != "") {
      responseMessageTimeout = setTimeout(
        () => setMessage({ error: "", success: "" }),
        8000
      );
    }
    return () => {
      if (responseMessageTimeout) clearTimeout(responseMessageTimeout);
    };
  }, [message]);

  const  navigateToHome = () => {
    void router.push("/auth/signin");
  }

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
          <Card color="transparent" className="flex flex-col items-center justify-center" shadow={false} placeholder="">
            <Typography variant="h1" className="text-center" color="white" placeholder="">
              Reset password
            </Typography>

            <Typography color="gray" className="font-normal text-[#90a1b4] text-center" placeholder="">
              Please choose a new password below to reset your password
            </Typography>
            <ResetPasswordForm />
            <Typography
              className="mt-4 text-center text-[#90a1b4] font-normal"
              placeholder={undefined}>
            Return to{" "}
            <span onClick={() => navigateToHome} className="font-medium cursor-pointer text-[#b1bfc2] hover:text-white ml-1">Sign in</span>
            </Typography>
          </Card>
          <div
            className="absolute -bottom-32 -left-40 h-80 w-80 rounded-full border-2 border-t-4 border-opacity-30 shadow-md"></div>
          <div
            className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full border-2 border-t-4 border-opacity-30 shadow-md"></div>
        </div>
      </div>
    </>
  );
};
export default ResetPasswordPage;
