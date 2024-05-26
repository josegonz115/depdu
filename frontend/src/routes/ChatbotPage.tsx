import './ChatboxPage.css';
import Chatbox from '../components/Chatbox';
import Suggestions from '../components/Suggestions';

const Chat = () => {



    return (
        <>
            <div className='flex bg-pink-400 flex-grow'>
                <Chatbox/>
                <Suggestions />
            </div>
        </>
    );
};

export default Chat;