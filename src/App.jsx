// eslint-disable-next-line no-unused-vars
import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Login from "./Components/Auth/Login";
import Register from "./Components/auth/Register";
import Navigation from "./Components/Common/Navigation";
import Client from "./Components/layout/Client";
import AuthGuard from './Components/Auth/AuthGard'; // Correct the import path
import avatarImage from '/src/resources/dist/img/LOGO_TT_.png';
import Employees from "./Components/layout/Employees";
import Invoices from "./Components/layout/invoices";


const App = () => {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <div className="preloader flex-column justify-content-center align-items-center">
                    <img
                        className="animation__shake"
                        src={avatarImage}
                        height={100}
                        width={100}
                    />
                </div>
                <Routes>
                    <Route path="/employees" element={<Employees/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route
                        path="/navigation"
                        element={
                            <AuthGuard>
                                <Navigation/>
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/client"
                        element={
                            <AuthGuard>
                                <Client/>
                            </AuthGuard>
                        }
                    />
                    <Route exact path="/client/:clientId/invoices"
                           element={
                               <AuthGuard>
                                   <Invoices/>
                               </AuthGuard>
                           }/>


                    <Route path="/" element={<Navigate to="/login"/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
