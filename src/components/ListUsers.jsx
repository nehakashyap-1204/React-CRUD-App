import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ListUsers() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); //users per page
  const [filteredData, setFilteredData] = useState([]);
  const [searchName, setSearchName] = useState("");

  // handle search functionality
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchName(value);

    // filter the original data based on the search term
    const filtered = data.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // fetch data
  function getData() {
    axios
      .get(`https://6752a111d1983b9597b6c52c.mockapi.io/crud-react`)
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      });
  }

  // Handle delete with confirmation
  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://6752a111d1983b9597b6c52c.mockapi.io/crud-react/${id}`
          )
          .then(() => {
            getData();
            toast.info("User has been deleted");
            if (currentUsers.length === 1 && currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          })
          .catch((error) => console.log("Error deleting user:", error));
      }
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  // calculate the data for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  // change page
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="page-heading">
        <p>
          <span>Dashboard &gt;</span>
          <b> User Management</b>
        </p>
      </div>
      <div className="container">
        <div className="tableContainer table-responsive">
          <div className="search-menu mb-3">
            <i className="ri-search-line"></i>
            <input
              className="form-control"
              type="text"
              placeholder="search"
              value={searchName}
              onChange={handleSearch}
            />
          </div>

          <table className="table table-bordered" id="crudTable">
            <thead>
              <tr className="collapsible-row">
                <th>ID</th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers?.map((eachData) => (
                <tr key={eachData.id}>
                  <td>{eachData.id}</td>
                  <td>{eachData.name}</td>
                  <td>{eachData.email}</td>
                  <td>
                    <Link to="/update">
                      <button
                        className="action-btn update-btn"
                        onClick={() =>
                          setToLocalStorage(
                            eachData.id,
                            eachData.name,
                            eachData.email
                          )
                        }
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                    </Link>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(eachData.id)}
                    >
                      <i className="ri-delete-bin-6-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* pagination */}
          <div className="me-5">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link btn btn-danger me-1"
                  onClick={goToPrevPage}
                >
                  Prev
                </button>
              </li>
              {[...Array(totalPages).keys()].map((page) => (
                <li
                  key={page + 1}
                  className={`page-item ${
                    currentPage === page + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link btn btn-primary"
                    onClick={() => paginate(page + 1)}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link btn btn-success ms-1"
                  onClick={goToNextPage}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListUsers;
