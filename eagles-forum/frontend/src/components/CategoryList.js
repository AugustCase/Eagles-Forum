import React from "react";

function CategoryList({ categories, onSelectCategory, selected }) {
  return (
    <div
      className="category-list"
      style={{
        width: "200px",
        borderRight: "1px solid #ccc",
        padding: "1rem",
        height: "calc(100vh - 60px)",
        overflowY: "auto",
      }}
    >
      <h4>Categories</h4>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => onSelectCategory(category)}
            style={{
              padding: "0.5rem",
              marginBottom: "0.25rem",
              cursor: "pointer",
              backgroundColor: selected === category ? "#eee" : "transparent",
              fontWeight: selected === category ? "bold" : "normal",
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
