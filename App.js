import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback
} from "react-native";

const anim = [];

let tmpx = 0;
let tmpy = 0;

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ani: new Animated.Value(0),
      panres: undefined,
      rippleArray: [
        { x: 100, y: 100, id: 9, toAnimate: true, anim: new Animated.Value(0) },
        { x: 200, y: 200, id: 68, toAnimate: true, anim: new Animated.Value(0) }
      ],
      moving: undefined,
      aniArray: [],
      newArray: []
    };
  }
  // componentDidMount() {
  //   setInterval(() => {
  //     let obj = {
  //       x: Math.random() * width,
  //       y: Math.random() * height,
  //       id: Math.random(),
  //       toAnimate: true,
  //       anim: new Animated.Value(0)
  //     };
  //     let obj2 = {
  //       x: (1 - Math.random()) * width,
  //       y: (1 - Math.random()) * height,
  //       id: 1 - Math.random(),
  //       toAnimate: true,
  //       anim: new Animated.Value(0)
  //     };
  //     let arr = this.state.rippleArray;
  //     arr.push(obj);
  //     arr.push(obj2);
  //     this.setState({
  //       rippleArray: arr
  //     });
  //   }, 300);
  // }
  componentWillMount() {
    var self = this;
    this.setState({
      panres: PanResponder.create({
        onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
        // onPanResponderMove: Animated.event([
        //   null, // raw event arg ignored
        //   { rippleArray: this.state.newArray }, // gestureState arg
        //   { listener: this.handleMove }
        // ])
        onPanResponderMove: (dx, dy) => {
          // console.log(dy, dx);
          this.setState({
            moving: undefined
          });
          let obj = {
            x: dy.moveY,
            y: dy.moveX,
            id: dy.moveY / dy.moveX * Math.random(),
            toAnimate: true,
            anim: new Animated.Value(0)
          };
          let arr = this.state.rippleArray;
          tmpx = dy.moveX;
          tmpy = dy.moveY;
          arr.push(obj);
          // this.setState({
          //   rippleArray: arr
          // });
          Animated.event([
            null, // raw event arg ignored
            { rippleArray: arr }, // gestureState arg
            { useNativeDriver: true }
          ]);
          // console.log(this.state.rippleArray, "added");
        } // Creates a function to handle the movement and set offsets
        // onPanResponderRelease: (dx, dy) => {
        //   setTimeout(() => {
        //     console.log("dsa");
        //     this.setState({
        //       rippleArray: []
        //     });
        //   }, 1000);
        // }
      })
    });
  }
  removeRipple(arr) {
    this.setState({
      rippleArray: arr
    });
  }
  render() {
    let tempArray = this.state.rippleArray;
    return (
      <Animated.View
        style={styles.container}
        {...this.state.panres.panHandlers}
      >
        <Image
          style={{
            height: height + 50,
            width: width + 50,
            alignItems: "center",
            justifyContent: "center",
            transform: [{ translateX: -25 }, { translateY: -25 }]
          }}
          source={{
            uri:
              "https://i.pinimg.com/736x/1a/de/fc/1adefc7d9b3ce2560546d549af706c1c--wallpapers-ipad-iphone-s.jpg"
          }}
        >
          <TouchableWithoutFeedback
            style={{
              height: height,
              width: width,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={e => {
              // console.log(
              //   e.nativeEvent.locationX,
              //   e.nativeEvent.locationY,
              //   "vsd"
              // );
              let obj = {
                x: e.nativeEvent.locationY,
                y: e.nativeEvent.locationX,
                id: Math.random(),
                toAnimate: true,
                anim: new Animated.Value(0)
              };
              let arr = this.state.rippleArray;
              arr.push(obj);
              this.setState({
                rippleArray: arr
              });
            }}
          >
            <View
              style={{
                height: height,
                width: width,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {this.state.rippleArray.map((item, index) => {
                const dispTp = item.x;
                const dispLf = item.y;
                const scaleFac = item.anim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0.5, 3]
                });
                const scaleFac2 = item.anim.interpolate({
                  inputRange: [0, 20, 100],
                  outputRange: [0.5, 0.5, 3]
                });
                const scaleFac3 = item.anim.interpolate({
                  inputRange: [0, 40, 100],
                  outputRange: [0.5, 0.5, 3]
                });
                const scaleFac4 = item.anim.interpolate({
                  inputRange: [0, 60, 100],
                  outputRange: [0.5, 0.5, 3]
                });
                const opFac = item.anim.interpolate({
                  inputRange: [0, 10, 100],
                  outputRange: [0, 1, 1]
                });
                const scaleRevFac = item.anim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.33]
                });
                const movX = item.anim.interpolate({
                  inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                  outputRange: [0, 2, 0, -2, 0, 2, 0, -2, 0, 0, 0]
                });
                const movY = item.anim.interpolate({
                  inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                  outputRange: [2, 0, -2, 0, 2, -2, 0, 2, 0, 0, 0]
                });
                // console.log(item, "djhasbdjasbdjkanbdsjkbj");
                if (item.toAnimate) {
                  let arr2 = tempArray;
                  arr2[index].toAnimate = false;
                  Animated.timing(item.anim, {
                    toValue: 100,
                    duration: 3000,
                    useNativeDriver: true
                  }).start(() => {
                    // console.log("remove this", this.state.rippleArray, item);
                    let arr = this.state.rippleArray;
                    let found = false;
                    arr.map((item2, index2) => {
                      if (item2.id === item.id) {
                        arr.splice(index2, 1);
                        found = true;
                      }
                    });
                    if (found === false) {
                      // console.log("not found", this.state.rippleArray, item);
                    }
                    this.removeRipple(arr);
                    // console.log("removed", this.state.rippleArray, item);
                  });
                  setTimeout(() => {
                    this.setState({
                      rippleArray: arr2
                    });
                  }, 0);
                }
                return (
                  <Animated.View
                    key={index}
                    style={{
                      position: "absolute",
                      top: dispTp,
                      left: dispLf
                    }}
                  >
                    <Animated.View
                      style={{
                        height: 50,
                        width: 50,
                        position: "absolute",
                        top: 0,
                        borderRadius: 25,
                        overflow: "hidden",
                        transform: [{ scale: scaleFac }],
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Animated.Image
                        style={{
                          opacity: opFac,
                          height: height + 50,
                          width: width + 50,
                          borderRadius: 25,
                          position: "absolute",
                          transform: [
                            { scale: scaleRevFac },
                            { translateY: height / 2 - dispTp },
                            { translateY: movY },
                            { translateX: movX },
                            { translateX: width / 2 - dispLf },
                            { translateX: -25 },
                            { translateY: -25 }
                          ]
                        }}
                        source={{
                          uri:
                            "https://i.pinimg.com/736x/1a/de/fc/1adefc7d9b3ce2560546d549af706c1c--wallpapers-ipad-iphone-s.jpg"
                        }}
                      />
                    </Animated.View>
                    <Animated.View
                      style={{
                        height: 50,
                        width: 50,
                        position: "absolute",
                        top: 0,
                        borderRadius: 25,
                        overflow: "hidden",
                        transform: [{ scale: scaleFac2 }],
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Animated.Image
                        style={{
                          opacity: opFac,
                          height: height + 50,
                          width: width + 50,
                          borderRadius: 25,
                          position: "absolute",
                          transform: [
                            { scale: scaleRevFac },
                            { translateY: height / 2 - dispTp },
                            { translateY: movY },
                            { translateX: movX },
                            { translateX: width / 2 - dispLf },
                            { translateX: -25 },
                            { translateY: -25 }
                          ]
                        }}
                        source={{
                          uri:
                            "https://i.pinimg.com/736x/1a/de/fc/1adefc7d9b3ce2560546d549af706c1c--wallpapers-ipad-iphone-s.jpg"
                        }}
                      />
                    </Animated.View>

                    <Animated.View
                      style={{
                        height: 50,
                        width: 50,
                        position: "absolute",
                        top: 0,
                        borderRadius: 25,
                        borderWidth: 8,
                        borderColor: "rgba(0,0,0,0.01)",
                        overflow: "hidden",
                        transform: [{ scale: scaleFac3 }],
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Animated.Image
                        style={{
                          opacity: opFac,
                          height: height + 50,
                          width: width + 50,
                          borderRadius: 25,
                          position: "absolute",
                          transform: [
                            { scale: scaleRevFac },
                            { translateY: height / 2 - dispTp },
                            { translateY: movY },
                            { translateX: movX },
                            { translateX: width / 2 - dispLf },
                            { translateX: -25 },
                            { translateY: -25 }
                          ]
                        }}
                        source={{
                          uri:
                            "https://i.pinimg.com/736x/1a/de/fc/1adefc7d9b3ce2560546d549af706c1c--wallpapers-ipad-iphone-s.jpg"
                        }}
                      />
                    </Animated.View>
                    <Animated.View
                      style={{
                        height: 50,
                        width: 50,
                        position: "absolute",
                        top: 0,
                        borderRadius: 25,
                        borderWidth: 8,
                        borderColor: "rgba(0,0,0,0.01)",
                        overflow: "hidden",
                        transform: [{ scale: scaleFac4 }],
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Animated.Image
                        style={{
                          opacity: opFac,
                          height: height + 50,
                          width: width + 50,
                          borderRadius: 25,
                          position: "absolute",
                          transform: [
                            { scale: scaleRevFac },
                            { translateY: height / 2 - dispTp },
                            { translateY: movY },
                            { translateX: movX },
                            { translateX: width / 2 - dispLf },
                            { translateX: -25 },
                            { translateY: -25 }
                          ]
                        }}
                        source={{
                          uri:
                            "https://i.pinimg.com/736x/1a/de/fc/1adefc7d9b3ce2560546d549af706c1c--wallpapers-ipad-iphone-s.jpg"
                        }}
                      />
                    </Animated.View>
                  </Animated.View>
                );
              })}
            </View>
          </TouchableWithoutFeedback>
        </Image>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
