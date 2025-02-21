import React from "react";

function PasswordChange() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="card card-outline-secondary">
              <div className="card-header" style={{ background: "#009688", color: "#fff" }}>
                <h3 className="mb-0">Change Password</h3>
              </div>
              <div className="card-body">
                <form className="form" role="form" autocomplete="off">
                  <div className="form-group">
                    <label for="inputPasswordOld">Current Password</label>
                    <input
                      type="password"
                      className="form-control mt-1 mb-2"
                      id="inputPasswordOld"
                      required=""
                    />
                  </div>
                  <div className="form-group">
                    <label for="inputPasswordNew">New Password</label>
                    <input
                      type="password"
                      className="form-control mt-1 mb-2"
                      id="inputPasswordNew"
                      required=""
                    />
                  </div>
                  <div className="form-group">
                    <label for="inputPasswordNewVerify">Verify</label>
                    <input
                      type="password"
                      className="form-control mt-1 mb-2"
                      id="inputPasswordNewVerify"
                      required=""
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-success btn-lg float-right"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordChange;
