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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = [
    { id: student.id, namelat: student.namelat, namekir: student.namekir, studytype: student.studytype, country: student.country, sex: student.sex },
  ];
  
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
        <div className="links">
          <Link className="link" to="/dormitories">
            <h6>Dormitories</h6>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/settlements">
            <h6>Settlements</h6>
          </Link>
        </div>
      </div>
       <table className="students">
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
        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
        ).map((student) => (
            <tr key={student.id} className="student">
              <td>{student.id}</td>
              <td style={{ width: 160 }} align="right">
                {student.namelat}
              </td>
              <td style={{ width: 160 }} align="right">
                {student.namekir}
              </td>
              <td style={{ width: 160 }} align="right">
                {student.studytype}
              </td>
              <td style={{ width: 160 }} align="right">
                {student.country}
              </td>
              <td style={{ width: 160 }} align="right">
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
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page',
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
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;