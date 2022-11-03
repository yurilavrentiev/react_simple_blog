import styles from './AddPostForm.module.css';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import React from 'react';

class AddPostForm extends React.Component {
  state = {
    postTitle: '',
    postBody: '',
  }
  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      postTitle: event.target.value
    })
  }

  handleTextAreaChange = (event) => {
    event.preventDefault();
    this.setState({
      postBody: event.target.value
    })
  }

  createPost = (event) => {
    event.preventDefault()
    const post = {
      title: this.state.postTitle,
      article: this.state.postBody,
      liked: false,
    }
    this.props.addPost(post)
    this.props.hideForm()
  }

  handleEscape = (event) => {
    if (event.key === 'Escape') {
      this.props.hideForm()
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEscape);
  }

  render() {
    const hideForm = this.props.hideForm;
    return (
      <>
        <form className={styles.addPostForm} onSubmit={this.createPost}>
          <button
            onClick={hideForm}
            className={styles.btnContainer}>
            <CancelSharpIcon />
          </button>
          <h3>New Post</h3>
          <div>
            <input
              name='postTitle'
              className={styles.formInputs}
              placeholder='Post Title'
              value={this.state.postTitle}
              onChange={this.handleInputChange} 
              required/>
          </div>
          <div>
            <textarea
              name='postBody'
              className={styles.formInputs}
              placeholder='Post Content'
              value={this.state.postBody}
              onChange={this.handleTextAreaChange}
              required />
          </div>
          <div>
            <button
              type='submit'
              className={styles.btn}>
              Add Post
            </button>
          </div>
        </form>
        <div
          className={styles.overlay}
          onClick={hideForm}>
        </div>
      </>
    )
  }
}

export default AddPostForm;