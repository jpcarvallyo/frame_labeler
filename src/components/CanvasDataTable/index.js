import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

const CanvasDataTable = ({
  handleBoxDelete,
  tableData,
  setHighlightedBoxIndex,
}) => {
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
    name: `Box: ${index + 1}`,
  }));

  return (
    <Box style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        disableColumnMenu
        disableColumnSorting
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
    </Box>
  );
};

export default CanvasDataTable;
