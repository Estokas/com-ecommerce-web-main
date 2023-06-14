import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { FormProvider, useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import CreateUserForm from "./components/CreateUserForm";
import { useMutation } from "react-query";
import { baseURL } from "../../api";
import { getToken } from "../../hooks/useTokenStorage";

const createUser = async (data: any) => {
  await fetch(
    `${baseURL}/add/user`,
    { 
      method: 'post',
      body: JSON.stringify(data), 
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${getToken()}`
      },
      credentials: 'include'
    }
  )
}

interface Props {
  onSubmit?: () => void
}

const CreateUserDrawer: React.FC<Props> = (props) => {
  const { onSubmit: onFormSubmit } = props
  const [open, setOpen] = React.useState(false);
  const { mutate, isLoading } = useMutation(createUser, {
    onSettled: () => {
      onFormSubmit && onFormSubmit()
      setOpen(false)
    }
  });

  const methods = useForm({ shouldUnregister: true });
  const { handleSubmit } = methods;

  const toggleDrawer = () => setOpen(value => !value);
  const onSubmit = async (data: any) => {
    try {
      mutate(data);
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddRoundedIcon />}
        onClick={toggleDrawer}
      >
        New user
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        elevation={0}
      >
        <FormProvider {...methods}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            style={{ height: "100%" }}
          >
            <Box width="40rem" height="100%">
              <Grid
                container
                direction="column"
                justifyContent="space-between"
                height="100%"
              >
                <Grid item xs="auto">
                  <Toolbar
                    sx={{
                      borderBottomWidth: 1,
                      borderBottomColor: 'divider',
                      borderBottomStyle: 'solid'
                    }}
                  >
                    <Typography>
                      Create new user
                    </Typography>
                  </Toolbar>
                </Grid>
                <Grid item xs>
                  <Box sx={{ overflowY: "auto", height: "100%" }}>
                    <CreateUserForm />
                  </Box>
                </Grid>
                <Grid item xs="auto">
                  <Toolbar
                    sx={{
                      borderBottom: 0,
                      borderTopWidth: 1,
                      borderTopColor: 'divider',
                      borderTopStyle: 'solid'
                    }}
                  >
                    <Stack direction="row" spacing={1} width="100%">
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        size='large'
                        disabled={isLoading}
                        loading={isLoading}
                      >
                        Save
                      </LoadingButton>
                      <Button
                        variant="contained"
                        size='large'
                        color='secondary'
                        onClick={toggleDrawer}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Toolbar>
                </Grid>
              </Grid>
            </Box>
          </form>
        </FormProvider>
      </Drawer>
    </>
  );
};

export default CreateUserDrawer;
