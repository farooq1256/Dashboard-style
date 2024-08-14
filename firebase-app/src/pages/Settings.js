// src/components/Settings.js

import React, { useEffect, useState } from 'react';
import { db, storage } from '../config/firebase';
import { Button, Input, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';

const Settings = () => {
  const initialState = {
    roll: '',
    fullname: '',
    phone: '',
    image: null
  };

  const [formData, setFormData] = useState(initialState);
  const { roll, fullname, phone, image } = formData;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { id, studentname, studentphonenumber, imageUrl } = location.state;
      setFormData({
        roll: id,
        fullname: studentname,
        phone: studentphonenumber,
        image: null // Reset image to null for new upload
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !phone) {
      message.error('Please fill all fields');
      return;
    }

    try {
      // Update student data in Firestore
      const studentRef = doc(db, 'students', roll);
      await updateDoc(studentRef, {
        studentname: fullname,
        studentphonenumber: phone,
      });

      // Upload new image if provided
      if (image) {
        const imageRef = storageRef(storage, `images/${roll}`);
        await uploadBytes(imageRef, image);

        // Get the download URL
        const imageUrl = await getDownloadURL(imageRef);

        // Update image URL in Firestore
        await updateDoc(studentRef, { imageUrl });
      }

      message.success('Data updated successfully!');
      navigate('/about');
    } catch (error) {
      message.error('Failed to update data: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Update Student</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          type="number" 
          name="roll" 
          value={roll} 
          disabled 
          placeholder="Roll number" 
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
          <Button type="primary" htmlType="submit">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
































































































// // src/components/Settings.js

// import React, { useEffect, useState } from 'react';
// import { ref, update } from 'firebase/database';
// import { db, storage } from '../config/firebase';
// import { Button, Input, message } from 'antd';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { uploadBytes, ref as storageRef, getDownloadURL } from 'firebase/storage';

// const Settings = () => {
//   const initialState = {
//     roll: '',
//     fullname: '',
//     phone: '',
//     image: null
//   };

//   const [formData, setFormData] = useState(initialState);
//   const { roll, fullname, phone, image } = formData;

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (location.state) {
//       const { key, studentname, studentphonenumber, imageUrl } = location.state;
//       setFormData({
//         roll: key,
//         fullname: studentname,
//         phone: studentphonenumber,
//         image: null // Reset image to null for new upload
//       });
//     }
//   }, [location.state]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if ( !fullname || !phone) {
//       message.error('Please fill all fields');
//       return;
//     }

//     try {
//       // Update student data in the Realtime Database
//       await update(ref(db, `student/${roll}`), {
//         studentname: fullname,
//         studentphonenumber: phone
//       });

//       // Upload new image if provided
//       if (image) {
//         const imageRef = storageRef(storage, `images/${roll}`);
//         await uploadBytes(imageRef, image);

//         // Get the download URL
//         const imageUrl = await getDownloadURL(imageRef);

//         // Update image URL in the Realtime Database
//         await update(ref(db, `student/${roll}`), { imageUrl: imageUrl });
//       }

//       message.success('Data updated successfully!');
//       navigate('/about');
//     } catch (error) {
//       message.error('Failed to update data: ' + error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Update Student</h2>
//       <form onSubmit={handleSubmit}>
//         <Input 
//           type="number" 
//           name="roll" 
//           value={roll} 
//           disabled 
//           placeholder="Roll number" 
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
//         <Input 
//           type="file" 
//           accept="image/*" 
//           onChange={handleImageChange} 
//         />
//         <div>
//           <Button type="primary" htmlType="submit">Update</Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Settings;
