import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';

const Students = () => {
  const [students, setStudents] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8800/students");
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllStudents();
  }, []);

  console.log(students);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/students/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
        <button className="addHome">
          <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
            Add new student
          </Link>
        </button>
        <button className="dormitory">
          <Link to="/dormitories" style={{ color: "inherit", textDecoration: "none" }}>
            Dormitories
          </Link>
        </button>
        <button className="settlement">
          <Link to="/settlements" style={{ color: "inherit", textDecoration: "none" }}>
            Settlements
          </Link>
        </button>
        <button className="user">
          <Link to="/users" style={{ color: "inherit", textDecoration: "none" }}>
            Users
          </Link>
        </button>
      </div>
      <Root>
       <table aria-label="custom pagination table">
        <thead>
         <tr>
          <th>id</th>
          <th>namelat</th>
          <th>namekir</th>
          <th>studytype</th>
          <th>country</th>
          <th>sex</th>
         </tr>
        </thead>
        <tbody>
        {students && students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>
                {student.namelat}
              </td>
              <td>
                {student.namekir}
              </td>
              <td>
                {student.studytype}
              </td>
              <td>
                {student.country}
              </td>
              <td>
                {student.sex}
              </td>
              <td>
                <button className="delete" onClick={() => handleDelete(student.id)}>Delete</button>
                <button className="update">
                  <Link
                    to={`/update/${student.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                  Update
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={13}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'Rows per page',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
       </table>
       </Root>
    </div>
  );
};

export default Students;


const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
