import type { NextPage } from 'next';
import NavBar from '../components/navbar';
import styles from '../styles/Home.module.css';  

const Home: NextPage = () => {
  return (
    <div className={styles.background}>
      <NavBar />
      <div className={styles.content}>
        <h1 className='text-3xl'>Welcome to Our E-Commerce Site.</h1>
        <h1 className='text-3xl'>Feel Free  to Buy my Shoes.</h1>
        <div className={styles.buttons}>
         
        </div>
      </div>
    </div>
  );
}

export default Home;
