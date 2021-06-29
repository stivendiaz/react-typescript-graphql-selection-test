export enum EModalIcon {
  WARNING = 'warning'
}

export interface IModalConfig {
  showModal: boolean;
  title: string;
  icon: EModalIcon;
  message: string;
  showOptions: {
    timesButton: boolean;
    desactiveButton: boolean;
    cancelButton: boolean;
  };
  functions: {
    mainAction: Function;
    hideModal: Function;
    showModal: Function;
  };
}
