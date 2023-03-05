import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/auth-context";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 10 * (60 * 1000),
            cacheTime: 15 * (60 * 1000),
            keepPreviousData: true,
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
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </BrowserRouter>
    //</React.StrictMode>
);

