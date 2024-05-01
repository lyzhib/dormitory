import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(dormitory, room) {
  return {
    dormitory,
    room,
    student: [
      {
        namelat: 'Zhang Bohang',
        namekir: 'Чжан Бохан',
        studytype: 'Контракт',
        country: 'Китай',
        sex: 'Женский',
      },
      {
        namelat: 'Li Jiahui',
        namekir: 'Ли Цзяхуэй',
        studytype: 'Контракт',
        country: 'Китай',
        sex: 'Женский',
      },
      {
        namelat: 'Carole Apsaba',
        namekir: 'Кароль апьсаба',
        studytype: 'Бюджет',
        country: 'Сирия',
        sex: 'Женский',
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(props.initialOpen || false);

  return (
    <React.Fragment>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <th scope="row">{row.dormitory}</th>
        <td>{row.room}</td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={6}>
          {open && (
            <Sheet
              variant="soft"
              sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
            >
              <Typography level="body-lg" component="div">
                Student
              </Typography>
              <Table
                borderAxis="bothBetween"
                size="sm"
                aria-label="purchases"
                sx={{
                  '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
                    { textAlign: 'right' },
                  '--TableCell-paddingX': '0.5rem',
                }}
              >
                <thead>
                  <tr>
                    <th>namelat</th>
                    <th>namekir</th>
                    <th>studytype</th>
                    <th>country</th>
                    <th>sex</th>
                  </tr>
                </thead>
                <tbody>
                  {row.student.map((studentRow) => (
                    <tr>
                      <th scope="row">{studentRow.namelat}</th>
                      <td>{studentRow.namekir}</td>
                      <td>{studentRow.studytype}</td>
                      <td>{studentRow.country}</td>
                      <td>{studentRow.sex}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
}

Row.propTypes = {
  initialOpen: PropTypes.bool,
  row: PropTypes.shape({
    dormitory: PropTypes.number.isRequired,
    room: PropTypes.number.isRequired,
    student: PropTypes.arrayOf(
      PropTypes.shape({
        namelat: PropTypes.string.isRequired,
        namekir: PropTypes.string.isRequired,
        studytype: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        sex: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData(5, 201),
  createData(5, 223),
  createData(5, 214),
  createData(5, 305),
  createData(8, 301),
];

export default function TableCollapsibleRow() {
  return (
    <Sheet>
      <Table
        aria-label="collapsible table"
        sx={{
          '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
            { textAlign: 'right' },
          '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]':
            {
              borderBottom: 0,
            },
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label="empty" />
            <th style={{ width: '40%' }}>dormitory</th>
            <th>room</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <Row row={row} initialOpen={index === 0} />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
