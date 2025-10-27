// import React, { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import getAuth from "../../../util/auth";

// const PrivateAuthRoute = ({ roles, children }) => {
// const [isLogged, setIsLogged] = useState(false);
// const [isAuthorized, setIsAuthorized] = useState(false);
// const [isChecked, setIsChecked] = useState(false);

// useEffect(() => {
// const checkAuth = async () => {
// const response = await getAuth();

//   if (response && response.employee_token) {
//     setIsLogged(true);

//     // ✅ use the correct field that stores the user’s role
//     const userRole = response.role_id || response.employee_role;

//     if (roles && roles.length > 0 && roles.includes(userRole)) {
//       setIsAuthorized(true);
//     }
//   }
//   setIsChecked(true);
// };

// checkAuth();

// }, [roles]);

// if (!isChecked) return null; // optional: loading spinner

// if (!isLogged) {
// return <Navigate to="/login" replace />;
// }

// if (!isAuthorized) {
// return <Navigate to="/unauthorized" replace />;
// }

// return children;
// };

// export default PrivateAuthRoute;
// import react, useState and useEffect hooks 
import React, { useState, useEffect } from "react"; 
// import navigate from react-router 
import { Navigate } from "react-router-dom"; 
// import getAuth 
import getAuth from "../../../util/auth";


const PrivateAuthRoute = ({roles, children}) => { 

   const [isLogged, setIsLogged] = useState(false); 
   const [isAuthorized, setIsAuthorized] = useState(false); 
   const [isChecked, setIsChecked] = useState(false); 

    useEffect(()=>{ 
        const loggedInEmployee = getAuth(); 
        loggedInEmployee.then((response)=>{ 
            if(response.employee_token){ 
                setIsLogged(true); 
            // use the correct field that stores the user’s role
            const userRole = response.employee_role;
            console.log(userRole);
            
            if(roles && roles.length > 0 && roles.includes(userRole)){
                setIsAuthorized(true);
                } 
            } 
        setIsChecked(true); 
      }); 
    }, [roles]); 

if(isChecked){ 
    if(!isLogged){
         return <Navigate to="/login" />
         } 
        if(!isAuthorized){
            return <Navigate to="/unauthorized" /> 
        } 
    } 
    return children;
} 
export default PrivateAuthRoute;