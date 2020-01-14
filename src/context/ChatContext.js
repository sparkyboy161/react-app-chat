import React, { createContext, useReducer } from 'react';
import { chatReducer } from '../reducers/chatReducer';

import io from 'socket.io-client';

export const ChatContext = createContext();

const initialState = {
    general: [
        { from: 'huy ', msg: 'Hello there' },
        { from: 'huy ', msg: 'Hello there' },
        { from: 'huy ', msg: 'Hello there' },
    ],
    topic2: [
        { from: 'huy1', msg: 'Hello there' },
        { from: 'huy2', msg: 'Hello there' },
        { from: 'huy3', msg: 'Hello there' },
    ],
}

let socket;

const sendMessageAction = (value) => {
    socket.emit('chat message', value)
}

export const ChatProvider = (props) => {
    const [allChats, dispatch] = useReducer(chatReducer, initialState)

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', function (msg) {
            console.log(msg);
            dispatch({ type: 'RECEIVE_MESSAGE', payload: msg })
        });
    }

    const user = 'huy' + Math.random(100).toFixed(2);


    return (
        <ChatContext.Provider value={{ allChats, sendMessageAction, user, dispatch }}>
            {props.children}
        </ChatContext.Provider>
    )
}