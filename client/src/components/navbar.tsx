import Link from 'next/link';
import styles from '../styles/Navbar.module.css';  // Assuming you have NavBar.module.css for styles

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          SHOE  SHOP by Raineheart
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/products">Products</Link>
        <Link href="/about">About</Link>
        <Link href="/contacts">Contact</Link>
        <Link href="/signin">Sign in</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}

export default NavBar;
