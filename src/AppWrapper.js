import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import App from './App';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { NotFound } from './pages/NotFound';
import { Access } from './pages/Access';

export const ctx = React.createContext();

const AppWrapper = (props) => {
    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const [colorScheme, setColorScheme] = useState('light');

    return (
        <Routes>
            <Route path="/login" element={<Login colorScheme={colorScheme} />} />
            <Route path="/error" element={<Error colorScheme={colorScheme} />} />
            <Route path="/notfound" element={<NotFound colorScheme={colorScheme} />} />
            <Route path="/access" element={<Access colorScheme={colorScheme} />} />
            <Route path="*" element={<App setColorScheme={setColorScheme} />} />
        </Routes>
    );
};

export default AppWrapper;
