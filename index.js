import React from 'react';
import Entity from 'Entity';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Environment,
  NativeModules,
  asset,
  Animated
} from 'react-360';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

const Hello360 = () => (
  <View style={styles.panel}>
    <Text style={styles.panelText}>{'Follows Horizontally'}</Text>
  </View>
);

const My3DView = () => {
  rotation = new Animated.Value(0);
  Animated.timing(this.rotation, {toValue: 360, duration: 20000}).start();
  return (
    <AnimatedEntity
      style={{transform: [{rotateY: this.rotation}]}}
      source={{obj: asset('o1.obj'), mtl: asset('m1.mtl')}}
    />
  )
}

export default class HorizontalPanel extends React.Component {
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
          {this.state.index == 1 ? <Text style={styles.greeting}>Only appear on 2nd image</Text> : null} 
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
AppRegistry.registerComponent('My3DView', () => My3DView);
