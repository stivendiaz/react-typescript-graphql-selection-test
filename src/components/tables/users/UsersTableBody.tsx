import type { FC } from "react";
import UsersTableRow from "./UsersTableRow";
import { IUser } from "../../../types/IUser";
import { useQuery, gql } from "@apollo/client";
import { makeVar } from "@apollo/client";

interface UsersTableBodyProps {
  queryFilters: {
    name: string;
    field: string;
    order: string;
  };
  handleShowModal: Function;
}

export const USERS = gql`
  query filterBy($name: String!, $field: String!, $order: String!) {
    filterBy(name: $name, field: $field, order: $order) {
      id
      username
      age
      name
    }
  }
`;

const UsersTableBody: FC<UsersTableBodyProps> = ({
  queryFilters,
  handleShowModal,
}) => {
  const { loading, error, data, refetch } = useQuery(USERS, {
    variables: queryFilters,
  });
  const users = data?.filterBy || [];

  return (
    <>
      {users.map((item: IUser, index: any) => (
        <UsersTableRow
          key={index}
          item={item}
          handleShowModal={handleShowModal}
          refetch={refetch}
        />
      ))}
    </>
  );
};

export default UsersTableBody;
