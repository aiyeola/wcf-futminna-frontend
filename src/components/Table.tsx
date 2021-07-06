import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

interface Column {
  id: 'name' | 'level' | 'department' | 'unit' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'level', label: 'Level', minWidth: 100 },
  {
    id: 'unit',
    label: 'Unit',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'department',
    label: 'Department',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  name: string;
  level: string;
  unit: number;
  department: string;
}

function createData(
  name: string,
  level: string,
  unit: number,
  department: string,
): Data {
  return { name, level, unit, department };
}

const rows = [
  createData('India', 'IN', 200, 'deparrrrrr'),
  createData('China', 'CN', 200, 'deparrrrrr'),
  createData('Italy', 'IT', 200, 'deparrrrrr'),
  createData('United States', 'US', 200, 'deparrrrrr'),
  createData('Canada', 'CA', 200, 'deparrrrrr'),
  createData('Australia', 'AU', 200, 'deparrrrrr'),
  createData('Germany', 'DE', 200, 'deparrrrrr'),
  createData('Ireland', 'IE', 200, 'deparrrrrr'),
  createData('Mexico', 'MX', 200, 'deparrrrrr'),
  createData('Japan', 'JP', 200, 'deparrrrrr'),
  createData('France', 'FR', 200, 'deparrrrrr'),
  createData('United Kingdom', 'GB', 200, 'deparrrrrr'),
  createData('Russia', 'RU', 200, 'deparrrrrr'),
  createData('Nigeria', 'NG', 200, 'deparrrrrr'),
  createData('Brazil', 'BR', 200, 'deparrrrrr'),
  createData('Australia', 'AU', 200, 'deparrrrrr'),
  createData('Germany', 'DE', 200, 'deparrrrrr'),
  createData('Ireland', 'IE', 200, 'deparrrrrr'),
  createData('Mexico', 'MX', 200, 'deparrrrrr'),
  createData('Japan', 'JP', 200, 'deparrrrrr'),
  createData('France', 'FR', 200, 'deparrrrrr'),
  createData('United Kingdom', 'GB', 200, 'deparrrrrr'),
  createData('Russia', 'RU', 200, 'deparrrrrr'),
  createData('Nigeria', 'NG', 200, 'deparrrrrr'),
  createData('Brazil', 'BR', 200, 'deparrrrrr'),
];

const useStyles = makeStyles({
  container: {
    position: 'relative',
    minHeight: 300,
    maxHeight: 587,
  },
  table: {
    minWidth: 650,
  },
});

let ps;

export default function DataTable() {
  const classes = useStyles();

  const tableScroll = useRef();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // initialize and destroy the PerfectScrollbar plugin
  useEffect(() => {
    if (navigator.platform.includes('Win')) {
      ps = new PerfectScrollbar(tableScroll.current);
      document.body.style.overflow = 'hidden';
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.includes('Win')) {
        ps.destroy();
      }
    };
  }, [tableScroll]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer className={classes.container} ref={tableScroll}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`${row.name}-${index}`}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
