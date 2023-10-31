"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({});
  const [messageID, setMessageID] = useState();
  const [file, setFile] = useState<File | undefined>();

  const handleFile = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/messages/new`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    const data = await response.json();
    setMessageID(data.data.messageID);
    console.log(data);
  };

  return (
    <div className='container flex flex-direction-column justify-center items-center'>
      <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          name='title'
          id='title'
          onChange={(e: any) => handleChange(e)}
        />
        <label htmlFor='rtnName'>Sender:</label>
        <input
          type='text'
          name='rtnName'
          id='rtnName'
          onChange={(e: any) => handleChange(e)}
        />
        <label htmlFor='rtnAddress1'>Return Address:</label>
        <input
          type='text'
          name='rtnAddress1'
          id='rtnAddress1'
          onChange={(e: any) => handleChange(e)}
        />
        {/* <label htmlFor='file'>Select PDF file:</label>
        <input
          type='file'
          accept='pdf'
          name='pdf'
          onChange={(e) => handleFile(e)}
        /> */}
        <button type='submit'>
          Get Message ID:
          {messageID ? messageID : ""}
        </button>
      </form>
    </div>
  );
}
