import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { loadBlockchainData, loadWeb3 } from "../Web3Helpers";
import readXlsxFile from "read-excel-file";
import generatePDF from "react-to-pdf";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomTab() {
  const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState("");
  const [rollNumber, setRollNumber] = React.useState("");
  const [collegeName, setCollegeName] = React.useState("");
  const [specialization, setSpecialization] = React.useState("");
  const [issuedBy, setIssuedBy] = React.useState("");
  const [date, setDate] = React.useState("");
  const [course, setCourse] = React.useState("B.Tech");
  const [isIssued, setIsIssued] = React.useState(false);

  const [xcel, setXcel] = React.useState(null);

  const [data, setData] = React.useState(null);

  const [accounts, setAccounts] = React.useState(null);
  const [smartContract, setSmartContract] = React.useState(null);

  const [certificateCount, setCertificateCount] = React.useState(0);

  const targetRef = React.useRef();
  const loadAccounts = async () => {
    let { smartContract, accounts } = await loadBlockchainData();

    setAccounts(accounts);
    setSmartContract(smartContract);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getCeritificateCount = async () => {
    try {
      const res = await smartContract.methods.certificateCount().call();
      setCertificateCount(res);
    } catch (e) {
      console.log(e);
    }
  };

  const issueCertificate = async (
    _name,
    _rollNumber,
    _course,
    _collegeName,
    _date,
    _specialization,
    _issuedBy
  ) => {
    console.log(
      _name,
      _rollNumber,
      _course,
      _collegeName,
      _date,
      _specialization,
      _issuedBy
    );
    if (
      _name === "" ||
      _rollNumber === "" ||
      _course === "" ||
      _collegeName === "" ||
      _date === "" ||
      _specialization === "" ||
      _issuedBy === ""
    ) {
      window.alert("Please fill all details");
      return;
    }
    try {
      const res = await smartContract.methods
        .certificateList(_rollNumber.toString())
        .call();

      console.log(res);

      if (res.rollNumber !== "") {
        window.alert(
          "Certificate is already issued , please enter valid rollNumber"
        );
        return;
      }

      await smartContract.methods
        .createCertificate(
          _name,
          _rollNumber.toString(),
          _course,
          _collegeName,
          _date,
          _specialization,
          _issuedBy
        )
        .send({ from: accounts });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    loadWeb3();
  }, []);

  React.useEffect(() => {
    getCeritificateCount();
  });

  React.useEffect(() => {
    loadAccounts();
  }, []);

  const onFileChange = (e) => {
    e.preventDefault();
    setXcel(e.target.files[0]);
  };

  const upload = async () => {
    if (!xcel) {
      window.alert("please upload xcel file");
      return;
    }

    try {
      const res = await readXlsxFile(xcel);
      for (let i = 1; i < res.length; i++) {
        // name,
        // rollNumber,
        // course,
        // collegeName,
        // date,
        // specialization,
        // issuedBy
        issueCertificate(
          res[i][0],
          res[i][1],
          res[i][2],
          res[i][3],
          res[i][4],
          res[i][5],
          res[i][6]
        );
      }
    } catch (e) {}
  };

  const verifyCertificate = async () => {
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

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Form" {...a11yProps(0)} />
          <Tab label="Upload" {...a11yProps(1)} />
          <Tab label="Verify" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h3 style={{ position: "absolute", right: 60 }}>
              Total Certificates: {certificateCount}{" "}
            </h3>
            <h4 style={{ margin: 0, paddingLeft: 10 }}>
              Username <span style={{ color: "red" }}>*</span>
            </h4>
            <input
              style={input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              type="text"
            />
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h4 style={{ margin: 0, paddingLeft: 10 }}>
                Roll Number <span style={{ color: "red" }}>*</span>
              </h4>
              <input
                style={input}
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Roll Number"
                type="number"
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",

              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <label for="Course">
              <h4 style={{ marginLeft: 10 }}>
                {" "}
                Course <span style={{ color: "red" }}>*</span>{" "}
              </h4>
            </label>
            <select
              style={{ width: 100, padding: 10, margin: 10 }}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="B.Tech<">B.Tech</option>
              <option value="MBA">MBA</option>
              <option value="M.Tech"> M.Tech</option>
              <option value="MCA">MCA</option>
            </select>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h4 style={{ margin: 0, paddingLeft: 10 }}>
              College <span style={{ color: "red" }}>*</span>
            </h4>
            <input
              style={input}
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="College"
              type="text"
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h4 style={{ margin: 0, paddingLeft: 10 }}>
              Date<span style={{ color: "red" }}>*</span>
            </h4>
            <input
              style={input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h4 style={{ margin: 0, paddingLeft: 10 }}>
              Specialization <span style={{ color: "red" }}>*</span>
            </h4>
            <input
              style={input}
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="Specialization"
              type="text"
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h4 style={{ margin: 0, paddingLeft: 10 }}>
              Issued by <span style={{ color: "red" }}>*</span>
            </h4>
            <input
              style={input}
              value={issuedBy}
              onChange={(e) => setIssuedBy(e.target.value)}
              placeholder="Issued By"
              type="text"
            />
          </div>
          <button
            onClick={() => {
              issueCertificate(
                name,
                rollNumber,
                course,
                collegeName,
                date,
                specialization,
                issuedBy
              );
            }}
            style={button2}
          >
            {" "}
            Issue
          </button>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <input type="file" onChange={onFileChange} />

        <button onClick={upload} style={button2}>
          {" "}
          Upload
        </button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <input
          style={input}
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Roll Number"
          type="number"
        />
        <button onClick={verifyCertificate} style={button2}>
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
              style={button3}
              onClick={() => generatePDF(targetRef, { filename: "user.pdf" })}
            >
              Download PDF
            </button>
          </>
        )}
      </CustomTabPanel>
    </Box>
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
  width: 100,
  padding: 10,
  borderRadius: 10,
  marginTop: 20,
  cursor: "pointer",
  fontSize: 17,
  color: "white",
  backgroundColor: "#9D27CD",
  border: "none",
  height: 40,
};

const button2 = {
  width: 325,
  padding: 10,
  borderRadius: 10,
  marginRight: 100,
  cursor: "pointer",
  fontSize: 17,
  color: "white",
  backgroundColor: "#9D27CD",
  border: "none",
  height: 40,
  marginTop: 10,
};

const button3 = {
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
