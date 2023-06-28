import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Post from "./Post";
import Missing from "./Missing";
import PostLayout from "./PostLayout";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { useState } from "react";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "sunt aut facere ",
      datetime: "July 01 2023 11:14:36 AM",
      body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      id: 2,
      title: "qui est esse",
      datetime: "July 04 2023 08:41:12 AM",
      body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
      id: 3,
      title: "ea molestias quasi ",
      datetime: "July 07 2023 01:28:36 AM",
      body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut",
    },
    {
      id: 4,
      title: "eum et est occaecati",
      datetime: "July 15 2023 10:14:40 AM",
      body: "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit",
    },
  ]);
  const [search, setSearch] = useState("");
  const [serchResults, setSearchResults] = useState([]);
  

  return (
    <div className="App">
      <Header title={"Social Media"} />
      <Nav setSearch={setSearch} search={search} />
      <Home posts={posts}/>
      <NewPost />
      <PostPage />
      <About />
      <Missing />
      <Footer />
    </div>
  );
}

export default App;
