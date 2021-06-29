import type { FC } from "react";
import { TableCell, TableRow, IconButton, Tooltip } from "@material-ui/core";
import Trash from "../../icons/Trash";
import { IUser } from "../../../types/IUser";

interface IUsersTableRow {
  item: IUser;
  handleShowModal: Function;
  refetch: Function;
}

const UsersTableRow: FC<IUsersTableRow> = ({
  item,
  handleShowModal,
  refetch,
}) => {
  const handleDeleteModal = async () => {
    await handleShowModal(item?.id);
    await refetch();
  };
  return item ? (
    <TableRow key={item?.id}>
      <TableCell>{item?.name || "N/A"}</TableCell>
      <TableCell>{item?.age || "N/A"}</TableCell>
      <TableCell>{item?.username || "N/A"}</TableCell>
      <TableCell>{item?.hireDate?.toLocaleDateString() || "N/A"}</TableCell>
      <TableCell align="right">
        <Tooltip title="Open">
          <IconButton onClick={() => handleDeleteModal()}>
            <Trash fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  ) : null;
};

export default UsersTableRow;
