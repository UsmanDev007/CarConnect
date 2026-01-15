import API from "../api/axios";

export const useAuth = (rolePath) => { // rolePath would be 'admin', 'dealer', or 'user'
    // for login dealer admin user
    const login = async (email, password) => {
        // Dynamically points to /api/admin/login, etc.
        const res = await API.post(`/${rolePath}/login`, { email, password });
        
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', rolePath); // We set the role based on which page they used
        return res.data;
    };
    // for register dealer and user
    const register=async(name,email,password,phone)=>{
        const res=await API.post(`/${rolePath}/register`,{name,email,password,phone})
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('role',rolePath)
        return res.data
    }
    return { login,register };
};