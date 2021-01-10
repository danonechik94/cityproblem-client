import React, { FunctionComponent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { inject } from 'mobx-react'

import classnames from 'classnames';
import styles from './authForm.module.css';
import commonStyles from './forms.module.css';

import Input from '#/components/controls/input';
import Button from '#/components/controls/button';


interface Props {
  store: Store;
}

const authFormInitialValues = {
  login: '',
  password: '',
};

const AuthForm: FunctionComponent<Props> = inject('store')((props) => {

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  const handleRegisterLinkClick = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    props.store.showModal('register');
  };


  return (
    <div className={styles.form}>
      <Formik
        initialValues={authFormInitialValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form className={commonStyles.form}>
              <h2 className={commonStyles.title}>Войти</h2>
              <div className={commonStyles.subtitleText}>
                <a className={commonStyles.link} onClick={handleRegisterLinkClick}>или зарегистрироваться</a>
              </div>

              <div className={commonStyles.formContainer}>
                <div className={commonStyles.inputContainer}>
                  <Field
                    name="login"
                    component={Input}
                    disabled={isSubmitting}
                    placeholder="Email"
                  />
                  <ErrorMessage name="password" component="div" />
                </div>
                <div className={commonStyles.inputContainer}>
                  <Field
                    name="password"
                    type="password"
                    component={Input}
                    disabled={isSubmitting}
                    placeholder="Пароль"
                  />
                </div>
                <Button className={commonStyles.submitButton} size="small" type="submit" disabled={isSubmitting}>
                  Войти
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});

export default AuthForm;