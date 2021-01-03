import { React } from 'react';
import { MapItemType } from '#/src/constants/mapItems';

declare interface MapItem {
  id: string;
  coords: { lat: number, lng: number };
  type: typeof MapItemType;
  description: string;
  address: string;
}

declare interface User {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  photo?: string;
}

declare interface Auth {
  auth: boolean;
  data?: User;
}

declare interface ActiveModal {
  name: string;
  options?: ModalOptions;
}

declare interface ModalOptions {
  fullScreen?: boolean;
  showOverlay?: boolean;
  canUserClose?: boolean;
  content: React.ReactNode;
}

declare interface Store {
  activeModal: ActiveModal;
  showModal: (name: string, options: ModalOptions) => void;
  hideModals: () => void;

}