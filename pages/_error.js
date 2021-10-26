import { Component } from 'react';
import NotFound from '../components/NotFound';

class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <>{this.props.statusCode && <NotFound code={this.props.statusCode} />}</>
    );
  }
}

export default Error;
