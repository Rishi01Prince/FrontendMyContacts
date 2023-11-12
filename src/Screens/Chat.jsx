import React, { useState,useRef, useEffect } from "react";
import {
    Box,
    Button,
    Input,
    Container,
    VStack,
    HStack,
} from "@chakra-ui/react";
import { app } from "./Firebase";
import Message from "../Components/Message";
import {
    onAuthStateChanged,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    
} from "firebase/auth";

import {
    getFirestore,
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
};

const logoutHandler = () => {
    signOut(auth);
};

function Chat() {
    
    const [user, setUser] = useState(false);
    const [message, setMessage] = useState("");
    const [massagesL, setmassagesL] = useState([]);
    const devForScroll = useRef(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setMessage("");
            await addDoc(collection(db, "Messages1"), {
                text: message,
                uid: user.uid,
                uri: user.photoURL,
                createdAt: serverTimestamp(),
            });
            
            devForScroll.current.scrollIntoView({ behavior: "smooth"});
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        const q = query(collection(db,"Messages1"), orderBy("createdAt","asc"));


        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setUser(data);
        });

        const unsubscribeForMessage = onSnapshot(q, (snap) => {
            setmassagesL(snap.docs.map((item) => {
                const id = item.id;
                return {id, ...item.data() };
            })
            );
        });
        

        return () => {
            unsubscribe();
            unsubscribeForMessage();
        };
    },[]);

    return (
        <Box bg={"blackAlpha.800"}>
            {user ? (
                <Container h={"60vh"} bg={"white"}>
                    <VStack h="full" paddingY={"4"}>
                        <Button
                            onClick={logoutHandler}
                            colorScheme="blackAlpha"
                            w={"full"}
                        >
                            Logout
                        </Button>

                        <VStack h="full" w={"full"} overflowY={"auto"}
                            css={{
                                "&::-webkit-scrollbar": {
                                    display: "none",
                                },
                            }}
                        >
                            {
                                massagesL.map(item => (
                                    <Message 
                                    key = {item.id}
                                    user={item.uid===user.uid ? "me" : "other"}
                                    text= {item.text} 
                                    uri={item.uri}
                                    />
                                ))
                            }
                            <dev ref={devForScroll}></dev>
                        </VStack>
                        <form
                            onSubmit={submitHandler}
                            style={{ width: "100%", borderRadius: "20rem" }}
                        >
                            <HStack>
                                <Input
                                    
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a message...."
                                />
                                <Button type="submit" colorScheme={"green"}>
                                    Send
                                </Button>
                            </HStack>
                        </form>
                    </VStack>
                </Container>
            ) : (
                <VStack
                    bg="white"
                    h="100vh"
                    justifyContent={"center"}
                >
                    <Button colorScheme={"gray"} onClick={loginHandler}>
                        Login with Google
                    </Button>
                </VStack>
            )}
        </Box>
    );
}

export default Chat;
