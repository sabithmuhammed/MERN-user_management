import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AdminLoginScreen from "./screens/AdminLoginScreen.jsx";
import AdminWrapper from "./components/AdminWrapper.jsx";
import AdminHomeScreen from "./screens/AdminHomeScreen.jsx";
import AdminUserEditScreen from "./screens/AdminUserEditScreen.jsx";
import AdminAddUserScreen from "./screens/AdminAddUserScreen.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />}>
                <Route path="" element={<PrivateRoute />}>
                    <Route index path="/" element={<HomeScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                </Route>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
            </Route>
            <Route path="/admin" element={<AdminWrapper></AdminWrapper>}>
                <Route path="" index element={<AdminLoginScreen />}></Route>
                <Route element={<AdminPrivateRoute></AdminPrivateRoute>}>
                    <Route path="home" element={<AdminHomeScreen />}></Route>
                    <Route
                        path="update/:userId"
                        element={<AdminUserEditScreen />}
                    ></Route>
                    <Route
                        path="add-user"
                        element={<AdminAddUserScreen />}
                    ></Route>
                </Route>
            </Route>
        </>
    )
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
);
