import { Chip, Typography } from "@mui/material";
import { TableGridProps } from "../../../components/TableGrid";
import moment from "moment";
import { startCase } from "lodash";

function clipStatus(value: number) {
  switch(value) {
    case 0: return "CANCELLED";
    case 1: return "COMPLETED";
    case 2: return "PENDING";
  }
}

const OrderListColumns: TableGridProps["columns"] = [
  {
    id: "orderId",
    label: "Order ID",
  },
  {
    id: "name",
    label: "Name",
    style: { paddingLeft: 1 },
    render: (_: any, row: any) => {
      return (
        <Typography fontSize="0.8rem" fontWeight="500">
          {startCase(`${row?.user?.firstName} ${row?.user?.lastName}`)}
        </Typography>
      );
    },
  },
  {
    id: "createdAt",
    label: "Date",
    render: (value: any) => <span>{moment(value).format('MMMM DD, YYYY')}</span>
  },
  {
    id: 'status',
    label: 'Status',
    render: (value: any) => <Chip label={clipStatus(value)} />
  },
  {
    id: 'totalQuantity',
    label: 'Quantity',
    render: (value: any) => <Chip label={value} />
  },
  {
    id: 'totalPrice',
    label: 'Total',
    render: (value: any) => <Chip label={`\$${value}`} />
  },
];

export default OrderListColumns;
