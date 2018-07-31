import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  NativeModules
} from 'react-360';

const HorizontalPanel = () => (
  <View style={styles.panel}>
    <Text style={styles.panelText}>{'Follows Horizontally'}</Text>
  </View>
);

export default class Hello360 extends React.Component {
  state = {
    count: 0,
    index: 0
  };
  _incrementCount = () => {
    this.setState({count: this.state.count + 1});
  };
  _changeBackground = () => {
    this.setState((prevState) => ({index: prevState.index + 1}));
    if(this.state.index==this.props.photos.length-1)
      this.setState({ index: 0 });
    Environment.setBackgroundImage(this.props.photos[this.state.index].uri);
  }
  _changeBackgroundToVideo = () => {
    const {VideoModule} = NativeModules;  
    VideoModule.createPlayer('myplayer');
    VideoModule.play('myplayer', {
      source: {url: 'static_assets/v1.mp4'}
    });
    Environment.setBackgroundVideo('myplayer');    
  }
  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>
            Welcome to React 360
          </Text>
          <VrButton
            onClick={this._incrementCount}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              {`Count: ${this.state.count}`}
            </Text>
          </VrButton>
          <VrButton
            onClick={this._changeBackground}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              Change Background
            </Text>
          </VrButton>
          <VrButton
            onClick={this._changeBackgroundToVideo}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              Change Background to video
            </Text>
          </VrButton>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    // width: 1000,
    // height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelText: {
    color: '#000000',
    fontSize: 30,
    textAlign: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('Hello360', () => Hello360);
AppRegistry.registerComponent('HorizontalPanel', () => HorizontalPanel);
