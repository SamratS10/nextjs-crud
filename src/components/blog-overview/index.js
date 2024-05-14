"use client"

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import AddTodoDialog from "../dialog";
import BlogList from "../blogList";

const BlogOverview = () => {
    const initialData = {
        title: "",
        description: "",
        _id: "", 
    };
    const [todoDialog, setTodoDialog] = useState(false);
    const [editData, setEditData] = useState(false);
    const [todoFormData, setTodoFormData] = useState(initialData);
    const [todoData, setTodoData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetch("/api/get-todo", {
                method: "GET",
                cache: "no-store",
            });
            const response = await data.json();
            if (response?.success) {
                const { data } = response;
                setTodoData(data);
            }
        };
        getData();
    }, []);

    const handleFormSubmit = async () => {
        try {
            const method = editData ? "PUT" : "POST";
            const endpoint = editData
                ? `/api/update-todo?id=${todoFormData._id}`
                : "/api/add-todo";
            const request = await fetch(endpoint, {
                method: method,
                body: JSON.stringify({
                    title: todoFormData.title,
                    description: todoFormData.description,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await request.json();
            if (result?.success) {
                setTodoFormData(initialData);
                setTodoDialog(false);
                setEditData(false);
                const updatedData = await fetch("/api/get-todo", {
                    method: "GET",
                    cache: "no-store",
                });
                const updatedResponse = await updatedData.json();
                if (updatedResponse?.success) {
                    const { data } = updatedResponse;
                    setTodoData(data);
                }
                //window.location.reload()
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col gap-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="m-5">
                <Button onClick={() => setTodoDialog(true)}>Add Task</Button>
                <AddTodoDialog
                    todoDialog={todoDialog}
                    setTodoDialog={setTodoDialog}
                    todoFormData={todoFormData}
                    setTodoFormData={setTodoFormData}
                    handleFormSubmit={handleFormSubmit}
                />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-5 h-full">
                {todoData.length > 0 ? (
                    todoData.map((each) => (
                        <BlogList
                            key={each._id}
                            list={each}
                            setEditData={setEditData}
                            setTodoDialog={setTodoDialog}
                            setTodoFormData={setTodoFormData}
                            todoFormData={todoFormData}
                        />
                    ))
                ) : (
                    <h1>No Task added</h1>
                )}
            </div>
        </div>
    );
};

export default BlogOverview;
