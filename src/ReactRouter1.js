import React from "react";
import PropTypes from "prop-types";
class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: window.location.hash,
    };
  }

  static childContextTypes = {
    hash: PropTypes.string,
  };

  getHash() {
    let url = window.location.hash.replace("#", "");
    return url;
  }

  getChildContext() {
    return {
      hash: this.getHash(),
    };
  }

  componentDidMount() {
    window.onhashchange = () => {
      this.setState({
        hash: this.getHash(), // todo:为什么要设置到state里？为了更新组件吗？
      });
    };
  }

  render() {
    return <>{this.props.children}</>;
  }
}

class Route extends React.Component {
  static contextTypes = {
    hash: PropTypes.string,
  };

  render() {
    const { path, component } = this.props;
    let instance = null;
    const { hash } = this.context; // todo:context更新这里就会更新吗？
    if (path === hash) {
      instance = React.createElement(component, null, null);
    }
    return <>{instance}</>;
  }
}

class AA extends React.Component {
  render() {
    return <div>aa</div>;
  }
}
class BB extends React.Component {
  render() {
    return <div>bb</div>;
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <div>header</div>
          <Route path="/aa" component={AA} />
          <Route path="/bb" component={BB} />
        </header>
      </Router>
    </div>
  );
}

export default App;
