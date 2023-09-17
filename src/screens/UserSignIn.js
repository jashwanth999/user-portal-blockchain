import * as React from "react";
import { loadBlockchainData, loadWeb3 } from "../Web3Helpers";
import { useNavigate } from "react-router-dom";

export default function UserSignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const [accounts, setAccounts] = React.useState(null);
  const [smartContract, setSmartContract] = React.useState(null);

  const loadAccounts = async () => {
    let { smartContract, accounts } = await loadBlockchainData();
    setAccounts(accounts);
    setSmartContract(smartContract);
  };

  const login = async () => {
    if (!email || !password) {
      alert("please fill all details");
      return;
    }

    try {
      const res = await smartContract.methods.usersList(email).call();

      if (res.password === password) {
        localStorage.setItem("useremail", email);
        localStorage.setItem("account", accounts);
        navigate("/user-home");
      } else {
        alert("wrong user credentials or please signup");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  React.useEffect(() => {
    loadWeb3();
  }, []);

  React.useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <div style={rootDiv}>
      <h3>USER</h3>
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

      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/user-signup");
        }}
      >
        {" "}
        Create new account{" "}
      </span>
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
