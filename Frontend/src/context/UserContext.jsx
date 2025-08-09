// import React, { createContext, useState } from 'react';
      
// export const UserDataContext = createContext();

// const UserContext = ({ children }) => {
//   const [User, setUser] = useState({
//     email: '',
//     fullName: {
//       firstName: '',
//       lastName: '',
//     },
//   });

//   return (
//     <UserDataContext.Provider value={[User, setUser]}>
//       {children}
//     </UserDataContext.Provider>
//   );
// };

// export default UserContext;


import React, { useState } from 'react';
import UserDataContext from './UserDataContext';

const UserContext = ({ children }) => {
  const [User, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: '',
    },
  });

  return (
    <UserDataContext.Provider value={[User, setUser]}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;