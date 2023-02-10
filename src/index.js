import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/auth-context";
import {QueryClientProvider, QueryClient} from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 10 * (60 * 1000),
            cacheTime:15 * (60 * 1000)
        }
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    // </React.StrictMode>
);

