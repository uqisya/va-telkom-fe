import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export function HeaderChatSection() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center m-4">
        <div>
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/port" />
            <AvatarFallback>TI</AvatarFallback>
          </Avatar>
        </div>
        <div className="">
          <h1>Ada pertanyaan? Chat aja di sini!</h1>
        </div>
      </div>
      <Separator />
    </>
  );
}
