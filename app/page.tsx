"use client";
import { useState } from "react";
import LoadingBar from "./components/LoadingBar";

export default function Home() {
  const [message, setMessage] = useState();
  const [messageID, setMessageID] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form = document.forms[0];
    const formData = new FormData(form);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/messages/new`,
      {
        method: "post",
        body: formData,
      },
    );
    const data = await response.json();
    setLoading(false);
    setMessage(data.msg);
    setMessageID(data.msgID);
    console.log(data);
  };

  return (
    <div className='container flex flex-direction-column justify-center items-center'>
      <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
        <label htmlFor='title'>Title:</label>
        <input type='text' name='title' id='title' required />
        <label htmlFor='rtnName'>Sender:</label>
        <input type='text' name='rtnName' id='rtnName' required />
        <label htmlFor='rtnAddress1'>Return Address:</label>
        <input type='text' name='rtnAddress1' id='rtnAddress1' required />
        <label htmlFor='file'>Upload PDF file:</label>
        <input type='file' accept='pdf' name='pdf' />
        {loading ? <LoadingBar loading={loading} /> : ""}
        {message ? (
          <>
            <h1>{message}</h1>
            <p>Message ID: {messageID}</p>
          </>
        ) : (
          <button type='submit'>Submit</button>
        )}
      </form>
    </div>
  );
}
