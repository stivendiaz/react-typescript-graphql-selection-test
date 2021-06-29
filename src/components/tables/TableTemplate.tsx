/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FC } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Container,
  Typography,
  Checkbox,
} from "@material-ui/core";
import SearchIcon from "../icons/Search";
import Scrollbar from "../Scrollbar";
import { ITableConfig, TableTemplateProps } from "../../types/ITable";
import Modal from "../modals/Modal";

const defaultTableConfig: ITableConfig = {
  showOptions: {
    searchInput: true,
  },
  placeHolderText: {
    search: "Search...",
  },
};

const TableTemplate: FC<TableTemplateProps> = ({
  tableHeaders,
  tableBody,
  tableConfig = defaultTableConfig,
  handleSearchChange,
}) => (
  <Container maxWidth="lg">
    {tableConfig.ModalConfig && (
      <Modal
        modalConfig={tableConfig.ModalConfig}
        showModal={tableConfig.ModalConfig.showModal}
        hideModal={tableConfig.ModalConfig.functions.hideModal}
      />
    )}
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        m: -1,
        p: 2,
      }}
    >
      {tableConfig.title && (
        <Typography style={{ marginRight: 50 }} variant="h4">
          {tableConfig.title}
        </Typography>
      )}
      {tableConfig.showOptions.searchInput && (
        <Box
          sx={{
            m: 1,
            maxWidth: "100%",
            width: 500,
          }}
        >
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            placeholder={tableConfig.placeHolderText.search}
            variant="outlined"
            onChange={(event) => {
              const { value } = event.target;
              if (value.length > 2) handleSearchChange(value);
              if (value.length === 0) handleSearchChange("");
            }}
          />
        </Box>
      )}
    </Box>
    <Scrollbar>
      <Box sx={{ minWidth: 1150 }}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders?.map((header: any) => {
                if (
                  header.label.toLowerCase() === "actions" ||
                  header.label.toLowerCase() === "open"
                ) {
                  return (
                    <TableCell
                      key={header.label}
                      style={{ textTransform: "capitalize" }}
                      align="right"
                    >
                      {header.displayableName}
                    </TableCell>
                  );
                }
                if (header.label.toLowerCase() === "checkbox") {
                  return (
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" />
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={header.label}
                    style={{ textTransform: "capitalize" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {header.displayableName}
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
        </Table>
      </Box>
    </Scrollbar>
  </Container>
);

export default TableTemplate;
