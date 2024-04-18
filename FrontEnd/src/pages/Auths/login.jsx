import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import {
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { login } from "../../api/auth";
// import { setToken } from "../../../features/redux/slices/user/tokenSlice";
// import {
//   login,
//   loginThroughEmailCheck,
// } from "../../../api/apiConnections/User/authConnections";
// import { SetUserInfo } from "../../../features/redux/slices/user/homeSlice";
// import { useState } from "react";
// import { POST_URL } from "../../../constants/constants";
// import { auth, provider } from "../../../constants/firebaseAuth";
// import { signInWithPopup } from "firebase/auth";
// import UnameModal from "./UnameModal";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setuserData] = useState({
    name: "",
    email: "",
  });





  const submitHandler = async (userData) => {
    console.log("data of user login = ", userData);
    let response = await login(userData);
    console.log("data of user login = ", response);
    // if (response.status === "success") {
    //   const token = response.userInfo.token;
    //   const user = response.userInfo.user;
    //   console.log(token);
    //   dispatch(setToken(token));
    //   dispatch(SetUserInfo(user));
    //   navigate("/");
    // } else {
    //   console.log("signUp failed");
    // }
  };

  const formik = useFormik({
    initialValues: {
        loginCredential: "",
      password: "",
    },
    validationSchema: Yup.object({
        loginCredential: Yup.string()
        .max(20, "Must be less than 20 characters")
        .required("Required"),
      password: Yup.string()
        // .max(20, "Must be less than 20 characters")
        // .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      submitHandler(values);
      setSubmitting(false);
    },
  });

  return (
    <div className="flex justify-center">
      <div className="flex w-100 mt-16 pt-12 items-center justify-center flex-col border-2 border-gray-400 rounded-xl">
        <div>
          <div className="flex justify-center gap-2">
            <div className="w-16 h-16 ">
              <img
                className="border rounded-xl"
                // src={POST_URL + "logo/nexuswhite.jpg"}
                alt="logo"
              />
            </div>
            <div className="flex items-center">
              <p className="text-4xl font-bold font-cursive text-black">
                Realmz
              </p>
            </div>
          </div>
          <ToastContainer position="bottom-left" />
        </div>
        <div className="flex justify-center pt-8">
          <form onSubmit={formik.handleSubmit} className=" ">
            <Typography variant="h3" color="blue" className="text-center ">
              Login
            </Typography>

            <CardBody className="flex flex-col gap-2">
              <Input
                type="text"
                label="User Name"
                size="lg"
                id="loginCredential"
                {...formik.getFieldProps("loginCredential")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {formik.touched.loginCredential && formik.errors.loginCredential
                  ? formik.errors.loginCredential
                  : null}
              </p>

              <Input
                type="password"
                label="Password"
                size="lg"
                id="password"
                {...formik.getFieldProps("password")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </p>
              {/* <div className="-ml-2.5"> */}
              {/* <Checkbox label="Remember Me" /> */}
              {/* </div> */}
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" color="blue" variant="gradient" fullWidth>
                Sign In
              </Button>

              
            </CardFooter>
            <Typography
              color="gray"
              className="m-6 text-center font-normal lg:w-64"
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign up
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
