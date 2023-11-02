"use client";

import { useState } from "react";
import LoadingBar from "./components/LoadingBar";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState();
  const [messageID, setMessageID] = useState();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form = document.forms[0];
    const formData = new FormData(form);
    console.log(formData);
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
    setToken(data.token);
    console.log(data);
  };

  return (
    <div className='container flex flex-col gap-4 lg:flex-row justify-center items-center'>
      <div>
        <h1 className='text-xl lg:text-3xl'>Docsmit.com</h1>
        <br />
        <h2>
          Send PDFs as USPS mail (Certified, Priority and First Class) as easy
          as email.
        </h2>
      </div>
      <form
        className='w-11/12 lg:w-2/4 m-4 lg:m-1 p-4'
        onSubmit={(e) => handleSubmit(e)}
        encType='multipart/form-data'
      >
        <label htmlFor='title'>Title:</label>
        <input type='text' name='title' id='title' required />
        <label htmlFor='rtnName'>Sender:</label>
        <input type='text' name='rtnName' id='rtnName' required />
        <label htmlFor='rtnAddress1'>Return Address:</label>
        <input type='text' name='rtnAddress1' id='rtnAddress1' required />
        <label htmlFor='file'>Upload PDF file:</label>
        <input type='file' accept='pdf' id='file' name='pdf' />
        <label htmlFor='sendType'>Select sendType:</label>
        <select id='sendType' name='sendType'>
          <option value='Priority Mail'>Priority Mail</option>
          <option value='Priority Mail with Signature'>
            Priority Mail with Signature
          </option>
          <option value='First Class'>First Class</option>
          <option value='Certified”'>Certified</option>
          <option value='Certified, Electronic Return Receipt'>
            Certified, Electronic Return Receipt
          </option>
          <option value='Certified, Return Receipt'>
            Certified, Return Receipt
          </option>
        </select>
        <label htmlFor='envelope'>Select envelope:</label>
        <select name='envelope' id='envelope'>
          <option value='#10'>“#10” (5 sheet limit)</option>
          <option value='Flat'>“Flat” (47 sheet limit)</option>
          <option value='Priority Letter'>
            “Priority Letter” (50 sheet limit)
          </option>
        </select>

        {loading ? <LoadingBar loading={loading} /> : ""}
        {message ? (
          <div className='helperMessage'>
            <h1>{message}</h1>
            <p>Message ID: {messageID}</p>
            <button type='button'>
              <Link
                href={{
                  pathname: `/details/${messageID}`,
                  query: {
                    token: `${token}`,
                  },
                }}
              >
                Get Message Details
              </Link>
            </button>
          </div>
        ) : (
          <button type='submit'>Submit</button>
        )}
      </form>
    </div>
  );
}
