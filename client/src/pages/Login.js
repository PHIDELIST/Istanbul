import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export default function Login() {
    const history = useHistory();
    const [loginError, setLoginError] = useState("");

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        const { email, password } = values;
        const userData = {
            email,
            password,
        };

        try {
            const response = await axios.post("http://localhost:5066/auth/login", userData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                const { token,profile } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("profile", JSON.stringify(profile)); 

                // Decode the token to get the role
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.role;

                // Redirect based on role
                if (userRole === "admin") {
                    history.push("/admin");
                } else {
                    history.push("/");
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
            setLoginError(error.response?.data?.error || "Login failed");
        }

        setSubmitting(false);
    };

    return (
        <main className="w-full max-w-md mx-auto p-6">
            {loginError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{loginError}</span>
                </div>
            )}
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                            Log in
                        </h1>
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

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 px-4 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-600"
                                >
                                    Log in
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </main>
    );
}
