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