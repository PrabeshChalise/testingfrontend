import React, { useState, useEffect } from "react";
import Header from "./header";
import Modal from "react-modal";

function Worker() {
  const [workerData, setWorkerData] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (worker) => {
    setSelectedWorker(worker);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedWorker(null);
    setIsDeleteModalOpen(false);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://testing-am67.onrender.com/api/workers/${selectedWorker._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Worker deleted successfully");
        closeDeleteModal(); // Close the delete modal
        fetchWorkerData(); // Refresh the worker data after delete
      } else {
        console.error("Error deleting worker");
      }
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  const [updateData, setUpdateData] = useState({
    name: "",
    role: "",
    salary: 0,
    workingHour: "",
    salaryPayable: 0,
    status: "",
  });

  useEffect(() => {
    fetchWorkerData();
  }, []);

  const fetchWorkerData = async () => {
    try {
      const response = await fetch(
        "https://testing-am67.onrender.com/api/workers"
      );
      if (response.ok) {
        const data = await response.json();
        setWorkerData(data);
      } else {
        console.error("Error fetching worker data");
      }
    } catch (error) {
      console.error("Error fetching worker data:", error);
    }
  };

  const openViewModal = (worker) => {
    setSelectedWorker(worker);
    setIsViewModalOpen(true);
  };

  const openUpdateModal = (worker) => {
    setSelectedWorker(worker);
    setIsUpdateModalOpen(true);
    setUpdateData(worker); // Set initial update data
  };
  const closeModals = () => {
    setSelectedWorker(null);
    setIsViewModalOpen(false);
    setIsUpdateModalOpen(false);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://testing-am67.onrender.com/api/workers/${selectedWorker._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        console.log("Worker updated successfully");
        closeModals();
        fetchWorkerData(); // Refresh the worker data after update
      } else {
        console.error("Error updating worker");
      }
    } catch (error) {
      console.error("Error updating worker:", error);
    }
  };

  return (
    <body>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <Header />
      <div className="user-header">
        <h1>Total Workers: {workerData.length}</h1>
      </div>
      <div className="buttons">
        <a href="/add-worker">
          <button className="button-next1">
            Add worker{" "}
            <i className="fa-solid fa-plus" style={{ color: "#aaa" }}></i>
          </button>
        </a>
        {/* ... */}
      </div>
      <div className="hero-section-worker">
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
            {workerData.map((worker) => (
              <tr key={worker._id}>
                <td>{worker.name}</td>
                <td>{worker.role}</td>
                <td>{worker.salary}</td>
                <td>{worker.workingHour}</td>
                <td>{worker.salaryPayable}</td>
                <td>
                  {worker.status === "paid" ? (
                    <span>
                      Paid{" "}
                      <i
                        className="fa-solid fa-check"
                        style={{ color: "#aaa" }}
                      ></i>
                    </span>
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
                  <button
                    className="click-button"
                    onClick={() => openViewModal(worker)}
                  >
                    View{" "}
                    <i
                      className="fa-regular fa-eye"
                      style={{ color: "#aaa" }}
                    ></i>
                  </button>
                  <button
                    className="click-button"
                    onClick={() => openDeleteModal(worker)}
                  >
                    Delete{" "}
                    <i class="fa-solid fa-trash" style={{ color: "#aaa" }}></i>
                  </button>
                  <button
                    className="click-button"
                    onClick={() => openUpdateModal(worker)}
                  >
                    Update
                    <i
                      class="fa-solid fa-pen-to-square"
                      style={{ color: "#aaa" }}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isViewModalOpen}
        onRequestClose={closeModals}
        contentLabel="Worker Details"
      >
        {selectedWorker && (
          <div>
            <h2>Worker Details</h2>
            <p>Name: {selectedWorker.name}</p>
            <p>Role: {selectedWorker.role}</p>
            <p>Salary: {selectedWorker.salary}</p>
            <p>Working Hours: {selectedWorker.workingHour}</p>
            <p>Salary Payable: {selectedWorker.salaryPayable}</p>
            <p>Status: {selectedWorker.status}</p>
            <button onClick={closeModals}>Close</button>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={closeModals}
        contentLabel="Update Worker"
      >
        {selectedWorker && (
          <div>
            <h2>Update Worker</h2>
            <form onSubmit={handleUpdateSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={updateData.name}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, name: e.target.value })
                  }
                />
              </label>
              <label>
                Role:
                <input
                  type="text"
                  value={updateData.role}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, role: e.target.value })
                  }
                />
              </label>
              <label>
                Salary:
                <input
                  type="number"
                  value={updateData.salary}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      salary: parseFloat(e.target.value),
                    })
                  }
                />
              </label>
              <label>
                Working Hour:
                <input
                  type="text"
                  value={updateData.workingHour}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      workingHour: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Salary Payable:
                <input
                  type="number"
                  value={updateData.salaryPayable}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      salaryPayable: parseFloat(e.target.value),
                    })
                  }
                />
              </label>
              <label>
                Status:
                <select
                  value={updateData.status}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, status: e.target.value })
                  }
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </label>
              <button type="submit">Update</button>
            </form>
            <button onClick={closeModals}>Close</button>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Worker"
      >
        {selectedWorker && (
          <div>
            <h2>Delete Worker</h2>
            <p>Are you sure you want to delete this worker?</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={closeDeleteModal}>Cancel</button>
          </div>
        )}
      </Modal>
    </body>
  );
}

export default Worker;
