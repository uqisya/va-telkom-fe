import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { userEnum } from "@/enums/userEnum";
import { toast } from "sonner";
import { SendIcon } from "lucide-react";

/*
  PROPS

  1. placeholder: placeholder untuk textarea
  2. handleMessageSubmit: fungsi untuk meng-handle submit pesan dari user
*/

export function TextareaWithButtonIcon({ placeholder, handleMessageSubmit }) {
  // state untuk menyimpan value dari inputan user
  const [inputValue, setInputValue] = useState({
    fullname: "",
    message: "",
  });

  // fungsi untuk meng-handle perubahan inputan user
  function handleInputChange(e) {
    setInputValue({
      fullname: userEnum.CLIENT,
      message: e.target.value,
    });
  }

  // fungsi untuk meng-handle submit pesan dari user
  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.message === "") {
      toast.warning("Pesan tidak boleh kosong.");
    } else {
      // kirim pesan user ke parent component (ChatScreen)
      handleMessageSubmit(inputValue);
      // reset inputan user ke empty string
      setInputValue({
        fullname: "",
        message: "",
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <div className="flex w-full items-center space-x-2 py-2">
          <Textarea
            placeholder={placeholder}
            value={inputValue.message}
            onChange={handleInputChange}
          />
          <Button type="submit">
            <SendIcon size={24} className="text-white" />
          </Button>
        </div>
      </form>
    </>
  );
}
