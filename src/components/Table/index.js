import React from "react";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = ({ handleBoxDelete, tableData }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "", width: 150 },
    {
      field: "deleteButton",
      headerName: "",
      sortable: false,
      flex: 1,
      align: "right",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            console.log("deleting");
            console.log("params: ", params);
            handleBoxDelete(params.tabIndex);
          }}
        >
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const rows = tableData.map((row, index) => ({
    ...row,
    id: index + 1,
    name: `Bounding Box: ${index + 1}`,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default Table;
