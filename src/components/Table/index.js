import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = ({ handleBoxDelete, tableData, setHighlightedBoxIndex }) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const handleRowEnter = (event) => {
    const id = Number(event.currentTarget?.dataset?.id) - 1;
    setHoveredRowIndex(id);
    setHighlightedBoxIndex(id);
  };

  const handleRowLeave = () => {
    setHoveredRowIndex(null);
    setHighlightedBoxIndex(null);
  };

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
            handleBoxDelete(params.rowIndex);
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
        slotProps={{
          row: {
            onMouseEnter: handleRowEnter,
            onMouseLeave: handleRowLeave,
          },
        }}
        hoverStateEnabled
        rowClassName={(params) =>
          params.rowIndex === hoveredRowIndex ? "hovered-row" : ""
        }
      />
    </div>
  );
};

export default Table;
