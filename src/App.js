import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Posts from './components/Posts';
import Pagination from './components/Pagination';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(res.data);
      setLoading(false);
    }

    fetchPosts();
  }, [])

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = number => setCurrentPage(number);

  return (
    <div className="container">
      <h1 className="color text-center mt-3 mb-3">My app with pagination</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination 
        paginate={paginate}
        postsPerPage={postsPerPage} 
        totalPosts={posts.length} 
      />
    </div>
  );
}

export default App;
