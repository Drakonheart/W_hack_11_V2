import "./ChatHud.css";
import Typewriter from "typewriter-effect";
import logo from "../assets/logGptLogo.png";
import { getChatGPTResponse } from '../chatGPT/ChatGPTService'; // Adjust the import path
import { motion } from 'framer-motion';


import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageModel
} from '@chatscope/chat-ui-kit-react'
import { useEffect, useState } from "react";



const ChatHud: React.FC = () => {


  const [messagesEmpty, setMessagesEmpty] = useState(true)

  const [chatGptTyping, setChatGptTyping] = useState(false)
  const [chatGptAiMessageList, setChatGptAiMessageList] = useState<MessageModel[]>([
    // {
    //   message: '',
    //   sender: 'ChatGPT',
    //   direction: 'incoming', // Ensure this matches the MessageDirection type
    //   position: 'single' // Ensure this matches one of the allowed values: "single", "first", "normal", "last", or a number (0, 1, 2, 3)
    // }
  ])


  const handleSendMesageToGPT = async (message: string) => {
    // Create a new user message object
    const newMessage: MessageModel = {
      message: message,
      sender: 'user',
      direction: 'outgoing', // Example value, adjust as needed
      position: 'single' // Example value, adjust as needed
    }

    // Add the user's message to the message list
    const newMessages = [...chatGptAiMessageList, newMessage]
    setChatGptAiMessageList(newMessages)

    // Set typing indicator
    setChatGptTyping(true)

    // Send the message to ChatGPT and get the response
    const response = await getChatGPTResponse(message)

    // Create a new message object for the assistant's response
    const responseMessage: MessageModel = {
      message: response,
      sender: 'assistant',
      direction: 'incoming', // Example value, adjust as needed
      position: 'single' // Example value, adjust as needed
    }

    // Add the assistant's response to the message list
    const updatedMessages = [...newMessages, responseMessage]
    setChatGptAiMessageList(updatedMessages)

    // Remove typing indicator
    setChatGptTyping(false)
  }

  const element = {
    message: 'New message',
    sender: 'user',
    direction: 'outgoing',
    position: 'single'
  }


  useEffect(() => {
    setChatGptTyping(true)
}, []);



  return (
    <div className="chat_hud_main">
      <div className="glowing-oval"></div>
      <div className="chat_hud_main_top_header">
        <div style={{display:"flex", flexDirection:"row", alignItems:'center', gap:"10px"}}>
          <img className="log_gpt_log" src={logo} alt="" />
          <div style={{fontFamily:"inter", fontSize:"30px", color:"white" }}>LogGPT</div>
        </div>
      </div>

    


      <motion.div
          className="introduction_chat"
          initial={{ opacity: 1 }} // Start fully visible
          animate={{ opacity: chatGptAiMessageList.length === 0 ? 1 : 0 }} // Fade out when condition is false
          transition={{ duration: 0.5 }} // Duration of the fade effect
        >
          <div className="intoruction_chat">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("What can I help you with?")
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .pauseFor(500) // Shorter pause for quicker transition
                  .callFunction(() => {
                    console.log("All strings were deleted");
                  })
                  .start();
              }}
              options={{
                delay: 25, // Reduce delay between typing characters (lower value = faster)
              }}
            />
          </div>
        </motion.div>

      <div className="gptContinaer">
          <MainContainer className="chat-main-container">
            <ChatContainer>
              <MessageList
                typingIndicator={
                  chatGptTyping ? <TypingIndicator content="Logging" /> : null
                }
              >
                {chatGptAiMessageList.map((message, index) => (
                  <Message key={index} model={message} />
                ))}
              </MessageList>
              <MessageInput placeholder="Type message here" onSend={handleSendMesageToGPT} />
            </ChatContainer>
          </MainContainer>
      </div>
      ;
    </div>
  );
};

export default ChatHud;
