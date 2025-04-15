import React, { useEffect, useState } from "react";
import { businessHours } from "../Utils/Validations/ConvertTime";

const BusinessHours = (business_hours) => {
  const BusinessHours = business_hours?.business_hours || [];
  const AppointmentStatus = business_hours?.appointment_status;
  const [businessDays, setBusinessDays] = useState([]);

  const date = new Date().getDay() - 1;

  useEffect(() => {
    if (BusinessHours.length > 0) {
      const businessDay = () => {
        let updatedBusinessDays = [];

        // Loop from current day to the end of the week
        for (let i = date; i < BusinessHours.length; i++) {
          if (BusinessHours[i]) {
            updatedBusinessDays.push(BusinessHours[i]);
          }
        }

        // Loop from start of the week to current day
        for (let j = 0; j < date; j++) {
          if (BusinessHours[j]) {
            updatedBusinessDays.push(BusinessHours[j]);
          }
        }

        setBusinessDays(updatedBusinessDays);
      };

      businessDay();
    }
  }, [BusinessHours, date]);

  const allClosed = BusinessHours.every(
    (item) =>
      item?.opening_time === "00:00:00" && item?.closing_time === "00:00:00"
  );

  return (
    <div>
      {/* Both Appointment and Business Hours */}
      {(AppointmentStatus === true || AppointmentStatus === "True") &&
        !allClosed && (
          <>
            <p className="appintment-text">
              We accept clients by appointment only.
            </p>
            <div>
              {businessDays.length > 0 &&
                businessDays.map((item, index) =>
                  item ? (
                    <tr key={`business_hour_${index}`} className="flex">
                      <td style={{ minWidth: "100px" }}>
                        {item?.day || "No Day"}
                      </td>
                      <td>:&nbsp;</td>
                      <td>
                        {businessHours(
                          item?.opening_time,
                          item?.closing_time
                        ) ?? "No data available!"}
                      </td>
                    </tr>
                  ) : null
                )}
            </div>
          </>
        )}

      {/* Only Business Hours */}
      {(AppointmentStatus === false || AppointmentStatus === "False") &&
        !allClosed && (
          <div>
            {businessDays.length > 0 &&
              businessDays.map((item, index) =>
                item ? (
                  <tr key={`business_hour_${index}`} className="flex">
                    <td style={{ minWidth: "100px" }}>
                      {item?.day || "No Day"}
                    </td>
                    <td>:&nbsp;</td>
                    <td>
                      {businessHours(item?.opening_time, item?.closing_time) ??
                        "No data available!"}
                    </td>
                  </tr>
                ) : null
              )}
          </div>
        )}

      {/* Only Appointment */}
      {(AppointmentStatus === true || AppointmentStatus === "True") &&
        allClosed && (
          <p className="appintment-text">
            We accept clients by appointment only.
          </p>
        )}
    </div>
  );
};

export default BusinessHours;
