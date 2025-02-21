import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

function CreateUser() {
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

  const header = { "Access-Control-Allow-Origin": "*" };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      // If inputs are valid, make the API call
      axios
        .post(`https://6752a111d1983b9597b6c52c.mockapi.io/crud-react`, {
          name: name,
          email: email,
          header,
        })
        .then(() => {
          toast.success("User has been added!");
          setName("");
          setEmail("");
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          toast("Error adding user.");
        });
    }
  };

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
            <form className="col-md-4 m-auto" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
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
                <label htmlFor="email" className="form-label">
                  Email
                </label>
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
                className="btn btn-success"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
