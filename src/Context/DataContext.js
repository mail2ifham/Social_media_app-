import { createContext, useEffect, useState } from "react";
import {useNavigate} from  "react-router-dom"
import useWindowsSize from "../hooks/useWindowsSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { format } from "date-fns";
import api from "../api/posts";


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [serchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowsSize();
  const { data, fetchError, isLoding } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`);
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
    const postDel = posts.filter((post) => post.id !== id);
    setPosts(postDel);
    navigate("/");
  };
  return (
    <DataContext.Provider
      value={{
        isLoding,
        width,
        setSearch,
        search,
        serchResults,
        setEditTitle,
        setPostTitle,
        setPostBody,
        setEditBody,
        fetchError,
        handleSubmit,
        handleEdit,
        postTitle,
        postBody,
        posts,
        editBody,
        editTitle,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
