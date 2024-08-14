import { LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import telkomIcon from "@/assets/telkom_indonesia.jpg";

/*
  HEADER CHAT SECTION

  1. HeaderChatSection digunakan untuk menampilkan header pada chat section
  2. Component ini digunakan pada ChatScreen
  3. HeaderChatSection berisi:
     - Logo Telkom Indonesia
     - Nama Telkom Indonesia
     - Button Exit
  4. Button Exit digunakan untuk kembali ke home screen (href='/')
  5. Button Exit akan mereset state pada home screen (karena akan render ulang)
*/

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
            <AvatarImage src={telkomIcon} />
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
