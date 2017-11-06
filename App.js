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
  componentDidMount() {
    setInterval(() => {
      let obj = {
        x: Math.random() * width,
        y: Math.random() * height,
        id: Math.random(),
        toAnimate: true,
        anim: new Animated.Value(0)
      };
      let arr = this.state.rippleArray;
      arr.push(obj);
      this.setState({
        rippleArray: arr
      });
    }, 500);
  }
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
          if (Math.abs(tmpx - dy.x0) > 1 || Math.abs(tmpy - dy.y0) > 1) {
            tmpx = dy.moveX;
            tmpy = dy.moveY;
            arr.push(obj);
            // this.setState({
            //   rippleArray: arr
            // });
            Animated.event([
              null, // raw event arg ignored
              { rippleArray: arr } // gestureState arg
            ]);
          }
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
  async removeRipple(arr) {
    (await this.state.moving)
      ? this.setState({
          rippleArray: arr
        })
      : null;
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
            height: height,
            width: width + 40,
            alignItems: "center",
            justifyContent: "center"
          }}
          source={{
            uri:
              "https://i.pinimg.com/736x/a4/e6/c6/a4e6c66ee72d0488fd5cff4322499e45--wallpaper-for-samsung-galaxy-nexus-wallpaper.jpg"
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
                  outputRange: [0.1, 4]
                });
                const scaleRevFac = item.anim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0.12]
                });
                const opFac = item.anim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0]
                });
                const movX = item.anim.interpolate({
                  inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                  outputRange: [0, 5, 0, -5, 0, 5, 0, -5, 0, 5, 0]
                });
                const movY = item.anim.interpolate({
                  inputRange: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                  outputRange: [5, 0, -5, 0, 5, -5, 0, 5, -5, 0, 5]
                });
                // console.log(item, "djhasbdjasbdjkanbdsjkbj");
                if (item.toAnimate) {
                  let arr2 = tempArray;
                  arr2[index].toAnimate = false;
                  Animated.timing(item.anim, {
                    toValue: 100,
                    duration: 2500,
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
                  }, 1);
                }
                return (
                  <Animated.View
                    key={index}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      borderWidth: 8,
                      borderColor: "rgba(0,0,0,0.01)",
                      position: "absolute",
                      overflow: "hidden",
                      top: dispTp,
                      left: dispLf,
                      opacity: opFac,
                      transform: [{ scale: scaleFac }],
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Animated.Image
                      style={{
                        height: height,
                        width: width,
                        borderRadius: 25,
                        position: "absolute",
                        transform: [
                          { scale: scaleRevFac },
                          { translateY: height / 2 - dispTp },
                          { translateY: movY },
                          { translateX: movX },
                          { translateX: width / 2 - dispLf }
                        ]
                      }}
                      source={{
                        uri:
                          "https://i.pinimg.com/736x/a4/e6/c6/a4e6c66ee72d0488fd5cff4322499e45--wallpaper-for-samsung-galaxy-nexus-wallpaper.jpg"
                      }}
                    />
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
