import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function HeaderChatSection() {
  function handleExitButton() {
    window.location.href = "/";
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center m-4">
        <div></div>
        <div>
          <Avatar>
            <AvatarImage src="https://yt3.googleusercontent.com/Oz7S9wfKxR9T_8HqGkyTLISMLINsIlNjL3yA8QZZpf7Foc7IHDwRz5qgfl1rC5KRi0ig7AgKsQ=s900-c-k-c0x00ffffff-no-rj" />
            <AvatarFallback>TI</AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <h1>Ada pertanyaan? Chat aja di sini!</h1>
        </div>
        <div>
          <Button
            size="sm"
            variant="secondary"
            className="w-32"
            onClick={() => handleExitButton()}
          >
            <LogOutIcon size={24} className="mr-2" />
            Exit
          </Button>
        </div>
      </div>
      <Separator />
    </>
  );
}
