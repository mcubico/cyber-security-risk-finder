/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@mui/material"
import { ColumnDef } from "@tanstack/react-table"

export const riskGridColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: "id",
    header: "Id",
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
    sortingFn: () => undefined,
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
    accessorKey: "features.probability",
    header: "Probability",
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
