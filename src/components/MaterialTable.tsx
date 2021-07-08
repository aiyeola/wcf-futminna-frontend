import React, { forwardRef, useState } from 'react';
import MaterialTable, { Column, Icons } from 'material-table';
import FirstPageRoundedIcon from '@material-ui/icons/FirstPageRounded';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import LastPageRoundedIcon from '@material-ui/icons/LastPageRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';

import { useAllData } from '@api/index';
import Modal from '@components/Modal';

interface Row {}

export default function Table() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(1054));
  const [open, setOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{}>({});

  const columns: Array<Column<Row>> = [
    { field: 'name', title: 'Name', width: 300 },
    { field: 'level', title: 'Level', align: 'justify' },
    { field: 'department', title: 'Department', width: 200, align: 'left' },
    { field: 'unit', title: 'Unit', width: 170 },
    { field: 'campus', title: 'Campus', width: 170 },
    { field: 'origin', title: 'Origin', width: 150 },
  ];

  const {
    data: allData,
    isLoading: allDataIsLoading,
    isSuccess: allDataIsSuccess,
  } = useAllData();

  const data =
    allDataIsSuccess &&
    allData.data.data.allData.map((record) => {
      const name = `${record.firstName} ${record.lastName}`;

      return {
        name,
        level: record.level,
        department: record.department,
        unit: record.unit,
        campus: record.campus,
        origin: record.origin,
        ...record,
      };
    });

  const tableIcons: Icons = {
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeftRoundedIcon {...props} ref={ref} />
    )),
    FirstPage: forwardRef((props, ref) => (
      <FirstPageRoundedIcon {...props} ref={ref} />
    )),
    NextPage: forwardRef((props, ref) => (
      <ChevronRightRoundedIcon {...props} ref={ref} />
    )),
    LastPage: forwardRef((props, ref) => (
      <LastPageRoundedIcon {...props} ref={ref} />
    )),
    Search: forwardRef((props, ref) => (
      <SearchRoundedIcon {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => (
      <CloseRoundedIcon {...props} ref={ref} />
    )),
    SortArrow: forwardRef((props, ref) => (
      <ArrowUpwardRoundedIcon {...props} ref={ref} />
    )),
    Delete: forwardRef((props, ref) => (
      <DeleteRoundedIcon {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <EditRoundedIcon {...props} ref={ref} />),
    Check: forwardRef((props, ref) => (
      <CheckRoundedIcon {...props} ref={ref} />
    )),
    Clear: forwardRef((props, ref) => (
      <CloseRoundedIcon {...props} ref={ref} />
    )),
    Export: forwardRef((props, ref) => (
      <FileCopyRoundedIcon {...props} ref={ref} />
    )),
  };

  const handleOpen = (data) => {
    setOpen(true);
    setModalData(data);
  };

  const handleClose = () => {
    setOpen(false);
    setModalData({});
  };

  return allDataIsLoading ? (
    <Typography>Loading</Typography>
  ) : (
    <>
      <MaterialTable
        columns={columns}
        data={data.length > 0 && data}
        icons={tableIcons}
        options={{
          showTitle: false,
          searchFieldVariant: 'outlined',
          showSelectAllCheckbox: true,
          pageSize: 10,
          pageSizeOptions: [10, 25, 100],
          maxBodyHeight: '63.2vh',
          searchFieldAlignment: 'left',
          exportAllData: true,
          exportFileName: 'WCF FUTMinna',
          showEmptyDataSourceMessage: true,
          loadingType: 'overlay',
          actionsColumnIndex: matches ? 0 : -1,
          headerStyle: {
            backgroundColor: '#eee',
          },
          exportButton: {
            csv: true,
            pdf: true,
          },
          searchFieldStyle: {
            maxWidth: 500,
          },
        }}
        actions={[
          {
            icon: forwardRef((props, ref) => (
              <FullscreenRoundedIcon {...props} ref={ref} />
            )),
            onClick: (_, data) => handleOpen(data),
            tooltip: 'View Full Data',
          },
        ]}
      />

      <Modal open={open} handleClose={handleClose} data={modalData} />
    </>
  );
}
