import type { FC } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import ModalWrapper from "@material-ui/core/Modal";
import { alpha } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/WarningOutlined";
import { EModalIcon, IModalConfig } from "../../types/IModal";
import X from "../icons/X";

interface IModal {
  hideModal: any;
  showModal: any;
  modalConfig?: IModalConfig;
}

const Modal: FC<IModal> = ({ hideModal, showModal, modalConfig = null }) => (
  <ModalWrapper onClose={hideModal} open={showModal}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        left: 0,
        p: 3,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 2000,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={12} sx={{ position: "relative" }}>
          {modalConfig?.showOptions.timesButton && (
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
              onClick={hideModal}
            >
              <X />
            </IconButton>
          )}

          <Box
            sx={{
              display: "flex",
              pb: 2,
              pt: 3,
              px: 3,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.error.main, 0.08),
                color: "error.main",
                mr: 2,
              }}
            >
              {modalConfig?.icon === EModalIcon.WARNING && <WarningIcon />}
            </Avatar>
            <Box>
              <Typography color="textPrimary" variant="h5">
                {modalConfig?.title}
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
                {modalConfig?.message}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              px: 3,
              py: 1.5,
            }}
          >
            {modalConfig?.showOptions.cancelButton && (
              <Button
                onClick={hideModal}
                color="primary"
                sx={{ mr: 2 }}
                variant="outlined"
              >
                Cancel
              </Button>
            )}
            {modalConfig?.showOptions.desactiveButton && (
              <Button
                sx={{
                  backgroundColor: "error.main",
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                }}
                variant="contained"
                onClick={() => modalConfig?.functions.mainAction()}
              >
                Sure
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  </ModalWrapper>
);

export default Modal;
