import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

const BlogList = ({ list, setEditData, setTodoFormData, setTodoDialog }) => {
    const { title, description, _id } = list;

    const handleDelete = async () => {
        try {
            const request = await fetch(`/api/delete-todo?id=${_id}`, {
                method: "DELETE",
            });
            const response = await request.json();
            if (response?.success) {
                window.location.reload(); // Reload the page after deletion
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleEdit = () => {
        setTodoDialog(true);
        setEditData(true);
        setTodoFormData({
            title: title,
            description: description,
            _id: _id, 
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <Button type="button" onClick={handleDelete}>
                    Delete
                </Button>
                <Button type="button" onClick={handleEdit}>
                    Edit
                </Button>
            </CardFooter>
        </Card>
    );
};

export default BlogList;
