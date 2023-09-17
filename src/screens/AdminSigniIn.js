import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      window.alert("Please fill all details");
      return;
    }

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("adminemail", email);
      navigate("/admin-home");
    } else {
      window.alert("Please enter valid credentials");
    }
  };

  return (
    <div style={rootDiv}>
      <h3>Admin</h3>
      {/* <img
        src="https://media.geeksforgeeks.org/wp-content/uploads/20210318103632/gfg.png"
        style={image}
        alt="geeks"
      /> */}
      <input
        style={input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
      />
      <input
        style={input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button style={button} onClick={login}>
        {" "}
        Sign In
      </button>
    </div>
  );
}

const rootDiv = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const input = {
  width: 300,
  padding: 10,
  margin: 10,
  borderRadius: 10,
  outline: "none",
  border: "2px solid grey",
  fontSize: 17,
};

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

const image = {
  width: 70,
  height: 70,
  objectFit: "contain",
  borderRadius: 70,
};
