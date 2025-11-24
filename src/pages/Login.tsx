import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../store/api/authApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCredentials } from '../store/slices/authSlice';
import '../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/feed', { replace: true });
        }
    }, [isAuthenticated])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email || !password) {
            setErrorMessage('Please fill in all fields');
            return;
        }

        try {
            const result = await login({ email, password }).unwrap();

            dispatch(setCredentials({
                user: result.data,
                token: result.token!,
            }));

            navigate('/feed', { replace: true });
        } catch (error: any) {
            console.error('Login error:', error);
            setErrorMessage(error?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <section className="_social_login_wrapper _layout_main_wrapper">
            <div className="_shape_one">
                <img src="/assets/images/shape1.svg" alt="" className="_shape_img" />
                <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape" />
            </div>
            <div className="_shape_two">
                <img src="/assets/images/shape2.svg" alt="" className="_shape_img" />
                <img src="/assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
            </div>
            <div className="_shape_three">
                <img src="/assets/images/shape3.svg" alt="" className="_shape_img" />
                <img src="/assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
            </div>
            <div className="_social_login_wrap">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="_social_login_left">
                                <div className="_social_login_left_image">
                                    <img src="/assets/images/login.png" alt="Image" className="_left_img" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                            <div className="_social_login_content">
                                <div className="_social_login_left_logo _mar_b28">
                                    <img src="/assets/images/logo.svg" alt="Image" className="_left_logo" />
                                </div>
                                <p className="_social_login_content_para _mar_b8">Welcome back</p>
                                <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>
                                <button type="button" className="_social_login_content_btn _mar_b40">
                                    <img src="/assets/images/google.svg" alt="Image" className="_google_img" />
                                    <span>Or sign-in with google</span>
                                </button>
                                <div className="_social_login_content_bottom_txt _mar_b40">
                                    <span>Or</span>
                                </div>

                                {errorMessage && (
                                    <div style={{
                                        padding: '10px',
                                        marginBottom: '20px',
                                        backgroundColor: '#fee',
                                        color: '#c00',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}>
                                        {errorMessage}
                                    </div>
                                )}

                                <form className="_social_login_form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_login_form_input _mar_b14">
                                                <label className="_social_login_label _mar_b8">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control _social_login_input"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                            <div className="_social_login_form_input _mar_b14">
                                                <label className="_social_login_label _mar_b8">Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control _social_login_input"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                                            <div className="form-check _social_login_form_check">
                                                <input
                                                    className="form-check-input _social_login_form_check_input"
                                                    type="checkbox"
                                                    id="rememberMe"
                                                    checked={rememberMe}
                                                    onChange={(e) => setRememberMe(e.target.checked)}
                                                />
                                                <label className="form-check-label _social_login_form_check_label" htmlFor="rememberMe">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
                                            <div className="_social_login_form_left">
                                                <p className="_social_login_form_left_para">Forgot password?</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
                                            <div className="_social_login_form_btn _mar_t40 _mar_b60">
                                                <button
                                                    type="submit"
                                                    className="_social_login_form_btn_link _btn1"
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? 'Logging in...' : 'Login now'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <div className="_social_login_bottom_txt">
                                            <p className="_social_login_bottom_txt_para">
                                                Don't have an account? <Link to="/register">Create New Account</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
