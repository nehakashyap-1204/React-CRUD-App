import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // handle search functionality
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchEmail(value);

    // filter the original data based on the search term
    const filtered = data.filter((user) =>
      user.email.toLowerCase().includes(value.toLowerCase())
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
  useEffect(() => {
    getData();
  }, []);

  // calculate the data for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUser = filteredData.slice(indexOfFirstUser, indexOfLastUser);

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
      <div className="home-container">
        <div className="divbar">
          <div className="home-searchbar mb-3">
            <i className="ri-search-line"></i>
            <input
              className="form-control"
              type="text"
              placeholder="search"
              value={searchEmail}
              onChange={handleSearch}
            />
          </div>
        </div>
        <table className="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email ID</th>
            </tr>
          </thead>
          <tbody>
            {currentUser?.map((eachData) => (
              <tr key={eachData.id}>
                <td>{eachData.id}</td>
                <td>{eachData.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination */}
        <div className="home-pagination">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
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
    </>
  );
}

export default Home;
