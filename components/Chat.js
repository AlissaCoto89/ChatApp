import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        avatar: "",
        name: "",
      },
    };

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBsHto4FFp3jDfmnPKfkUgCOZ7-8Qs4hY8",
        authDomain: "chatapp-e4d38.firebaseapp.com",
        projectId: "chatapp-e4d38",
        storageBucket: "chatapp-e4d38.appspot.com",
        messagingSenderId: "483202104150",
        appId: "1:483202104150:web:b5fa0137bc07b182ecf4f7",
        measurementId: "G-7J1BT8NWJQ",
      });
    }

    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    let name = this.props.route.params.name;
    this.setState({
      messages: [
        {
          _id: 2,
          loggedInText: `${name} has entered the chat`,
          createdAt: new Date(),
          system: true,
        },
      ],
    });
    this.props.navigation.setOptions({ title: name });
    // create a reference to the active user's documents
    this.referenceChatMessagesUser = firebase
      .firestore()
      .collection("messages")
      .where("uid", "==", this.state.uid);
    this.unsubscribe = this.referenceChatMessages.onSnapshot(
      this.onCollectionUpdate
    );

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      // update user state with current user data
      this.setState({
        uid: user?.uid,
        messages: [],
      });
      // listen for collection changes for current user
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribe();
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
      }
    );
  }

  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
    });
  };

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || "",
        },
      });
    });
    this.setState({ messages });
  };

  // styles message bubbles
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
        <Text>{this.state.loggedInText}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Welcome")}
        ></TouchableOpacity>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            avatar: "https://placeimg.com/140/140/any",
          }}
          // adds accessibility messages and fixes android keyboard error
          accessible={true}
          accessibilityLabel="Text message input field."
          accessibilityHint="You can type your message in here. You can send your message by pressing the button on the right."
        ></GiftedChat>
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
