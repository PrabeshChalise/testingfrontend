import React, { useState } from "react";
import Header from "./header";

function AddWorker() {
  const [workerName, setWorkerName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState(0);
  const [workingHours, setWorkingHours] = useState("");
  const [salaryPayable, setSalaryPayable] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workerData = {
      name: workerName, // Corrected key here
      role,
      salary,
      workingHour: workingHours, // Corrected key here
      salaryPayable: salaryPayable === 0 ? "paid" : "unpaid",
      status: salaryPayable === 0 ? "paid" : "unpaid", // Assuming status is based on salaryPayable
    };

    try {
      const response = await fetch(
        "https://testing-am67.onrender.com/api/workers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workerData),
        }
      );

      if (response.ok) {
        // Handle successful response as needed
        console.log("Worker added successfully");
      } else {
        console.error("Error adding worker");
      }
    } catch (error) {
      console.error("Error adding worker:", error);
    }

    // Reset form fields after submission
    setWorkerName("");
    setRole("");
    setSalary(0);
    setWorkingHours("10AM - 5PM");
    setSalaryPayable(0);
  };

  return (
    <body>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <Header />

      <div className="hero-section-worker">
        <form onSubmit={handleSubmit}>
          <table style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Worker name</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Working hour</th>
                <th>Salary payable</th>
                <th>Status</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(parseFloat(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={salaryPayable}
                    onChange={(e) =>
                      setSalaryPayable(parseFloat(e.target.value))
                    }
                  />
                </td>
                <td>
                  {salaryPayable === 0 ? (
                    "Paid"
                  ) : (
                    <span>
                      Unpaid{" "}
                      <i
                        className="fa-solid fa-exclamation-circle"
                        style={{ color: "red" }}
                      ></i>
                    </span>
                  )}
                </td>
                <td>
                  <button className="click-button" type="submit">
                    Add Worker{" "}
                    <i
                      className="fa-solid fa-plus"
                      style={{ color: "#aaa" }}
                    ></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </body>
  );
}

export default AddWorker;
