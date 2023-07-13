/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@mui/material"
import { ColumnDef } from "@tanstack/react-table"

export const riskGridColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "risk",
    header: "Risk",
    cell: (row: any) => {
      return (
        <Typography
          variant="inherit"
          gutterBottom
        >
          {row.getValue()}
        </Typography>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (row: any) => {
      return (
        <Typography
          variant="inherit"
          gutterBottom
        >
          {row.getValue()}
        </Typography>
      )
    }
  },
  {
    accessorKey: "features.vulnerability",
    header: "Vulnerability",
    enableSorting: true,
    cell: (row: any) => {
      return (
        <Typography
          variant="inherit"
          gutterBottom
          align="center"
        >
          {row.getValue()}
        </Typography>
      )
    },

  },
  {
    accessorKey: "features.probability",
    header: "Probability",
    enableSorting: true,
    cell: (row: any) => {
      return (
        <Typography
          variant="inherit"
          gutterBottom
          align="center"
        >
          {row.getValue()}
        </Typography>
      )
    }
  },
  {
    accessorKey: "features.impact",
    header: "Impact",
    enableSorting: true,
    cell: (row: any) => {
      return (
        <Typography
          variant="inherit"
          gutterBottom
          align="center"
        >
          {row.getValue()}
        </Typography>
      )
    }
  },
  {
    accessorKey: "features.threat",
    header: "Threat",
    enableSorting: true,
    cell: (row: any) => {
      return (
        <Typography
          variant="inherit"
          gutterBottom
          align="center"
        >
          {row.getValue()}
        </Typography>
      )
    }
  },
];
