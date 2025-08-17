import React, { useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import toast from "react-hot-toast";
import { Wifi } from "lucide-react";
export default function SendForm({}: { idAddress : string ,}) {
  let [isOpen, setIsOpen] = useState(true);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <>
        <Button
          onClick={open}
          className="m-auto mt-6 w-screen flex justify-center"
        >
          <Wifi className="w-10 h-8  animate-pulse" />
        </Button>

        <Dialog
          open={isOpen}
          as="div"
          className="relative  z-1001 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl backdrop-blur-3xl bg-black/30 sm:bg-white/2 shadow-md p-6  duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
              >
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-semibold tracking-[1.5px] text-white"
                >
                  Wifi Informtion
                </DialogTitle>
                {/* <input
                  className="outline-0 text-[12px] text-center sm:text-[20px] shadow-2xl w-[100%] mt-4 m-auto sm:w-[80%] shadow-white/50 hover:shadow-md duration-300 rounded-2xl h-8"
                  type="text"
                  placeholder="ENTER YOUR CONNECTION ID"
                  value={idAddress} // ✅ ربط القيمة بالحالة
                  onChange={(e) => {
                    const newAddress = e.target.value;
                    setIdAddress(
                      JSON.stringify(
                        localStorage.setItem("esp_url", newAddress)
                      )
                    ); // ✅ حفظ في الحالة
                    localStorage.setItem("esp_url", newAddress); // ✅ حفظ في localStorage
                    setTimeout(() => {
                      toast.success("IP Address updated successfully", {
                        duration: 3000,
                        position: "top-center",
                        style: {
                          background: "#333",
                          color: "#fff",
                          width: "300px",
                        },
                      });
                      fetchStatus();
                    }, 3000);
                  }}
                /> */}
                <div className="mt-4 flex items-center ">
                  <Button
                    className="inline-flex w-full items-center gap-2 rounded-md bg-gray-400/20 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 duration-500 hover:translate-y-1 hover:shadow-2xl"
                    // onClick={close}
                  >
                    CONNECT
                  </Button>
                  <Button
                    className="w-full text-right  items-center gap-2 rounded-md bg-gray-700/20 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-800/30 data-open:bg-gray-900/30 duration-500 hover:translate-y-1 hover:shadow-2xl"
                    onClick={close}
                  >
                    CANCEL
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
    </>
  );
}
