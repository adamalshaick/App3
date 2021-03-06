import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../Loading";
import { getCurrentProfile } from "../../../actions/profileActions";
import Navbar from "../../navbar/Navbar";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.props.getCurrentProfile();
    }

    render() {
      const { currentProfile } = this.props.profile;
      // Wait for profile data
      if (!currentProfile) {
        return (
          <>
            <Navbar />
            <Loading />
          </>
        );
      }
      // Check if logged in user has profile data
      else {
        if (Object.keys(currentProfile).length > 0) {
          return (
            <>
              <ChildComponent {...this.props} />
            </>
          );
        } else return <Redirect to="/create-profile" />;
      }
    }
  }

  ChildComponent.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
  });

  return connect(
    mapStateToProps,
    { getCurrentProfile }
  )(ComposedComponent);
};
