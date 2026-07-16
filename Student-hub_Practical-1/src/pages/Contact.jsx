import { useState } from "react";

function Contact(){

    const[message,setMessage] = useState('')

   return (
     
    <>
    <h2>Contact Me</h2>
    <input 
    type = "text"
    value={message}
    exchange={(e) => setMessage(e.target.value)}
    placeholder="Type your message..."
    />

    <p>{message}</p>
    <p> Character Count : {message.length}</p>
    </>

   );

}

export default Contact;