import React from 'react';
import Navbar from '../components/navbar';
import styles from '../styles/Layout.module.css';  // Assuming you have Layout.module.css for styles

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
