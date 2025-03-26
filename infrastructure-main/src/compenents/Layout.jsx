import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

import {Outlet} from 'react-router-dom';
const Layout = () => {
    return (
        <main>
            <header>
                <Header />
            </header>
            <section>
                <Outlet />
            </section>
            <footer>
                <Footer />
            </footer>
        </main>         
  
    );
};

export default Layout;