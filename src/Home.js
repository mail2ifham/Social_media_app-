import React, { useContext } from "react";
import Feed from "./Feed";
import DataContext from "./Context/DataContext";

const Home = () => {
  const { serchResults, fetchError, isLoding } = useContext(DataContext)
  return (
    <main className="Home">
      {isLoding && <p className="statusMsg">Loading posts...</p>}
      {!isLoding && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!isLoding && !fetchError && serchResults.length ? (
        <Feed posts={serchResults} />
      ) : (
        <p className="statusMsg" style={{ marginTop: "2rem" }}>No posts to display...</p>
      )}
    </main>
  );
};

export default Home;
