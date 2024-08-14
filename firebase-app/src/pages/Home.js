// src/components/Home.js

import React, { useState } from 'react';
import { db, storage } from '../config/firebase';
import { Button, Input, message } from 'antd';
import { collection, doc, setDoc } from 'firebase/firestore';
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';

const Home = () => {
  const initialState = {
    roll: '',
    fullname: '',
    phone: '',
    image: null // Added image state
  };

  const [formData, setFormData] = useState(initialState);
  const { roll, fullname, phone, image } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!roll || !fullname || !phone || !image) {
      message.error('Please fill all fields and upload an image');
      return;
    }

    try {
      // Upload image to Firebase Storage
      const imageRef = storageRef(storage, `images/${roll}`);
      await uploadBytes(imageRef, image);

      // Get the download URL
      const imageUrl = await getDownloadURL(imageRef);

      // Save student data to Firestore
      await setDoc(doc(db, 'students', roll), {
        studentname: fullname,
        studentphonenumber: phone,
        imageUrl: imageUrl // Save the image URL
      });
      
      message.success('Data submitted successfully!');
      setFormData(initialState);
    } catch (error) {
      message.error('Failed to submit data: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          type="number" 
          name="roll" 
          value={roll} 
          onChange={handleChange} 
          placeholder="Enter roll number" 
        />
        <Input 
          type="text" 
          name="fullname"  
          value={fullname} 
          onChange={handleChange} 
          placeholder="Enter full name" 
        />
        <Input 
          type="number" 
          name="phone" 
          value={phone} 
          onChange={handleChange} 
          placeholder="Enter phone number" 
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
        />
        <div>
          <Button type="primary" htmlType="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Home;







// // src/components/Home.js

// import React, { useState } from 'react';
// import { ref, set } from 'firebase/database';
// import { db, storage } from '../config/firebase';
// import { Button, Input, message } from 'antd';
// import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';

// const Home = () => {
//   const initialState = {
//     roll: '',
//     fullname: '',
//     phone: '',
//     image: null // Added image state
//   };

//   const [formData, setFormData] = useState(initialState);
//   const { roll, fullname, phone, image } = formData;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!roll || !fullname || !phone || !image) {
//       message.error('Please fill all fields and upload an image');
//       return;
//     }

//     try {
//       // Upload image to Firebase Storage
//       const imageRef = storageRef(storage, `images/${roll}`);
//       await uploadBytes(imageRef, image);

//       // Get the download URL
//       const imageUrl = await getDownloadURL(imageRef);

//       // Save student data to Realtime Database
//       await set(ref(db, `student/${roll}`), {
//         studentname: fullname,
//         studentphonenumber: phone,
//         imageUrl: imageUrl // Save the image URL
//       });
      
//       message.success('Data submitted successfully!');
//       setFormData(initialState);
//     } catch (error) {
//       message.error('Failed to submit data: ' + error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Student</h2>
//       <form onSubmit={handleSubmit}>
//         <Input 
//           type="number" 
//           name="roll" 
//           value={roll} 
//           onChange={handleChange} 
//           placeholder="Enter roll number" 
//         />
//         <Input 
//           type="text" 
//           name="fullname"  
//           value={fullname} 
//           onChange={handleChange} 
//           placeholder="Enter full name" 
//         />
//         <Input 
//           type="number" 
//           name="phone" 
//           value={phone} 
//           onChange={handleChange} 
//           placeholder="Enter phone number" 
//         />
//         <input 
//           type="file" 
//           // accept="image/*" 
//           onChange={handleImageChange} 
//         />
//         <div>
//           <Button type="primary" htmlType="submit">Submit</Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Home;
