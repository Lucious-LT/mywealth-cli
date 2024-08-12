/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Form, Formik, type FormikHelpers, type FormikValues } from "formik";
import ProfileLayout from "~/components/layout/page/account-setting-layout";
import { api } from "~/utils/api";
import * as yup from "yup"
import { Button, Input, Typography } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import customToast from "~/components/ui/custom-toast";
import { WhereYouAreLogged } from "~/components/cards/whereYouAreLogged";
import { whereYouAreLoggedInData } from "~/components/data/where-you-are-logged-in-data";

const Security = () => {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;
  const { mutate: changePassword } = api.crm.changeContactPassword.useMutation()
  const { data: profile } = api.profile.findByClientId.useQuery({ clientId: user?.clientId!}, { enabled: sessionData != null })

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  interface changePasswordValues {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }

  const initialChangePasswordValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  }

  const validateChangePassword = yup.object().shape({
    oldPassword: yup.string().required("Required"),
    newPassword: yup.string().required("Required").matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character')
      .min(8, 'Must be at least 8 characters long')
      .max(20, 'Cannot be longer than 20 characters'),
    confirmPassword: yup.string().label('confirm password').required("Required").oneOf([yup.ref('newPassword')], 'Passwords must match')
  })

  const handleChangePasswordSubmit = ({ oldPassword, newPassword }: FormikValues, { resetForm }: FormikHelpers<changePasswordValues>) => {
    changePassword({ username: profile?.contact?.[0]?.username!, oldPassword, newPassword }, {
      onSuccess() {
        customToast({
          title: "Update password",
          message: "Password updated successfully!!",
          variant: "success"
        })
        resetForm()
        setShowNewPassword(false)
        setShowOldPassword(false)
      },
      onError(error) {
        customToast({
          title: "Update password",
          message: error.message,
          variant: "error"
        })
      },
    })
  }

  return (
    <>
      <Formik
        initialValues={initialChangePasswordValues}
        validationSchema={validateChangePassword}
        onSubmit={handleChangePasswordSubmit}
      >
        {({
          handleChange,
          values,
          handleBlur,
          errors,
          touched
        }) => (
          <Form>
            <Typography variant="h4" className="my-3" color="gray" placeholder="">
              Change Password
              <Typography variant="small" className="mb-6 mt-0" color="gray" placeholder="">
                Enter your current and new password to reset your password
              </Typography>
            </Typography>
            <div className="w-1/3">
              <div className="grid grid-cols-1 gap-6">
                <div className="grid-cols-1">
                  <Input
                    crossOrigin="true"
                    label="Old password"
                    name="oldPassword"
                    color="blue"
                    type={showOldPassword ? "text" : "password"}
                    value={values.oldPassword}
                    icon={showOldPassword ? <FaEyeSlash className="cursor-pointer" onClick={() => setShowOldPassword(false)} /> : <IoEyeSharp className="cursor-pointer" onClick={() => setShowOldPassword(true)} />}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    error={!!touched.oldPassword && !!errors.oldPassword}
                  />
                  <span className="text-xs text-red-400">
                    {touched.oldPassword && errors.oldPassword}
                  </span>
                </div>
                <div className="grid-cols-1">
                  <Input
                    crossOrigin="true"
                    label="New password"
                    name="newPassword"
                    color="blue"
                    type={showNewPassword ? "text" : "password"}
                    value={values.newPassword}
                    icon={showNewPassword ? <FaEyeSlash className="cursor-pointer" onClick={() => setShowNewPassword(false)} /> : <IoEyeSharp className="cursor-pointer" onClick={() => setShowNewPassword(true)} />}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    error={!!touched.newPassword && !!errors.newPassword}
                  />
                  <span className="text-xs text-red-400">
                    {touched.newPassword && errors.newPassword}
                  </span>
                </div>
                <div className="grid-cols-1">
                  <Input
                    crossOrigin="true"
                    label="Confirm password"
                    name="confirmPassword"
                    color="blue"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="outline-none focus:ring-0 focus:ring-offset-0"
                    error={!!touched.confirmPassword && !!errors.confirmPassword}
                  />
                  <span className="text-xs text-red-400">
                    {touched.confirmPassword && errors.confirmPassword}
                  </span>
                </div>
              </div>
              <div className="mt-6 float-right">
                <Button type="submit" placeholder="" className="bg-primary py-2.5 capitalize text-white hover:bg-gray-200 hover:text-primary border-[1px] border-primary rounded-md">Save</Button>
              </div>
              {/* <div className="mt-6 mr-2 float-right"> */}
              {/*   <Button type="button" placeholder="" className="bg-primary py-2.5 capitalize text-white hover:bg-gray-200 hover:text-primary border-[1px] border-primary rounded-md">Reset</Button> */}
              {/* </div> */}
            </div>
          </Form>
        )}
      </Formik>
      <div className="clear-right w-full mt-36">
        <Typography variant="h4" className="my-3" color="gray" placeholder="">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Where you're signed in
          <Typography variant="small" className="mb-6 mt-0" color="gray" placeholder="">
            You are signed in to your account on these devices.
          </Typography>
        </Typography>
        <WhereYouAreLogged data={whereYouAreLoggedInData} />
      </div>
    </>
  );
};

Security.getLayout = function(page: any) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
export default Security;
