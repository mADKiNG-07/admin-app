import "./a_datatable.scss";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AnalystDatable() {
  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "fName", headerName: "Analyst", width: 130 },
    { field: "lName", headerName: "Last name", width: 130, hide: true },
    {
      field: "dob",
      headerName: "dob",
      width: 90,
      hide: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "password",
      headerName: "Password",
      width: 90,
      hide: true,
    },
    {
      field: "country",
      headerName: "Country",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithCountry ${params.row.country}`}>
            <img
              src={`https://countryflagsapi.com/png/${params.row.country}`}
              alt=""
              width="20px"
            />
            {params.row.country}
          </div>
        );
      },
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 90,
      hide: true,
    },
    {
      field: "accountType",
      headerName: "Account Type",
      width: 150,
      hide: true,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.accountType}`}>
            {params.row.accountType}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Age",
      hide: true,
      width: 90,
    },
    {
      field: "updatedAt",
      headerName: "Age",
      hide: true,
      width: 90,
    },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://intrendsanalytics.herokuapp.com/users/viewAnalyst")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  });

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: "200",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <NavLink className="navlink" to={`/analyst/${params.row.email}`}>
              <button className="viewButton">
                <p>View</p>
              </button>
            </NavLink>
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}

export default AnalystDatable;
