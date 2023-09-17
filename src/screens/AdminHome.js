import React from "react";
import Header from "../components/Header";
import CustomTab from "../components/CustomTab";

export default function AdminHome() {
  return (
    <div>
      <Header title={"Admin"} />
      <CustomTab />
    </div>
  );
}
