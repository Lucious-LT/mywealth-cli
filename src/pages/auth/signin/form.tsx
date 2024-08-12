import { Input, Button } from "@material-tailwind/react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Form, Formik, type FormikValues } from "formik";
import { signIn } from "next-auth/react";
import { useState } from "react";
import * as yup from "yup";

const SignInForm = () => {
  const signInFormValidationSchema = yup.object({
    username: yup.string().required("Required"),
    password: yup.string().min(6),
  });

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)

  const formValues = { username: "", password: "" };

  const submitForm = async ({ username, password }: FormikValues) => {
    setLoading(true)
    await signIn("credentials", {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      username,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    })
    setLoading(false)
  }

  return (
    <>
      <Formik
        initialValues={formValues}
        validationSchema={signInFormValidationSchema}
        onSubmit={submitForm}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form className="mb-2 mt-6 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div>
                <label className="text-white text-sm">Username</label>
                <Input
                  size="lg"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  crossOrigin="true"
                />
              </div>
              <div>
                <label className="text-white text-sm">Password</label>
                <Input
                  size="lg"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  icon={show ? <FaEyeSlash className="cursor-pointer" onClick={() => setShow(false)} /> : <IoEyeSharp className="cursor-pointer" onClick={() => setShow(true)} />}
                  labelProps={{
                    className: "hidden",
                  }}
                  type={show ? "text" : "password"}
                  className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                  crossOrigin="true"
                />
              </div>
            </div>
            <Button
              placeholder=""
              type="submit"
              disabled={loading}
              className="mt-8 cursor-pointer bg-primary text-xs font-semibold uppercase tracking-wider text-white transition duration-300 ease-in-out py-3.5"
              fullWidth
            >
              sign in
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default SignInForm;
