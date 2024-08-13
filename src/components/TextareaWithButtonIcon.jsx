import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function TextareaWithButtonIcon({
  placeholder,
  children,
  handleMessageSubmit,
}) {
  // state untuk menyimpan value dari inputan user
  const [inputValue, setInputValue] = useState({
    fullname: "",
    messageValue: "",
  });

  // fungsi untuk meng-handle perubahan inputan user
  function handleInputChange(e) {
    setInputValue({
      fullname: "Anda",
      messageValue: e.target.value,
    });
  }

  // fungsi untuk meng-handle submit pesan dari user
  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.messageValue === "") {
      alert("Tidak boleh kosong");
    } else {
      handleMessageSubmit(inputValue);
      // reset inputan user ke empty string
      setInputValue({
        fullname: "",
        messageValue: "",
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <div className="flex w-full items-center space-x-2 py-2">
          <Textarea
            placeholder={placeholder}
            value={inputValue.messageValue}
            onChange={handleInputChange}
          />
          <Button type="submit">{children}</Button>
        </div>
      </form>
    </>
  );
}
