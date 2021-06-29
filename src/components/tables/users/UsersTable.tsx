import { useState, useCallback, ChangeEvent, useEffect } from "react";
import { ITableConfig, ITableHeader, SortType } from "../../../types/ITable";
import TableTemplate from "../TableTemplate";
import debounce from "lodash.debounce";
import { DEBOUNCE_IDLE_TIME } from "../../../config/constants";
import UsersTableBody, { USERS } from "./UsersTableBody";
import SortByArrow from "../../buttons/button";
import { gql, useMutation } from "@apollo/client";
import { EModalIcon } from "../../../types/IModal";

const DELETE_USER = gql`
  mutation deleteUserById($userId: String!) {
    deleteUserById(userId: $userId) {
      id
    }
  }
`;

export default function UsersTable() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortType>(SortType.ASC);
  const [sortField, setSortField] = useState<string>("name");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string>("");
  const [prevQuery, setPrevQuery] = useState<any>([]);
  const [deleteUser] = useMutation(DELETE_USER, {
    update: (cache, { data: { deleteUserById } }) => {
      const data: any = cache.readQuery({
        query: USERS,
        variables: {
          name: searchValue || "",
          field: sortField,
          order: sortOrder,
        },
      });
      const newUsersList = data.filterBy.filter(
        ({ id }: any) => id !== deleteUserById.id
      );
      prevQuery.map((item: any) =>
        cache.writeQuery({
          query: USERS,
          variables: { ...item },
          data: { filterBy: newUsersList },
        })
      );
      setPrevQuery([]);
    },
    refetchQueries: [
      {
        query: USERS,
        variables: {
          name: searchValue || "",
          field: sortField,
          order: sortOrder,
        },
      },
    ],
  });

  const debouncedSave = useCallback(
    debounce((newValue: string) => {
      setPrevQuery([
        ...prevQuery,
        {
          name: searchValue,
          order: sortOrder,
          field: sortField,
        },
      ]);
      setSearchValue(newValue);
    }, DEBOUNCE_IDLE_TIME),
    []
  );

  const handleSortFieldAndType = (field: string) => {
    setPrevQuery([
      ...prevQuery,
      {
        name: searchValue,
        order: sortOrder,
        field: sortField,
      },
    ]);
    if (sortField === field && sortOrder === SortType.DESC) {
      setSortOrder(SortType.ASC);
    } else if (sortField === field && sortOrder === SortType.ASC) {
      setSortOrder(SortType.DESC);
    } else {
      setSortOrder(SortType.ASC);
    }
    setSortField(field);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleShowModal = (userId: string) => {
    setUserIdToDelete(userId);
    setShowModal(true);
  };

  const handleDeleteuser = async () => {
    await deleteUser({ variables: { userId: userIdToDelete } });
    setShowModal(false);
  };

  const tableConfig: ITableConfig = {
    showOptions: {
      searchInput: true,
    },
    title: "Employees",
    placeHolderText: {
      search: "Search by name",
    },
    ModalConfig: {
      showModal,
      title: "Delete employee",
      icon: EModalIcon.WARNING,
      message: "Do you want to delete this employee?",
      showOptions: {
        timesButton: true,
        cancelButton: true,
        desactiveButton: true,
      },
      functions: {
        mainAction: handleDeleteuser,
        hideModal: handleHideModal,
        showModal: handleShowModal,
      },
    },
  };

  const tableHeaders: ITableHeader[] = [
    {
      label: "Name",
      displayableName: (
        <SortByArrow
          title="Name"
          handleOnClick={() => {
            handleSortFieldAndType("name");
          }}
          isActive={sortField === "name" && sortOrder === SortType.DESC}
        />
      ),
    },
    {
      label: "Age",
      displayableName: (
        <SortByArrow
          title="Age"
          handleOnClick={() => {
            handleSortFieldAndType("age");
          }}
          isActive={sortField === "age" && sortOrder === SortType.DESC}
        />
      ),
    },
    {
      label: "Username",
      displayableName: (
        <SortByArrow
          title="Username"
          handleOnClick={() => {
            handleSortFieldAndType("username");
          }}
          isActive={sortField === "username" && sortOrder === SortType.DESC}
        />
      ),
    },
    {
      label: "Hire Date",
      displayableName: (
        <SortByArrow
          title="Hire Date"
          handleOnClick={() => {
            handleSortFieldAndType("hireDate");
          }}
          isActive={sortField === "hireDate" && sortOrder === SortType.DESC}
        />
      ),
    },
    {
      label: "Actions",
      displayableName: "Actions",
    },
  ];

  const handleSearchChange = (value: string): void => {
    debouncedSave(value);
  };

  return (
    <>
      <TableTemplate
        tableConfig={tableConfig}
        tableHeaders={tableHeaders}
        handleSearchChange={handleSearchChange}
        tableBody={
          <UsersTableBody
            handleShowModal={handleShowModal}
            queryFilters={{
              name: searchValue || "",
              field: sortField,
              order: sortOrder,
            }}
          />
        }
      />
    </>
  );
}
