import React from 'react';
import styles from './LoginForm.module.css';

const CircleGroup = () => (
  <div className={styles.circleContainer}>
    <div className={styles.yellowCircle} />
    <div className={styles.redCircle} />
    <div className={styles.greenCircle} />
  </div>
);

const InputField = ({ id, label, type = 'text' }) => (
  <>
    <label htmlFor={id} className={styles.inputLabel}>{label}</label>
    <input
      type={type}
      id={id}
      className={styles.inputField}
      aria-label={label}
    />
  </>
);

const LoginForm = () => {
  return (
    <main className={styles.container}>
      <form className={styles.formWrapper}>
        <CircleGroup />
        <div className={styles.formContent}>
          <InputField id="username" label="Usuario" />
          <InputField id="password" label="Password" type="password" />
          <button type="submit" className={styles.submitButton}>
            Ingresar
          </button>
        </div>
      </form>
    </main>
  );
};

export default LoginForm;