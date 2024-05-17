import React from 'react'
import SigninPage from '../../../screens/login/signin'
import styles from '@/styles/Signin.module.css'


const Signin: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.formContainer}>
        <SigninPage/>
        </div>
      </div>
  )
}

export default Signin