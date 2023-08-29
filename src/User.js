import React, { useState, useEffect } from "react";
import Header from "./header";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        // const response = await fetch("http://localhost:80/api/users");
        const response = await fetch(
          "https://testing-am67.onrender.com/api/users"
        );
        console.log("API Response:", response); // Log the API response
        const data = await response.json();
        console.log("Fetched data:", data);
        setUsers(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <Header />
      <h2 style={{ justifyContent: "center", textAlign: "center" }}>
        Total users: {users.length}
      </h2>
      <div className="user-hero-section">
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Contact</th> */}
              <th>Last visited</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.lastVisited.toLocaleString()}</td>
                <td>{user.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
