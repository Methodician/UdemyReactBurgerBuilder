import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  // Note this is a differnt way of creating a class based component.
  // It's inside the object being exported rather than exporting the class itself
  // I wish he'd explain this.
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      // componentDidMount() { After adding a child component with errors this stopped working because child components mount before the parent component
      this.reqInterceptor = axios.interceptors.request.use(req => {
        // He points out we're not really interested in the request here...
        this.setState({ error: null });
        return req;
      });
      // The double-arrow function he says is "the shortest possible syntax to do that"
      // (to return the response)
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          // null above would normally be response but we're not interested in that right now.
          // There's a second argument we're interested in: the error.
          this.setState({ error });
        },
      );
    }

    componentWillUnmount() {
      console.log(
        'Will Unmount and remove interceptors',
        this.reqInterceptor,
        this.resInterceptor,
      );
      // Clean up interceptors to prevent memory leaks...
      // Could be used in return function of useEffect in functional component
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />{' '}
          {/* Distributes any props we may have gotten... */}
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
