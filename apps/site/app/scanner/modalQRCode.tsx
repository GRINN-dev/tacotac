import { FC } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { buttonVariants } from "@/components/ui/button";

export interface ModalCodeProps {
  titleTrigger: string;
  titleButton: string;
  isOpen?: any;
  onClick: (ticketNumber: string) => void;
}

const ModalCode: FC<ModalCodeProps> = ({ titleTrigger, titleButton, onClick, isOpen }) => {
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className={buttonVariants({ size: "sm" })}>{titleTrigger}</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <fieldset className="mb-[15px] flex items-center gap-5">
              Code
              <input
                className="text-black shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-2 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="username"
                defaultValue="123456789"
              />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button type="button" className={buttonVariants({ size: "sm" })} onClick={() => onClick}>
                  {titleButton}
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-black hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                X
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default ModalCode;
