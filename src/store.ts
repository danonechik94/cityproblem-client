import { action, observable, makeObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';
import { useMemo } from 'react';
// eslint-disable-next-line react-hooks/rules-of-hooks
enableStaticRendering(typeof window === 'undefined')

let store;

class Store {
  constructor() {
    makeObservable(this)
  }

  @observable activeModal: ActiveModal = null;

  @action showModal = (name: string, options: ModalOptions) => {
    console.log('show modal', name);
    this.activeModal = {
      name,
      options,
    };
  }

  @action hideModals = () => {
    this.activeModal = null;
  };

  @action hydrate = (data) => {
    console.log('hydrate', data);
    if (!data) return

    this.activeModal = data.activeModal !== null ? data.activeModal : null;
  }
}

function initializeStore(initialData = null) {
  const _store = store ?? new Store();

  if (initialData) {
    _store.hydrate(initialData);
  }
  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
