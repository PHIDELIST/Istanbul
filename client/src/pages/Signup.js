import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils";

export default function Signup() {
    const history = useHistory();
    const [signupSuccess, setSignupSuccess] = useState("");
    const [signupError, setSignupError] = useState("");

    const initialValues = {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match")
            .required("Required"),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        const { email, firstName, lastName, password, confirmPassword } = values;
        const userData = {
            email,
            firstName,
            lastName,
            password,
            confirmPassword
        };

        try {
            const response = await axios.post(`${backendUrl}/auth/register`, userData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                setSignupSuccess("Sign up successful!");
                setTimeout(() => history.push("/login"), 1000);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setSignupError(error.response?.data?.error || "Signup failed");
        }

        setSubmitting(false);
    };

    return (
        <main className="w-full max-w-md mx-auto p-6">
            {signupSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{signupSuccess}</span>
                </div>
            )}
            {signupError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{signupError}</span>
                </div>
            )}
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                            Sign up
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-600 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="mt-5">
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />

                                <Field
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />

                                <Field
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />

                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />

                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 px-4 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-600"
                                >
                                    Sign up
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </main>
    );
}
