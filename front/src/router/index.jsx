import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Wallet from "../pages/wallet";
import Send from "../pages/send";
import Add from "../pages/add";
import Chat from "../pages/chat";


export const HOME = '/';

export const router = createBrowserRouter([
    {
        path: HOME,
        element: <Home />
    },
    {
        path : '/login',
        element : <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/wallet/:id',
        element: <Wallet />
    },
    {
        path: '/send/:id',
        element: <Send />
    },
    {
        path: '/add/:id',
        element: <Add />
    },
    {
        path: '/chat',
        element: <Chat />
    }
]);
