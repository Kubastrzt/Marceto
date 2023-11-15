import {useAuth} from "@clerk/clerk-react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

const App = ()=>{
    const {userId} = useAuth()
    const navigate = useNavigate();

    if(!userId) {
        navigate('/sign-in/')
    }

    const getUsersStore = async ()=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/user/${userId}/first-store`);
            if(response.data) {
                navigate(`/dashboard/${userId}/${response.data.id}/`)
            }
            else {
                navigate('/create-store');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getUsersStore();
    },[]);

    return null
}

export default App