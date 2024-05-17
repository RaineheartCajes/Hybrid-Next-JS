import SingupPage from '@/screens/login/signup'
import React from 'react'
import styles from '@/styles/Signin.module.css'

const Signup: React.FC = () => {
  return (
    <div className={styles.background}>
       <div className={styles.formContainer}>
       <SingupPage/>
       </div>
    </div>
  )
}

export default Signup