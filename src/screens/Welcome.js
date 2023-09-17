import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const useremail = localStorage.getItem("useremail");
  const adminemail = localStorage.getItem("adminemail");

  useEffect(() => {
    if (useremail) {
      navigate("/user-home");
    }
    if (adminemail) {
      navigate("/admin-home");
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h3>User Portal</h3>
      <button
        style={button}
        onClick={() => {
          navigate("user-signin");
        }}
      >
        {" "}
        User
      </button>
      <button
        style={button}
        onClick={() => {
          navigate("admin-signin");
        }}
      >
        {" "}
        Admin
      </button>
    </div>
  );
}

const button = {
  width: 325,
  padding: 10,
  borderRadius: 10,
  margin: 10,
  cursor: "pointer",
  fontSize: 17,
  color: "white",
  backgroundColor: "#9D27CD",
  border: "none",
};
