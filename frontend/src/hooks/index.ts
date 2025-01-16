import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    "content": string,
    "title": string,
    "id": string,
    "publishedDate":string,
    "author": {
        "name": string
    }
}

export interface User{
    "name":string,
    "email":string
}

export const useBlog = ( {id} : { id : string })=>{
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<Blog>();

    useEffect(()=> {
         axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response =>{
            setBlog(response.data.response);
            setLoading(false)
        })
    },[id])
    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=> {
         axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response =>{
            setBlogs(response.data.response);
            setLoading(false)
        })
    },[])
    return {
        loading,
        blogs
    }
}

export const useUserDetails =  ()=>{
    const [user,setUser] = useState<User>();
    useEffect(()=> {
          axios.post(`${BACKEND_URL}/api/v1/blog/userdetails`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(response =>{
            console.log("hello my dear")
            console.log(response)
            console.log(localStorage.getItem("token"))
            setUser(response.data);
        })
    },[])
    return {
        user
    }
}

export interface MyUser{
    id:string,
    email:string,
    name:string,
    password:string
}

export const useMyDetails = () => {
    const [user, setUser] = useState<MyUser | null>(null);
  
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/user/UserDetails`, {
            headers: {
              Authorization: localStorage.getItem("token") || "",
            },
          });
          setUser(response.data);
      console.log("Response:", response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);

        //   console.error("Error fetching user details:", error.response?.data || error.message);

          // Optionally handle error state here
        }
      };
  
      fetchUserDetails();

      

    }, []);
  
    return { user };
  };