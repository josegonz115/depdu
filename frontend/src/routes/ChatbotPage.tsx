import React from 'react';
import './ChatboxPage.css';
import Chatbox from '../components/Chatbox';
import Suggestions from '../components/Suggestions';

const Chat = () => {
    return (
        <>
            <div className='flex bg-white flex-grow'>
                <Chatbox />
                <Suggestions />
            </div>
            
        </>
    );
};

export default Chat;
