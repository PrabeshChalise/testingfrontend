import React from "react";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar1">
          {" "}
          {/* Use "className" instead of "class" for CSS classes */}
          <h1 className="logo1">SeroFero</h1>{" "}
          {/* Use "className" instead of "class" for CSS classes */}
          <div className="ahref">
            <a href="/">Home</a>
            <a href="/user">Users</a>
            <a href="/product">Products</a>
            <a href="/worker">Workers</a>
            <a href="/setting">Settings</a>
          </div>
          <input
            type="text"
            name="search"
            id="search1"
            placeholder="search here"
          />
          <button>
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ color: "#121212" }}
            ></i>{" "}
            {/* Use "className" and double curly braces for inline styles */}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
