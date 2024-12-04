import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const Login = () => {
    const { userLogin, setUser } = useContext(AuthContext);
    const [error, setError] = useState({});
    const emailRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
                setError({ ...error, login: err.code });
            });
    };

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
                setError({ ...error, google: err.message });
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl p-10 mb-6">
                <h1 className="text-2xl font-bold text-center pt-2">Login to account</h1>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            ref={emailRef}
                            placeholder="email"
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            required
                        />
                        {error.login && (
                            <label className="label text-sm text-red-600">{error.login}</label>
                        )}
                        <label className="label">
                            <Link
                                to={`/auth/forgot-password?email=${emailRef.current?.value || ""}`}
                                className="label-text-alt link link-hover"
                            >
                                Forgot password?
                            </Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[rgba(164,132,63,0.837)] hover:bg-[rgba(214,180,106,0.837)] text-white">Login</button>
                    </div>
                </form>
                <div className="divider">OR</div>
                <div className="form-control">
                    <button onClick={handleGoogleSignIn} className="btn btn-outline bg-[rgba(164,132,63,0.837)] hover:bg-[rgba(214,180,106,0.837)] text-white">
                        Continue with Google
                    </button>
                </div>
                <p className="text-center font-semibold mt-4">
                    Don't have an account?{" "}
                    <Link className="text-red-500" to="/auth/register">
                        Register
                    </Link>
                </p>
                {error.google && <p className="text-sm text-red-500 text-center mt-2">{error.google}</p>}
            </div>
        </div>
    );
};

export default Login;
