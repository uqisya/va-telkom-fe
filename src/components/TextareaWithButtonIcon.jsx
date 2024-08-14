import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { userEnum } from "@/enums/userEnum";
import { toast } from "sonner";

export function TextareaWithButtonIcon({
  placeholder,
  children,
  handleMessageSubmit,
}) {
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
          <Button type="submit">{children}</Button>
        </div>
      </form>
    </>
  );
}
