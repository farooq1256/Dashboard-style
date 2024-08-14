// src/components/About.js

import React, { useEffect, useState } from 'react';
import { db, storage } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { Button, List, message } from 'antd';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref as storageRef } from 'firebase/storage';

const About = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsData);
    };

    fetchStudents();
  }, []);

  const deleteData = async (id, imageUrl) => {
    try {
      // Delete the image from Firebase Storage
      const imageRef = storageRef(storage, `images/${id}`);
      await deleteObject(imageRef);
  
      // Remove student data from Firestore
      await deleteDoc(doc(db, 'students', id));
  
      // Update local state to remove the deleted student
      setStudents((prevStudents) => prevStudents.filter(student => student.id !== id));
      
      message.success('Data deleted successfully!');
    } catch (error) {
      message.error('Failed to delete data: ' + error.message);
    }
  };
  

  return (
    <div>
      <h2>Student List</h2>
      <List
        bordered
        dataSource={students}
        renderItem={(student) => (
          <List.Item>
            <div>
              Roll: {student.id}, Name: {student.studentname}, Phone: {student.studentphonenumber}
              {student.imageUrl && (
                <img src={student.imageUrl} alt="Student" style={{ width: '100px', height: 'auto' }} />
              )}
            </div>
            <div>
              <Button type="primary" onClick={() => navigate('/settings', { state: { ...student } })}>Update</Button>
              <Button danger onClick={() => deleteData(student.id, student.imageUrl)}>Delete</Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default About;


































































// // src/components/About.js

// import React, { useEffect, useState } from 'react';
// import { ref, onValue, remove } from 'firebase/database';
// import { db, storage } from '../config/firebase';
// import { useNavigate } from 'react-router-dom';
// import { Button, List, message } from 'antd';
// import { deleteObject, ref as storageRef } from 'firebase/storage';

// const About = () => {
//   const [students, setStudents] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const studentRef = ref(db, 'student');

//     // Fetch students data from Firebase
//     onValue(studentRef, (snapshot) => {
//       const data = snapshot.val();
//       setStudents(data || {}); // Handle null case
//     });
//   }, []);

//   // Delete student data
//   const deleteData = async (key, imageUrl) => {
//     try {
//       // Delete the image from Firebase Storage
//       const imageRef = storageRef(storage, `images/${key}`);
//       await deleteObject(imageRef);

//       // Remove student data from the Realtime Database
//       await remove(ref(db, `student/${key}`));
//       message.success('Data deleted successfully!');
//     } catch (error) {
//       message.error('Failed to delete data: ' + error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Student List</h2>
//       <List
//         bordered
//         dataSource={Object.entries(students)}
//         renderItem={([key, value]) => (
//           <List.Item>
//             <div>
//               Roll: {key}, Name: {value.studentname}, Phone: {value.studentphonenumber}
//               {value.imageUrl && (
//                 <img src={value.imageUrl} alt="Student" style={{ width: '100px', height: 'auto' }} />
//               )}
//             </div>
//             <div>
//               <Button type="primary" onClick={() => navigate('/settings', { state: { key, ...value } })}>Update</Button>
//               <Button danger onClick={() => deleteData(key, value.imageUrl)}>Delete</Button>
//             </div>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default About;
