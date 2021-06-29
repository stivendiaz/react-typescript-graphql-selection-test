import { IModalConfig } from "./IModal";

export enum SortType {
  ASC = 'asc',
  DESC = 'desc'
}

export interface TableTemplateProps {
  tableHeaders: any[];
  tableConfig?: any;
  tableBody: any;
  handleSearchChange: any;
}

export interface ITableHeader {
  label: string;
  displayableName: any;
}

export interface ITableConfig {
  showOptions?: {
    searchInput: boolean;
  };
  title?: string;
  placeHolderText?: {
    search: string;
  };
  ModalConfig?: IModalConfig;
}

export interface ITableProps {
  tableHeaders: ITableHeader[];
  tableBody: any;
  isLoading: boolean;
  tableConfig?: ITableConfig;
  handleSearchChange: any;
}
