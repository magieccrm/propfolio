import React from "react";

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllLeadSource } from "../../features/leadSource";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

export default function LeadSouceReport() {
  const [data, setdata] = useState({
    //   leadsource_id:'',
    // start_date:'',
    // end_date:''
  });

  const { leadSourcedata } = useSelector((state) => state.leadSource);
  const dispatch = useDispatch();

  const customStyles = {
    cells: {
      style: {
        border: "1px solid #ddd", // Set the cell border
        fontSize: "14px",
      },
    },
    headCells: {
      style: {
        border: "1px solid #111", // Set the header cell border
        fontSize: "14px",
      },
    },
    rows: {
      style: {
        borderRight: "none", // Remove vertical borders
      },
    },
  };

  useEffect(() => {
    dispatch(getAllLeadSource());
  }, []);
  const [getLeadData, setLeadData] = useState([]);

  const getLeadSourceData = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const responce = await axios.post(
        `https://crm-backend-1qcz.onrender.com/api/v1/LeadSourceReport`,
        data,
        { headers }
      );
      setLeadData(responce?.data?.leadSource);
      toast(responce?.data?.message);
    } catch (error) {
      setLeadData();
      toast(error?.response?.data?.message);
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
      selector: (row) => row?.full_name,
      sortable: true,
    },
    {
      name: "Lead Cast",
      selector: (row) => row?.lead_cost,
      sortable: true,
    },
  ];

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
                              <form onSubmit={getLeadSourceData}>
                                <div className="row">
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <select
                                        className="form-control"
                                        onChange={(e) =>
                                          setdata({
                                            ...data,
                                            leadsource_id: e.target.value,
                                          })
                                        }
                                        name="leadsource_id"
                                      >
                                        <option value="">
                                          Select lead Source
                                        </option>
                                        {leadSourcedata?.leadSource?.map(
                                          (leadSource1) => {
                                            return (
                                              <option value={leadSource1?._id}>
                                                {leadSource1?.lead_source_name}
                                              </option>
                                            );
                                          }
                                        )}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-3">
                                    <div className="form-group">
                                      <input
                                        name="start_date"
                                        onChange={(e) =>
                                          setdata({
                                            ...data,
                                            start_date: e.target.value,
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
                                        name="end_date"
                                        onChange={(e) =>
                                          setdata({
                                            ...data,
                                            end_date: e.target.value,
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

                        {/* addtable */}

                        <DataTable
                          className="custom-datatable"
                          responsive
                          id="table-to-export"
                          columns={columns}
                          data={getLeadData}
                          pagination
                          fixedHeader
                          fixedHeaderScrollHeight="550px"
                          selectableRowsHighlight
                          highlightOnHover
                          subHeader
                          customStyles={customStyles}
                        />
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
