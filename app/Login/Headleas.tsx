import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { axiosClient } from "../config";
import { email } from "zod";

function Headless({data}:{data:{email:string,password:string}}) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => {
        setTimeout(() => {
           axiosClient.post("/forgotPassword",{email:data.email});
        }, 1000);
        setIsOpen(true)}}>Open dialog</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 flex flex-col gap-8 border h-90 backdrop-blur-2xl p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>
            Enter Yor Code To reactivate your account
            </Description>
            <input type="text" className=" outline-0 rounded-4xl shadow-md shadow-black"/>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => alert("Deactivated")}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default Headless;
