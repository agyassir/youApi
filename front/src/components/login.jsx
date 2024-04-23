import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';   




export default function LoginForm() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);

            console.log(response.data);

            localStorage.setItem('token', response.data.token);
            navigate('/');

        } catch (error) {
            console.error('Login failed:', error.response.data.message);
        }
    };
    return (
        <div className="content dark-mode">
            <form className="container" onSubmit={handleSubmit}>

                <div class="flex items-center justify-center">
                    <div
                        class="bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200"
                    >
                        <div
                            class="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col"
                        >
                            <div className="">
                                <svg
                                    fill="#ffffff"
                                    height={50}
                                    width={50}
                                    version="1.1"
                                    className="lfog"
                                    id="Capa_1"
                                    xmlns="http://www.w3.org/2000/svg"

                                    viewBox="0 0 483.2 483.2"

                                >
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <g>
                                            {" "}
                                            <g>
                                                {" "}
                                                <g>
                                                    {" "}
                                                    <path d="M143.15,172.5h16.7V34c0-7.5,6.1-13.6,13.6-13.6h78.6v152.1h16.6h15h20.9V20.4h5.1c7.5,0,13.6,6.1,13.6,13.6v138.5h16.7 c3.8,0,6.8-3.1,6.8-6.8v-128c0-20.7-16.9-37.7-37.7-37.7h-135c-20.7,0-37.7,16.9-37.7,37.7v127.9 C136.35,169.4,139.45,172.5,143.15,172.5z"></path>{" "}
                                                </g>{" "}
                                                <g>
                                                    {" "}
                                                    <g>
                                                        {" "}
                                                        <path d="M367.05,130v7.5V174c0,10.1-8.2,18.3-18.3,18.3h-214.2c-10.1,0-18.3-8.2-18.3-18.3v-36.4v-7.5 c-19.5,3.3-34.4,20.2-34.4,40.7V442c0,22.8,18.5,41.2,41.2,41.2h237.1c22.8,0,41.2-18.5,41.2-41.2V170.7 C401.45,150.2,386.55,133.3,367.05,130z M169.65,442.3c-10.4,0-18.8-8.4-18.8-18.8s8.4-18.8,18.8-18.8 c10.4,0,18.8,8.4,18.8,18.8C188.35,433.9,179.95,442.3,169.65,442.3z M169.65,385.5c-10.4,0-18.8-8.4-18.8-18.8 s8.4-18.8,18.8-18.8c10.4,0,18.8,8.4,18.8,18.8C188.35,377.1,179.95,385.5,169.65,385.5z M169.65,328.8 c-10.4,0-18.8-8.4-18.8-18.8s8.4-18.8,18.8-18.8c10.4,0,18.8,8.4,18.8,18.8C188.35,320.4,179.95,328.8,169.65,328.8z M241.65,442.3c-10.4,0-18.8-8.4-18.8-18.8s8.4-18.8,18.8-18.8c10.4,0,18.8,8.4,18.8,18.8 C260.45,433.9,252.05,442.3,241.65,442.3z M241.65,385.5c-10.4,0-18.8-8.4-18.8-18.8s8.4-18.8,18.8-18.8 c10.4,0,18.8,8.4,18.8,18.8S252.05,385.5,241.65,385.5z M241.65,328.8c-10.4,0-18.8-8.4-18.8-18.8s8.4-18.8,18.8-18.8 c10.4,0,18.8,8.4,18.8,18.8C260.45,320.4,252.05,328.8,241.65,328.8z M313.65,442.3c-10.4,0-18.8-8.4-18.8-18.8 s8.4-18.8,18.8-18.8s18.8,8.4,18.8,18.8C332.45,433.9,324.05,442.3,313.65,442.3z M313.65,385.5c-10.4,0-18.8-8.4-18.8-18.8 s8.4-18.8,18.8-18.8s18.8,8.4,18.8,18.8S324.05,385.5,313.65,385.5z M313.65,328.8c-10.4,0-18.8-8.4-18.8-18.8 s8.4-18.8,18.8-18.8s18.8,8.4,18.8,18.8C332.45,320.4,324.05,328.8,313.65,328.8z M334.55,262.1c0,5.8-4.7,10.4-10.4,10.4 h-164.9c-5.8,0-10.4-4.7-10.4-10.4v-28.3c0-5.8,4.7-10.4,10.4-10.4h164.9c5.8,0,10.4,4.7,10.4,10.4V262.1z"></path>{" "}
                                                    </g>{" "}
                                                </g>{" "}
                                            </g>{" "}
                                        </g>{" "}
                                    </g>
                                </svg>
                            </div>
                            <h1 class="text-white text-2xl">Sign in to YouApi</h1>
                            <input
                                class="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                                placeholder="Email"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                id="email"
                            />
                            <input
                                class="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                                placeholder="Password"
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                            />
                            <input
                                class="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                                type="submit"
                                id=""
                            />
                            {loading && <div class="loader border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin
aspect-square w-8 flex justify-center items-center text-yellow-700">$</div>}
                            <p>
                                Don't have an account?
                                <Link
                                    class="font-semibold text-white hover:text-blue-500 transition-all duration-200"
                                    to="/register"
                                >Sign up</Link
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};