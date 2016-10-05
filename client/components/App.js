import React from 'react';
import NavigationBar from './layout/NavigationBar';
import FlashMessagesList from './flash/FlashMessagesList';

class App extends React.Component {
  render() {
    return (
      <div className="row">
          <NavigationBar />
          <FlashMessagesList />
          {this.props.children}
        </div>
    );
  }
}
export default App;