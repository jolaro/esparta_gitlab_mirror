import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { inventoryTableStyles } from "../../styles/mui/inventoryTableStyles";
import { WeaponsTableBody } from "./WeaponsTableBody";
import { RequestsTableBody } from "./RequestsTableBody";
import { SoldiersTableBody } from "./SoldiersTableBody";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

interface Props {
  item?: {
    id: "",
    name: "",

  };
  headers?: Array<string>;
  value?: Number;
}


function InventoryTable(props: Props) {

  function getTableBody() {
    if (props.value == 0) {
      return <WeaponsTableBody />;
    } else if (props.value == 1) {
      return <RequestsTableBody />;
    } else {
      return <SoldiersTableBody />;
    }
  }

  return <TableContainer component={Paper} className={inventoryTableStyles().tableContainer}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table" className={inventoryTableStyles().table}>
      <TableHead>
        <TableRow>
          {props.headers?.map((header) =>
            <TableCell key={header} className={inventoryTableStyles().tableHeaderCell}>{header}</TableCell>,
          )}
        </TableRow>
      </TableHead>
      {getTableBody()}
    </Table>
  </TableContainer>;
}

export default InventoryTable;