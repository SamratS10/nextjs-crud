import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddTodoDialog({todoDialog,setTodoDialog,todoFormData,setTodoFormData,handleFormSubmit}) {
  return (
    <Dialog open={todoDialog} onOpenChange={setTodoDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input name="title"id="title" value={todoFormData.title} onChange={(e)=>setTodoFormData({
                ...todoFormData,title:e.target.value
            })} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input name="description" id="description" value={todoFormData.description} onChange={(e)=>setTodoFormData({
                ...todoFormData,description:e.target.value
            })} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleFormSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddTodoDialog
