"use client";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
    ChatContainer, ChatImage, InputContainer,
    ChatInput, SendButton, ChatOpener, ChatBody, ChatHeader, CloseButton, ChatMessageImage, ChatMessageText, ChatMessage, ChatMessages
} from './chatbox.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons';
import ReactLoading from 'react-loading';


const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory = [], setChatHistory] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);


    const handleClick = () => {
        if (isOpen == false && chatHistory.length === 0) {
            pushWelcomeMessage();
        }
        setIsOpen(!isOpen);
    };

    const pushWelcomeMessage = () => {
        setIsLoading(true);
        setTimeout(() => {
            const history = [...chatHistory]
            history.push({
                user: false,
                message: "Hello I am Xiri, your chat assistant! How can I help you today."
            })
            setChatHistory(history);
            setIsLoading(false)
        }, 2000)
    }

    const handleAPIRequest = async () => {
        try {
            const res = await axios.post('/api', {
                prompt: message
            });

            setResponse(res.data);
            return res.data;
        } catch (error) {
            console.error(error);
            return { failed: true, error }
        }
    };

    const handleResponse = async () => {
        console.log('Sending message:', message);

        const updatedChatHistory = [...chatHistory, { user: true, message }];
        setChatHistory(updatedChatHistory);
        setIsLoading(true);
        setMessage("");
        const { failed, image_str, prompt, response } = await handleAPIRequest();
        if (!failed) {
            const updatedChatHistoryWithResponse = [...updatedChatHistory, { user: false, 
                message: response, img: image_str, prompt }];
            setChatHistory(updatedChatHistoryWithResponse);
        }
        setIsLoading(false);
    };

    const handleChange = (e: any) => {
        setMessage(e.target.value);
    };

    const chatMessagesRef: any = useRef(null);
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [chatHistory]);


    return (
        <>
            {
                !isOpen && (<ChatOpener onClick={handleClick}>
                    <FontAwesomeIcon icon={faComment} />
                </ChatOpener>)
            }
            {isOpen && (
                <>
                    <ChatContainer className='chatContainer'>
                        <ChatHeader>
                            <CloseButton onClick={handleClick}>
                                <FontAwesomeIcon icon={faTimes} />
                            </CloseButton>
                        </ChatHeader>
                        <ChatMessages ref={chatMessagesRef}>
                            {chatHistory.map((chat: any, index: any) => (
                                <ChatMessage>
                                    <ChatMessageText key={index} style={{ color: chat.user ? 'blue' : 'green' }}>
                                        {chat.user ? 'User: ' : 'Xiri:'}
                                        {chat.message}
                                    </ChatMessageText>
                                    {/* <div>
                                        {
                                            chat.img && (
                                                <ChatMessageImage src={chat.img} />
                                            )
                                        }
                                    </div> */}
                                </ChatMessage>
                            ))}

                            {
                                isLoading && (
                                    <ReactLoading type="bubbles" color="blue" height={50} width={50} />
                                )
                            }
                        </ChatMessages>
                        <InputContainer>
                            <ChatInput
                                rows={2}
                                value={message}
                                onChange={handleChange}
                                placeholder="Type your message here"
                            />
                            <SendButton onClick={handleResponse}>Send</SendButton>
                        </InputContainer>
                    </ChatContainer>

                </>
            )
            }
        </ >
    );
};

export default Chatbox;
