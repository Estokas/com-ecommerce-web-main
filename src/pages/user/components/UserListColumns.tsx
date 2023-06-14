import { Typography, Chip } from "@mui/material";
import { startCase, upperFirst } from "lodash";
import { TableGridProps } from "../../../components/TableGrid";
import UserSwitch from "./UserSwitch";

const UserListColumns: TableGridProps["columns"] = [
  {
    id: "enable",
    padding: "checkbox",
    align: "center",
    style: { paddingLeft: 3 },
    render: (value: any, row: any) => (
      <UserSwitch id={row._id} value={value} />
    ),
  },
  {
    id: "_id",
    label: "ID",
    style: { maxWidth: 80 },
  },
  {
    id: "name",
    label: "Name",
    style: { paddingLeft: 1 },
    render: (_: any, row: any) => {
      return (
        <Typography fontSize="0.8rem" fontWeight="500">
          {startCase(`${row?.firstName} ${row?.lastName}`)}
        </Typography>
      );
    },
  },
  
  {
    id: "email",
    label: "Email",
  },
  {
    id: "role",
    label: 'Role',
    render: (value: any) => <Chip label={upperFirst(value)} />
  },
];

export default UserListColumns;
