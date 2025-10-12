import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../fixt-component/Navbar';
import Footer from '../fixt-component/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
             <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;