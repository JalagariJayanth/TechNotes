import { jwtDecode } from "jwt-decode";


const useAuth = () => {

    const token = localStorage.getItem("accessToken");
    let isManager = false;
    let isAdmin = false;
    let status = "Employee";

    if(token){
        const decodedUser = jwtDecode(token);
        const {username,roles} = decodedUser;

        isManager = roles.includes('Manager');
        isAdmin = roles.includes('Admin')


        if(isManager) status = "Manager";
        if(isAdmin) status = "Admin";

        return {username,roles,status,isManager,isAdmin}
    }

    return { username:"",roles:[],isManager,isAdmin,status}
  
}

export default useAuth