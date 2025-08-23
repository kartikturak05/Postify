import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from 'react';
import { SignupInput } from "@kartikturak05/medium-common";
import  axios from "axios";
import { BACKEND_URL } from "../config";
import useAuthStore from "../Store/authStore";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const { login } = useAuthStore();

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",  
        password: ""
    });
    const [buttonText, setButtonText] = useState('Send');

    useEffect(() => {
        setButtonText((type === "signup" ? "signup" : "signin"));
    }, []);
    

    const navigate = useNavigate();

    async function sendRequest(){
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
              login(jwt);
            navigate("/blogs");
        } catch(err) {
            alert("Error while signing up.....")
        }
    }

    return <div className="bg-white h-screen flex justify-center flex-col ">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                       {type === "signin" ? "Don't have an account?":"Already have an account?"}
                        <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>{ type==="signin"?"Sign up":"Sign in"}</Link>
                    </div>
                </div>
                <div className="pt-8">
                    {type==="signup"?<LabelledInput label="Name" placeholder="kartik Turak" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />:null}
                    <LabelledInput label="Email" type="email" placeholder="Abc@gmail.com" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    <LabelledInput label="Password" type="password" placeholder="Abc@4424" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={()=>{
                        setButtonText(buttonText === type ? 'Loading...' : type);
                        sendRequest();
                    }} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4">{buttonText}</button>
                </div>
            </div>
        </div>
    </div>
}


interface labelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, type, placeholder, onChange }: labelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-medium text-black pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
}