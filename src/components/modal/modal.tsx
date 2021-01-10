import React, {createRef, RefObject} from 'react';

import classnames from 'classnames';
import styles from './modal.module.css';

import Cross from '#/components/icons/cross';

interface Props {
  options: ModalOptions;
  onClose: () => void;
}

export default class Modal extends React.Component<Props> {
  static defaultProps = {
    options: {
      position: 'middle',
    },
  };

  modalContentRef: RefObject<HTMLDivElement> = createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
    document.addEventListener('touchend', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
    document.removeEventListener('touchend', this.handleClickOutside, true);
  }

  private readonly handleClickOutside = (evt: MouseEvent) => {
    const contentNode = this.modalContentRef.current;

    if (contentNode && !contentNode.contains(event.target as Node)) {
      this.close();
    }
  };

  private readonly close = () => {
    this.props.onClose();
  };

  private readonly renderCloseButton = (): React.ReactNode | null => {
    const { options: { canUserClose = true } } = this.props;
    if (canUserClose) {

      return (
        <div className={styles.closeContainer} onClick={this.props.onClose}>
          <Cross />
        </div>
      )
    }

    return null;
  };

  private readonly renderOverlay = (children: React.ReactNode): React.ReactNode => {
    return (
      <div className={styles.overlay}>
        {children}
      </div>
    );
  };

  private readonly renderModal = (): React.ReactNode => {
    const { options: { content, position } } = this.props;
    return (
      <div className={classnames(styles.modalContainer, [styles[`modalContainer--${position}`]])}>
        <div className={classnames(styles.modalContent, [styles[`modalContent--${position}`]])} ref={this.modalContentRef}>
          {this.renderCloseButton()}
          {content}
        </div>
      </div>
    );
  };


  render() {
    const { options: { showOverlay = true } } = this.props;
    let modalNode = this.renderModal();
    if (showOverlay) {
      modalNode = this.renderOverlay(modalNode);
    }

    return modalNode;
  }
}