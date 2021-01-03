import React, { FunctionComponent } from 'react';
import { Formik } from 'formik';

import classnames from 'classnames';
import styles from './authForm.module.css';


interface Props {

}

const authFormInitialValues = {
  login: '',
  password: '',
};

const AuthForm: FunctionComponent<Props> = () => {

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };


  return (
    <div className={styles.form}>
      <Formik
        initialValues={authFormInitialValues}
        onSubmit={handleSubmit}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {

          return (
            <form onSubmit={handleSubmit}>

            </form>
          );

        }}
      </Formik>
    </div>
  );
};

export default AuthForm;