import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Update = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Error states for input validation
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailInputRef = useRef(null);
  // Validate input fields
  const validateInputs = () => {
    let isValid = true;

    // Name validation: check if name is empty
    if (name.trim() === "") {
      setNameError("Name is required.");
      isValid = false;
    }

    // Email validation: simple regex for format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    return isValid;
  };

  const navigate = useNavigate();
  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  function handleUpdate(e) {
    e.preventDefault();
    if (validateInputs()) {
      // If inputs are valid, make the API call
      axios
        .put(`https://6752a111d1983b9597b6c52c.mockapi.io/crud-react/${id}`, {
          name: name,
          email: email,
        })
        .then(() => {
          toast.info("User has been updated");
        })
        .then(() => {
          navigate("/read");
        });
    }
  }

  // Clear error when user starts typing in the name field
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (nameError) setNameError("");
  };

  // Clear error when user starts typing in the email field
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(""); // Clear error message
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      emailInputRef.current.focus();
    }
  };

  return (
    <>
      <div className="page-heading">
        <p>
          <span>Dashboard &gt;</span>
          <b> User Management</b>
        </p>
      </div>
      <div className="user-management">
        <div className="container">
          <div>
            <form className="col-md-4 m-auto" onSubmit={handleUpdate}>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                  onKeyDown={handleKeyDown}
                />
                {nameError && (
                  <div className="text-danger" style={{ fontSize: "14px" }}>
                    {nameError}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={email}
                  ref={emailInputRef}
                  onChange={handleEmailChange}
                ></input>
                {emailError && (
                  <div className="text-danger" style={{ fontSize: "14px" }}>
                    {emailError}
                  </div>
                )}
              </div>

              <button
                id="submit"
                className="btn btn-primary"
                onClick={(e) => handleUpdate(e)}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
