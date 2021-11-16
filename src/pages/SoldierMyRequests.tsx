import GenericTable, { ColumnConfig, GenericTableRow } from "components/molecules/GenericTable";
import React, { useState } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { Chip } from "@mui/material";
import PageTabs from "components/molecules/PageTabs/PageTabs";
import { useSoldierPageTabs } from "hooks/useSoldierPageTabs";
import BodyLayout from "layouts/BodyLayout";
import useCategoryFilter from "components/molecules/GenericTable/useCategoryFilter";

const columns: ColumnConfig[] = [
  {
    title: "table.header.icon",
    id: "icon",
    muiProps: {
      width: "60px",
    },
  },
  {
    title: "table.header.itemName",
    id: "name",
    muiProps: {
      align: "left",
      width: "60%",
    },
  },
  {
    title: "table.header.category",
    id: "category",
    muiProps: {
      align: "center",
    },
  },
  {
    title: "table.header.status",
    id: "status",
    muiProps: {
      align: "center",
      width: "5%",
    },
  },
];

const allRows: GenericTableRow[] = [
  {
    icon: <MilitaryTechIcon />,
    name: "AK-47",
    category: <Chip label="Heavy" />,
    status: <Chip label="Returned" />,
  },
  {
    icon: <MilitaryTechIcon />,
    name: "M4a1-s",
    category: <Chip label="Light" />,
    status: <Chip color="error" label="In use" />,
  },
];

interface SoldierMyRequestsProps {}

const SoldierMyRequests: React.FC<SoldierMyRequestsProps> = () => {
  const pageTabProps = useSoldierPageTabs();
  const [rows, setRows] = useState<GenericTableRow[]>(allRows);
  const categoryFilter = useCategoryFilter(allRows, setRows);

  return (
    <BodyLayout>
      <PageTabs {...pageTabProps} />
      <GenericTable columns={columns} rows={rows} filters={[...categoryFilter]} />
    </BodyLayout>
  );
};

export default SoldierMyRequests;
