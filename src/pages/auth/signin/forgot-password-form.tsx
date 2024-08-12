import { Button, Input } from "@material-tailwind/react";
import { Form, Formik, type FormikValues } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { getTenantId, getTenantUrl } from "~/components/util/tenant";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import customToast from "~/components/ui/custom-toast";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const forgotPasswordFormValidationSchema = yup.object({
    username: yup.string().matches(/^[a-zA-Z0-9]+$/, "Username cannot include invalid characters").min(6, "Username cannot be less than 5 characters").max(50, "Username cannot be more than 50 characters").required("Valid username required")
  });

  const [loading, setLoading] = useState(false);
  const { mutate: generateResetToken } = api.profile.generatePasswordResetLink.useMutation();
  const formValues = { username: "" };
  const router = useRouter();

  const submitForm = async ({ username }: FormikValues) => {
    const tenantId = getTenantId();
    const tenantUrl = getTenantUrl();

    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    generateResetToken({ username, tenantId, tenantUrl }, {
      onSuccess(data) {
        if (!data) {
          toast.error("An error occurred when generating the password reset link. Please try again later.");
          return;
        }
        customToast({
          title: "Password Reset",
          message: "A password reset token has been generated, check your email for further instructions",
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
  };

  return (
    <>
      <Formik
        initialValues={formValues}
        validationSchema={forgotPasswordFormValidationSchema}
        onSubmit={submitForm}
      >
        {({ values, touched, errors, handleChange, handleBlur }) => (
          <Form className="mb-2 mt-6 w-80 mx-auto max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-8">
              <div>
                <label className="text-white text-sm">Username</label>
                <Input
                  size="lg"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="!border-1 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  error={!!touched.username && !!errors.username}
                  labelProps={{
                    className: "hidden"
                  }}
                  crossOrigin="true"
                />
                {(!!touched.username && !!errors.username) &&
                  <span className="text-sm font-light text-error">{errors.username}</span>}
              </div>
            </div>
            <Button
              placeholder=""
              type="submit"
              disabled={loading}
              className="mt-8 cursor-pointer bg-primary text-xs font-semibold uppercase tracking-wider text-white transition duration-300 ease-in-out py-3.5"
              fullWidth
            >
              Send Reset Link
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default ForgotPasswordForm;
