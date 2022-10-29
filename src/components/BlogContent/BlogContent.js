import React from "react";
import './BlogContent.css';
import Post from "../Post/Post";
import AddPostForm from "./AddPostForm";
import axios from 'axios';

class BlogContent extends React.Component {

  state = {
    showAddForm: false,
    postsArr: [],
  }
  likePost = (pos) => {
    const temp = Array.from(this.state.postsArr);
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      postsArr: temp
    })

    localStorage.setItem('blogPosts', JSON.stringify(temp))
  }

  deletePost = (pos) => {
    if (window.confirm(`Are you sure you want to delete ${this.state.postsArr[pos].title}?`)) {
      const temp = [...this.state.postsArr];
      temp.splice(pos, 1);

      this.setState({
        postsArr: temp
      })
      localStorage.setItem('blogPosts', JSON.stringify(temp))
    }
  }

  handleShowForm = () => {
    this.setState({
      showAddForm: true
    })
  }
  handleHideForm = () => {
    this.setState({
      showAddForm: false
    })
  }

  handleEscape = (event) => {
    if (event.key === 'Escape' && this.state.showAddForm) {
      this.handleHideForm()
    }
  }
  addNewPost = (blogPost) => {
    this.setState((state) => {
      const posts = [...state.postsArr];
      posts.push(blogPost);
      localStorage.setItem('blogPosts', JSON.stringify(posts));
      return {
        postsArr: posts
      }
    })
   
  }

  componentDidMount() {
    axios.get('https://635bea26aa7c3f113dc9a068.mockapi.io/posts')
    .then((response) => {
      this.setState({
        postsArr: response.data
      })
    })
    .catch((error) => console.log(error));
    window.addEventListener('keydown', this.handleEscape)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape)
  }


  render() {

    const blogPosts = this.state.postsArr.map((item, pos) => {
      return (
        <Post
          key={item.id}
          title={item.title}
          article={item.article}
          liked={item.liked}
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(pos)}
        />
      )
    })

    if (this.state.postsArr.length === 0) {
      return <h1>Downloading</h1>
    }
    return (
      <>
      { this.state.showAddForm && 
      (<AddPostForm 
        hideForm={this.handleHideForm} 
        addPost={this.addNewPost}
        postsArr={this.state.postsArr}
         />)}
        
        <h1>My Blog</h1>
        <button className='btn' onClick={this.handleShowForm}>New Post</button>
        {blogPosts}
      </>
    )
  }
}

export default BlogContent;