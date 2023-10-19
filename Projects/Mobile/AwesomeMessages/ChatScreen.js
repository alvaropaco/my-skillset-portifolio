import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TextInput, Button, FlatList, StyleSheet, getUserMedia } from 'react-native';
import Peer from 'react-native-peerjs';
import { RTCView } from 'react-native-webrtc';
import ClickToCopyText from './ClickToCopyText';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [peer, setPeer] = useState(null);
    const [conn, setConn] = useState(null);
    const [socket, setSocket] = useState(null);
    const [socketId, setSocketId] = useState();
    const [stream, setStream] = useState();

    useEffect(() => {
        const newPeer = new Peer({
          host: "0.peerjs.com",
          port: 443,
          path: "/",
          pingInterval: 5000,
        });

        const conn = newPeer.connect("other-peer-id");

        conn.on("data", (data) => {
          console.log("Received data", data);
        });
        
        newPeer.on('open', id => {
            console.log(id)
            setSocketId(id)
        });
        
        newPeer.on('connection', connection => {
            setConn(connection);
            connection.on('data', handleMessage);
            setSocket(connection)
        });

        newPeer.on('call', call => {
            call.answer(stream); // Answer the call with the stream obtained from getUserMedia.
            call.on('stream', remoteStream => {
              // Use the remote stream for playback.
            });
        });

        setPeer(newPeer);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            console.log(stream)
          // Use this stream to establish a WebRTC connection.
          setStream(stream)
        })
        .catch(error => {
          console.error("Error accessing media devices.", error);
        });

        return () => {
            // socket?.disconnect();
            // conn?.close();
            // peer?.destroy();
        };
    }, []);

    const handleMessage = (data) => {
        setMessages((prevMessages) => [...prevMessages, { id: Date.now().toString(), text: data }]);
    };

    const sendMessage = () => {
        if (currentMessage.trim() !== '') {
            conn?.send(currentMessage);
            setMessages([...messages, { id: Date.now().toString(), text: currentMessage }]);
            setCurrentMessage('');
        }
    };

    const call = () => {
        const call = peer.call(otherPeerId, stream);
        call.on('stream', remoteStream => {
        // Here you'd add the remote stream to a video element for playback.
        });
    }

    const showAlert = () => {
      Alert.alert(
        "Sample Alert",
        `Connected: ${socketId}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.messageList}
            />
            { Boolean(stream?._peerConnectionId) ? <RTCView streamURL={stream.toURL()} /> : null }
            {
                !Boolean(stream?._peerConnectionId) ? <View style={styles.inputContainer}>
                    <ClickToCopyText text={socketId} />
                    <TextInput
                        style={styles.input}
                        value={currentMessage}
                        onChangeText={setCurrentMessage}
                        placeholder="Type your message..."
                    />
                    <Button title="Send" onPress={sendMessage} />
                </View>
                : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    messageList: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    message: {
        backgroundColor: '#e5e5e5',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignSelf: 'baseline',
        borderColor: '#ddd',
        borderWidth: 1,
    },
    inputContainer: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        height: "100px"
    },
    input: {
        padding: 10,
        backgroundColor: '#e5e5e5',
        borderRadius: 5,
        marginRight: 10,
    },
});

export default ChatScreen;
