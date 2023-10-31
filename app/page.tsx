'use client'
import { useState} from 'react'

export default function Home() {
  const [formData, setFormData] = useState({ title: '', rtnName: '', rtnAddress1: '' });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("form submitted")
    console.log(formData)
  }

  return (
    <div className='container flex flex-direction-column justify-center items-center'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='title'>
          Title:
        </label>
          <input type='text' name='title' id='title' onChange={(e) => handleChange(e)} />
        <label htmlFor='rtnName'>
          Sender:
        </label>
          <input type='text' name='rtnName' id='rtnName' onChange={(e) => handleChange(e)} />
        <label htmlFor='rtnAddress1'>
          Return Address:
        </label>
          <input type='text' name='rtnAddress1' id='rtnAddress1' onChange={(e)=>handleChange(e)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
