import axios from "axios";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const SERVER_URL = "http://localhost:8000/api/";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const login = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}login`, {
                email: email,
                password: password,
            });
            navigate("/navigation")
            // Assuming your server returns a token on successful login
            const token = response["data"]["authorisation"]["token"];
            const user = response["data"];
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));


            // Redirect or perform any other action after successful login
        } catch (error) {
            console.error(
                "Login failed:",
                error.response ? error.response.data : error.message
            );
            await Swal.fire(
                "Error!",
                "Please verify your email or password",
            );

        }
    };

    return (
        <div className="wrapper login-page ">
            <div className="login-box">
                <div className="login-logo">
                    <b>Tunisie Telecom </b>
                    <img width={100} src="/src/resources/dist/img/LOGO_TT_.png" alt=""/>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <div className="input-group mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"/>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember"/>
                                    <label htmlFor="remember">Remember Me</label>
                                </div>
                            </div>

                            <div className="col-4">
                                <button
                                    type="button"
                                    onClick={login}
                                    className="btn btn-primary btn-block"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>
                        <p className="mb-0">
                            <Link to="/register" className="text-center">
                                Register a new membership
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
