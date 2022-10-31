import React from "react";
import './BlogContent.css';
import Post from "../Post/Post";
import AddPostForm from "./AddPostForm";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

class BlogContent extends React.Component {

  state = {
    showAddForm: false,
    postsArr: [],
    isPending: false,
  }

  likePost = (blogPost) => {
    const temp = {...blogPost};
    temp.liked = !temp.liked;

    axios.put(`https://635bea26aa7c3f113dc9a068.mockapi.io/posts/${blogPost.id}`, temp)
    .then((response) => {
      console.log('Post has been modified', response.data)
      this.getPost()
    })
    .catch((error) => console.log(error));
  }

  getPost = () => {
   
    axios.get('https://635bea26aa7c3f113dc9a068.mockapi.io/posts')
      .then((response) => {
        this.setState({
          postsArr: response.data,
          isPending: false
        })
      })
      .catch((error) => console.log(error));
  }
  addNewPost = (blogPost) => {
    this.setState({
      isPending: true
    })
    axios.post('https://635bea26aa7c3f113dc9a068.mockapi.io/posts', blogPost)
      .then((response) => {
        console.log('Post has been created => ', response.data);
        this.getPost();
      })
      .catch((error) => console.log(error))

  }

  deletePost = (blogPost) => {
    this.setState({
      isPending: true
    })

    if (window.confirm(`Are you sure you want to delete ${blogPost.title}?`)) {
      axios.delete(`https://635bea26aa7c3f113dc9a068.mockapi.io/posts/${blogPost.id}`)
        .then((response) => {
          console.log('Post has been deleted ', response.data)
          this.getPost()
        })
        .catch((error) => console.log(error))
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




  componentDidMount() {
    this.getPost()
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
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
        />
      )
    })

    if (this.state.postsArr.length === 0) {
      return <h1>Downloading</h1>
    }
    const postsOpacity = this.state.isPending ? 0.5 : 1
    return (
      <div className='blogPage'>
        {this.state.showAddForm &&
          (<AddPostForm
            hideForm={this.handleHideForm}
            addPost={this.addNewPost}
            postsArr={this.state.postsArr}
          />)}

        <h1>My Blog</h1>
        <button className='btn' onClick={this.handleShowForm}>New Post</button>
       
        <div className='posts' style={{opacity: postsOpacity}}>
          {this.state.isPending && <CircularProgress className='loader'/>}
          {blogPosts}
      
        </div>
      </div>
    )
  }
}

export default BlogContent;