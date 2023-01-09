import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: "You have entered the chat",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#ffffff",
          },
          right: {
            backgroundColor: "#dcf8c6",
          },
        }}
        textStyle={{
          right: {
            color: "#090C08",
          },
        }}
        timeTextStyle={{
          right: {
            color: "#090C08",
          },
        }}
      />
    );
  }

  render() {
    let backgroundColor = this.props.route.params.color;

    return (
      <View style={[styles.chatContainer, { backgroundColor }]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Welcome")}
        ></TouchableOpacity>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          accessible={true}
          accessibilityLabel="Text message input field"
          accessibilityHint="You can type your message in here. You can send your message by pressing the button on the right."
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: { flex: 1 },
});
