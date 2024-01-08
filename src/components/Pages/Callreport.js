import React from "react";
import LineChart1 from "../LineChart1";
import Chart from "react-apexcharts";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductService } from "../../features/product_serviceSlice";
import { getAllAgent } from "../../features/agentSlice";
import DataTable from "react-data-table-component";
export default function Callreport() {
  const [data, setdata] = useState([]);
  const [total, settotal] = useState([]);
  const { ProductService } = useSelector((state) => state.ProductService);
  var { agent } = useSelector((state) => state.agent);

  const dispatch = useDispatch();
  const getAllLeadSourceOverview = async () => {
    try {
      const responce = await axios.get(
        "https://crm-backend-1qcz.onrender.com/api/v1/Income_Graph_Overview"
      );
      setdata(responce?.data?.monthlyIncom);
      let totalamount = 0;
      data.map((ddddd) => {
        totalamount += parseInt(ddddd);
        settotal(totalamount);
      });

      console.log(responce?.data?.monthlyIncom);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // dispatch(getAllProductService());
    //  getAllLeadSourceOverview();
    dispatch(getAllAgent());
  }, []);
  const [leads, setleads] = useState([]);
  const [search, setsearch] = useState("");
  const [filterleads, setfilterleads] = useState([]);

  const getEmployeeReport = async (e) => {
    e.preventDefault();
    console.log(search);
    try {
      const response = await axios.post(
        "https://crm-backend1-awl0.onrender.com/api/v1/GetCallLogByIdAndDateRange",
        search,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response?.data);
      setleads(response?.data?.CallLogs);
      setfilterleads(response?.data?.CallLogs);
    } catch (error) {
      console.error(error);
      setfilterleads([]);
    }
  };
  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Client Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Mobile No.",
      selector: (row) => row?.phone_number,
      sortable: true,
    },
    {
      name: "Call Date Time",
      selector: (row) => row?.datetime,
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => row?.duration,
      sortable: true,
    },
    {
      name: "Call Type",
      selector: (row) => (row?.type !== "UNKNOWN" ? row?.type : "REJECTED"),
      sortable: true,
      style: (row) => ({
        color: (row.type = "UNKNOWN"
          ? "red"
          : (row.type = "INCOMING"
              ? "green"
              : (row.type = "OUTGOING" ? "yellow" : "red"))),
      }),
    },
  ];

  const customStyles = {
    cells: {
      style: {
        border: "0px solid #ddd", // Set the cell border
        fontSize: "14px",
        // background: "#f4f3fe",
      },
    },
    headCells: {
      style: {
        border: "0px solid #111", // Set the header cell border
        fontSize: "14px",
        background: "#f0f0f0",
      },
    },
    rows: {
      style: {
        background: "#fdf1f1", // Set the default background color
      },
    },
    highlightOnHover: {
      style: {
        background: "#f4f3fe", // Set the background color on hover
      },
    },
    striped: {
      style: {
        background: "#f8f9fa", // Set the background color for striped rows
      },
    },
  };

  return (
    <div>
      <div className="content-wrapper">
        <section className="content">
          <div className="container pl-0">
            <div className="row pl-0 pr-0">
              <div className="col-12 pl-0 pr-0">
                <div className="panel-body pt-2">
                  <div className="panel-headinges panel panel-bd lobidrag lobipanel">
                    <div className="custom-card-header  bg-white">
                      <h4>Income Report</h4>
                    </div>
                    <div className="pt-3">
                      <div className="bg-white">
                        <div className="col-sm-12 col-md-12 col-xs-12">
                          <div className="cards pt-2">
                            <div
                              className="serach-lists"
                              style={{ padding: 0 }}
                            >
                              <form onSubmit={getEmployeeReport}>
                                <div className="row">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <select
                                        className="form-control"
                                        name="user_id"
                                        required
                                        onChange={(e) =>
                                          setsearch({
                                            ...search,
                                            user_id: e.target.value,
                                          })
                                        }
                                      >
                                        <option value="">
                                          Select Employee
                                        </option>

                                        {agent?.agent?.map((agents, key) => {
                                          return (
                                            <option value={agents._id}>
                                              {agents.agent_name}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <input
                                        name="startDate"
                                        onChange={(e) =>
                                          setsearch({
                                            ...search,
                                            startDate: e.target.value,
                                          })
                                        }
                                        placeholder="Choose Date From"
                                        type="date"
                                        className="form-control"
                                        autoComplete="off"
                                        defaultValue=""
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <input
                                        name="endDate"
                                        onChange={(e) =>
                                          setsearch({
                                            ...search,
                                            endDate: e.target.value,
                                          })
                                        }
                                        placeholder="Choose Date To"
                                        type="date"
                                        className="form-control"
                                        autoComplete="off"
                                        defaultValue=""
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-2 col-sm-12">
                                    <div className="form-group">
                                      <button
                                        type="submit"
                                        className="btn btn-success form-control"
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12"></div>
                        </div>
                        <div className="card-headers">
                          <div className="table-responsive mob-bord">
                            <DataTable
                              responsive
                              id="table-to-export"
                              columns={columns}
                              data={filterleads}
                              pagination
                              fixedHeader
                              fixedHeaderScrollHeight="550px"
                              //selectableRows
                              selectableRowsHighlight
                              highlightOnHover
                              subHeader
                              customStyles={customStyles}
                              striped
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}