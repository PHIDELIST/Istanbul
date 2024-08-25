import React from "react";
import { Route, Redirect } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const token = localStorage.getItem("token");
    let isAuthenticated = false;
    let userRole = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            isAuthenticated = Boolean(decodedToken);
            userRole = decodedToken.role;
           
        } catch (e) {
            isAuthenticated = false;
        }
    }
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated && allowedRoles.includes(userRole) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
