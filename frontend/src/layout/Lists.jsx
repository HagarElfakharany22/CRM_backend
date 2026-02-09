import { useContext , useEffect } from "react"
import { ListContext } from "../context/ListContext.jsx";
import { useQuery , useQueryClient } from "@tanstack/react-query";
export default function Lists({id}){
    const queryClient=useQueryClient();
    const {data , error , isloading}= useQuery({
        queryKey:['lists'],
        queryFn:()=>getListsByBoardId(id)
    })
    let {getListsByBoardId } = useContext(ListContext);
    useEffect(()=>{
        console.log(data);
    } , [data])

    return(
        <div>lists</div>
    )
}