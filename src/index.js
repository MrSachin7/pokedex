import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider, createHashRouter} from "react-router-dom";
import SplashScreen from "./routes/SplashScreen";
import App from "./routes/App";
import Home from "./routes/Home";
import About from "./routes/About";
import {QueryClient, QueryClientProvider}  from "@tanstack/react-query";

const router = createHashRouter([
    {
        path: '/',
        element: <SplashScreen/>
    },
    {
        path: '/app',
        element: <App/>,
        children: [
            {
                path: '/app/home',
                element: <Home/>
            },
            {
                path: '/app/about-us',
                element: <About/>
            }

        ]
    }
])


const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
