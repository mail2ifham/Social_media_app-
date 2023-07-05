import React from "react";
import Feed from "./Feed";

const Home = ({ posts, fetchError, isLoding }) => {
  return (
    <main className="Home">
      {isLoding && <p className="statusMsg">Loading posts...</p>}
      {!isLoding && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!isLoding && !fetchError && posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p className="statusMsg" style={{ marginTop: "2rem" }}>No posts to display...</p>
      )}
    </main>
  );
};

export default Home;
