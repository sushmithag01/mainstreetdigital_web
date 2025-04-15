import React from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RecentActivities = ({ headers, recentActivity }) => {
  const navigate = useNavigate();

  const NavigateHandler = (flag) => {
    if (flag === "voucher") {
      navigate("/my-account/my-vouchers");
    } else {
      navigate("/my-account/my-coupons");
    }
  };
  return (
    <div className="dashboard_Table_Div">
      <p className="page-text recent-text">Recent Activities</p>
      <Table responsive="xl" className="recentact-table mt-3">
        <thead>
          <tr>
            {headers.map((i, index) => {
              return <th key={index}>{i}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {recentActivity.map((data, index) => {
            return (
              <tr key={index}>
                <td>
                  <a
                    className="dashboard_Offer"
                    onClick={() => NavigateHandler(data.flag)}
                  >
                    {data.offer}
                  </a>
                </td>
                <td>{data.merchant_name}</td>
                <td className="date-col">{data.date}</td>
                <td className="recentact-status">{data.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {recentActivity.length === 0 ? (
        <p className="NoDataAvailable" style={{ color: "black" }}>
          No data available!
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RecentActivities;
