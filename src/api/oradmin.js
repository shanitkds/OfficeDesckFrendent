import { data } from "react-router-dom"
import { or_adminApi } from "./axios"


export const listUsers=async(data)=>{
    return await or_adminApi.get("oruser_creation/")
}

export const addUsers=async(data)=>{
    return await or_adminApi.post("oruser_creation/",data,{ headers: { "Content-Type": "multipart/form-data" } })
}