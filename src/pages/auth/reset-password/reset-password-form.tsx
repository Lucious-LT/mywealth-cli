import { Input, Button } from "@material-tailwind/react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Form, Formik, type FormikValues } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { api } from "~/utils/api";
import { getTenantId } from "~/components/util/tenant";
import { toast } from "react-hot-toast";
import customToast from "~/components/ui/custom-toast";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const signInFormValidationSchema = yup.object({
    password: yup.string().required("Required").matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain at least one special character')
      .min(8, 'Must be at least 8 characters long')
      .max(20, 'Cannot be longer than 20 characters'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match').required("Required"),
  });

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const formValues = { password: "", confirmPassword: "" };
  const { mutate: resetPassword } = api.profile.resetPasswordWithToken.useMutation();
  const router = useRouter();


  // eslint-disable-next-line @typescript-eslint/require-await
  const submitForm = async ({ password, confirmPassword }: FormikValues) => {
    //Get the token request parameter from the url
    const tokenId  = new URLSearchParams(window.location.search).get("token");

    //Get the tenant id
    const tenantId =  getTenantId();

    //Validate that the password and confirm password fields are the same
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if(!tokenId || !tokenId.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
      customToast({
        title: "Invalid Token",
        message: "The token provided is invalid. Please request a new password reset link.",
        variant: "error"
      });
      void router.push("/auth/signin");
      return;
    }

    setLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    resetPassword({ password: password, tenantId: tenantId, tokenId: tokenId }, {
      onSuccess(data) {
        if (!data) {
          toast.error("An error occurred while resetting your password. Please try again later.");
         // return;
        }
        customToast({
          title: "Password Reset",
          message: "Your password has been successfully reset. You can now sign in with your new password.",
          variant: "success"
        });
        void router.push("/auth/signin");
        return;
      },
      onError(error) {
        toast.error(error.message);
      }
    });

    setLoading(false);
  }

  return (
    <>
      <Formik
        initialValues={formValues}
        validationSchema={signInFormValidationSchema}
        onSubmit={submitForm}
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form className="mb-2 mt-6 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div>
                <label className="text-white text-sm">Password</label>
                <Input
                  size="lg"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={show ? <FaEyeSlash className="cursor-pointer" onClick={() => setShow(false)} /> : <IoEyeSharp className="cursor-pointer" onClick={() => setShow(true)} />}
                  className="!border-1 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  error={!!touched.password && !!errors.password}
                  labelProps={{
                    className: "hidden",
                  }}
                  type={show ? "text" : "password"}
                  crossOrigin="true"
                />
                {(!!touched.password && !!errors.password) && <span className="text-sm font-light text-error">{errors.password}</span>}
              </div>
              <div>
                <label className="text-white text-sm">Confirm Password</label>
                <Input
                  size="lg"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={showConfirm ? <FaEyeSlash className="cursor-pointer" onClick={() => setShowConfirm(false)} /> : <IoEyeSharp className="cursor-pointer" onClick={() => setShowConfirm(true)} />}
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  labelProps={{
                    className: "hidden",
                  }}
                  type={showConfirm ? "text" : "password"}
                  className="!border-1 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  crossOrigin="true"
                />
                {(!!touched.confirmPassword && !!errors.confirmPassword) && <span className="text-sm font-light text-error">{errors.confirmPassword}</span>}
              </div>
            </div>
            <Button
              placeholder=""
              type="submit"
              disabled={loading}
              className="mt-8 cursor-pointer bg-primary text-xs font-semibold uppercase tracking-wider text-white transition duration-300 ease-in-out py-3.5"
              fullWidth
            >
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
