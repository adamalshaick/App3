import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm.js";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";
import Loading from "../common/Loading.js";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Loading />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="row">
        <div className="col-md-12 text-center">
          <h2>Posts</h2>
          <PostForm />
          {postContent}
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
