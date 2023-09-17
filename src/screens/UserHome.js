import React, { useState, useRef } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { loadBlockchainData, loadWeb3 } from "../Web3Helpers";
import generatePDF from "react-to-pdf";

export default function UserHome() {
  const [rollNumber, setRollNumber] = React.useState("");
  const [accounts, setAccounts] = React.useState(null);
  const [smartContract, setSmartContract] = React.useState(null);

  const [data, setData] = useState(null);

  const targetRef = useRef();

  const loadAccounts = async () => {
    let { smartContract, accounts } = await loadBlockchainData();
    setAccounts(accounts);
    setSmartContract(smartContract);
  };

  const verify = async () => {
    try {
      const res = await smartContract.methods
        .certificateList(rollNumber.toString())
        .call();

      if (res.rollNumber === "") {
        window.alert("Your details are not issued yet");
        return;
      }

      setData(res);
    } catch (e) {}
  };

  React.useEffect(() => {
    loadWeb3();
  }, []);

  React.useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <div>
      <Header title={"User"} />

      <input
        style={input}
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        placeholder="Roll Number"
        type="number"
      />

      <button style={button} onClick={verify}>
        {" "}
        Verify
      </button>

      {data && (
        <>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            ref={targetRef}
          >
            <h4 style={{ margin: 2 }}>
              Roll ID:
              <span style={{ color: "#3053CA " }}> {data?.rollNumber}</span>
            </h4>

            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <h3 style={{ marginRight: 10, color: "#4FCA30" }}>
                {data?.college}
              </h3>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJlqcyAS2ZznI36Uv_DEsdznaVXZbzWzmMKg&usqp=CAU"
                style={image}
                alt="geeks"
              />
            </div>

            <h1 style={{ margin: 2 }}> Certificate </h1>

            <p style={{ fontWeight: "bold", color: "#9E30CA" }}>
              {" "}
              This is to Ceritify that {data?.username} has successfully
              completed course {data?.course}{" "}
            </p>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <h4 style={{ marginRight: 20 }}> Date:{data?.date}</h4>
              <h4> Issued by {data?.issuedBy}</h4>
            </div>
          </div>

          <button
            style={button2}
            onClick={() => generatePDF(targetRef, { filename: "user.pdf" })}
          >
            Download PDF
          </button>
        </>
      )}
    </div>
  );
}

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

const button2 = {
  width: 300,
  padding: 10,
  borderRadius: 10,
  margin: 10,
  cursor: "pointer",
  fontSize: 17,
  color: "white",
  backgroundColor: "red",
  border: "none",
};

const image = {
  width: 50,
  height: 50,
  objectFit: "contain",
  borderRadius: 70,
};
