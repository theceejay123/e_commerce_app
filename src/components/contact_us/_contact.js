import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [values, setValues] = useState({
    title: null,
    content: null,
    timestamp: null
  })

  useEffect(() => {
    axios.get('http://localhost:3000/pages/2').then(res => {
      if (res.status === 200) {
        const data = res.data;
        setValues({ title: data.title, content: data.content, timestamp: data.updated_at });
      }
    })
  }, []);

  return (
    <div>
      <h1>{values.title}</h1>

      <p>{values.content}</p>

      <footer>
        {values.timestamp}
      </footer>
    </div>
  );
}

export default Contact;