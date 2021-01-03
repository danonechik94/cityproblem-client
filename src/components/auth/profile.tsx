import React from 'react';
import { inject, observer } from 'mobx-react'

import classnames from 'classnames';
import styles from './profile.module.css';

import UserIcon from '#/components/icons/user';

interface Props {
  auth: Auth;
  className: string;
  store: Store;
}

@inject('store')
@observer
export default class Profile extends React.Component<Props> {
  private readonly handleClick = () => {
    const { auth } = this.props;
    if (!auth.auth) {
      this.props.store.showModal({
        name: 'login',
      });
    }
  };

  private readonly renderAuthorized = (): React.ReactNode => {
    return <div></div>;
  };

  private readonly renderUnauthorized = (): React.ReactNode => {
    return (
      <React.Fragment>
        <UserIcon />
        <span className={styles.profileText}>Войти</span>
      </React.Fragment>
    );
  };

  render() {
    const { auth, className } = this.props;

    return (
      <div className={classnames(styles.profile, className)} onClick={this.handleClick}>
        {auth.auth ? this.renderAuthorized() : this.renderUnauthorized()}
      </div>
    );
  }
}