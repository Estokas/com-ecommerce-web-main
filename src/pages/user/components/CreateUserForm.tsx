import { Box, Divider, Stack, Switch } from "@mui/material";
import { Controller } from "react-hook-form";
import TableGrid, { TableGridProps } from "../../../components/TableGrid";
import TextField from "../../../components/TextField";
import ControlledSelect from "../../../components/Select";

const columns: TableGridProps["columns"] = [
  {
    id: "label",
    style: {
      width: 175,
    },
  },
  {
    id: "field",
    render: (value) => (
      <Stack direction="row" alignItems="center" justifyContent="start">
        {value}
      </Stack>
    ),
  },
];

const rows = [
  {
    label: "First Name",
    field: (
      <TextField
        fullWidth
        controllerProps={{
          name: "firstName",
          rules: { required: true },
        }}
      />
    ),
  },
  {
    label: "Last Name",
    field: (
      <TextField
        fullWidth
        controllerProps={{
          name: "lastName",
          rules: { required: true },
        }}
      />
    ),
  },
  {
    label: "Email",
    field: (
      <TextField
        fullWidth
        controllerProps={{
          name: "email",
          rules: { required: true },
        }}
      />
    ),
  },
  {
    label: "Password",
    field: (
      <TextField
        fullWidth
        type="password"
        controllerProps={{
          name: "password",
          rules: { required: true },
        }}
      />
    ),
  },
  {
    label: 'Enable',
    field: (
        <Controller 
          name="enable"
          defaultValue={true}
          render={({ field: { value, onChange } }) => (
            <Switch 
              checked={value} 
              size="small"
              onChange={onChange} 
            />
          )}
        />
    ),
  },
  {
    label: 'Role',
    field: (
        <ControlledSelect 
          controllerProps={{
            name: 'role',
            defaultValue: 'USER'
          }}
          formProps={{ fullWidth: true }}
          items={[
            {
              value: 'ADMIN',
              label: 'Admin'
            },
            {
              value: 'USER',
              label: 'User'
            }
          ]}
        />
    ),
  }
];

const CreateUserForm = () => {
  return (
    <Stack direction="column" spacing={4} sx={{ pt: 3 }}>
      <Box sx={{ px: 3 }}>
        <TableGrid
          disableHeader
          disableHover
          disableBorder
          spacing={{
            row: 2,
          }}
          data={rows}
          columns={columns}
        />
      </Box>
    </Stack>
  );
};

export default CreateUserForm;
