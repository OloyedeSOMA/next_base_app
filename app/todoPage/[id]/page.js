
"use client";
import React from 'react'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CustomContainer from '@/app/components/CustomContainer';

const ViewTodo = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
  const title = searchParams.get("title");
  const completed = searchParams.get("completed") === "true";
    

  if (!id) return <p>Loading...</p>;
  return (
    <>
        <CustomContainer className = "flex flex-col md:w-[50%] mx-auto h-auto p-5 justify-self-center">
            <h1 className="text-2xl font-bold mb-2">Todo Detail</h1>
            <p className="mb-2"><b>Task Name:</b>{title}</p>
            <p className="mb-2"><b>ID:</b> {id}</p>
            <p className="mb-2"><b>Completed:</b> {completed ? "Completed" : "Pending"}</p>
            <Link href="/todoPage"><button className="w-auto p-1 bg-[#6C63FF] rounded-sm text-white cursor-pointer">Go Back</button></Link>
        </CustomContainer>
    </>
    
        
        

        
    
  )
}

export default ViewTodo
