import React, { useState } from "react";
import { articles } from "./data";

function App() {
  const [searchText, setSearchText] = useState("");

  const highlightText = (text) => {
    /* If searchText is empty (the user hasn't typed anything) */
    if (!searchText) return text;

    /* Create a case-insensitive regex */
    const regex = new RegExp(`(${searchText})`, "gi"); 
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (part.toLowerCase() === searchText.toLowerCase()) {
        return (
          <span key={index} style={{ backgroundColor: "yellow" }}>
            {part}
          </span>
        );
      } else {
        return part;
      }
    });
  };

  const filteredArticles = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchText.toLowerCase()) ||
      article.content.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  let content;

  if (searchText === "") {
    content = <p>0 posts. Search for a post.</p>;
  } else if (filteredArticles.length > 0) {
    content = (
      <div>
        <p>{filteredArticles.length} posts found.</p>
        {filteredArticles.map((article) => (
          <div key={article.id} style={{ marginBottom: "20px" }}>
            <h3>{highlightText(article.title)}</h3>
            <p>{article.date}</p>
            <p>{highlightText(article.content)}</p>
          </div>
        ))}
      </div>
    );
  } else {
    content = <p>No posts found.</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} // Update search text
        style={{
          width: "70%",
          marginLeft: "15%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />
      {content}
    </div>
  );
}

export default App;
