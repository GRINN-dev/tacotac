import { Send } from "lucide-react";

import { attendeeStatusArray } from "@/components/data/status";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const ModalStatus = () => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="shadow hover:shadow-lg">
            Liste status
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              <div className="m-auto flex flex-col items-center justify-center rounded-lg border p-4">
                <ul className="list-disc">
                  {attendeeStatusArray.map((value, index) => (
                    <li key={value.enum + index} className="ml-4 text-sm">
                      {value.enum} - {value.name}
                    </li>
                  ))}
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};