Chat App for both Android and iOS created with React Native. The app provides users with a chat interface and the ability to share images and their location.

## Key features:

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

## Technologies used:

JavaScript, React Native, GiftedChat, Firebase, Expo

## Setting up the development environment:

- Clone the repository: `git clone https://github.com/alissacoto89/ChatApp.git`
- Install Expo CLI as a global npm package: `npm install -g expo-cli`
- Install all project dependencies: `npm install`
- Head over to https://expo.dev/, create an account and log in via terminal with `expo login`
- Follow expo CLI's instructions depending on your preferred simulator (XCode, Android Studio, Expo Go)
- Start the project: `npm start` or `expo start`

## Database configuration:

- Go to https://firebase.google.com/ and sign in with your existing or create a new Google account
- Go to Firebase console and click on "Create Project"
- Once on your project's dashboard, click on "Develop" on the left, then "Cloud Firestore", then "Create Database" and follow the instructions, selecting "Test Mode"
- Create a new collection named "messages"
- Under "Project Settings", scroll down and click the "Firestore for Web" button (</>)
- Choose a name for the chat app, then click "Register" and copy the configuration code to the cloned repository into components/Chat.js, replacing the following with your configuration code:
  - apiKey: '...',
  - authDomain: '...',
  - projectId: '...',
  - storageBucket: '...',
  - messagingSenderId: '...',
  - appId: '...',
- To be able to upload photos, go to "Storage" on the left, then the "Rules" tab, then exchange "allow read, write: if false;" for "allow read, write;"

## Main dependencies:
- "@expo/react-native-action-sheet": "^4.0.1","@expo/webpack-config": "^0.17.2",
- "@react-native-async-storage/async-storage": "~1.17.3",
- "@react-native-community/masked-view": "^0.1.11",
- "@react-native-community/netinfo": "9.3.5",
- "@react-navigation/native": "^6.1.1",
- "@react-navigation/stack": "^6.3.10",
- "expo": "~47.0.9",
- "expo-image-picker": "~14.0.2",
- "expo-location": "~15.0.1",
- "expo-permissions": "~14.0.0",
- "expo-status-bar": "~1.4.2",
- "firebase": "^8.10.1",
- "react": "18.1.0",
- "react-dom": "18.1.0",
- "react-native": "0.70.5",
- "react-native-gesture-handler": "~2.8.0",
- "react-native-gifted-chat": "^1.1.0",
- "react-native-maps": "1.3.2",
- "react-native-reanimated": "~2.12.0",
- "react-native-safe-area-context": "4.4.1",
- "react-native-screens": "~3.18.0",
- "react-native-web": "~0.18.9",
- "react-navigation": "^4.4.4"

![ChatApp1](https://user-images.githubusercontent.com/109038162/211649959-b2d20e29-417b-4845-b2ff-ec2acd2a1514.jpg)
![ChatApp2](https://user-images.githubusercontent.com/109038162/211649977-e9205661-5f28-4522-bb71-ed62b813a86c.jpg)
