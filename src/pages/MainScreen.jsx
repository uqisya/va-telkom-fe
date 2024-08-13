import { UserWithBubbleChat } from "@/components/UserWithBubbleChat";
import { HeaderChatSection } from "../components/HeaderChatSection";
import { TextareaWithButtonIcon } from "@/components/TextareaWithButtonIcon";
import { SendIcon } from "lucide-react";

export function MainScreen() {
  return (
    <>
      <HeaderChatSection />
      <div className="flex flex-col m-4 h-screen">
        <div className="flex-auto">
          <div className="flex-col items-start justify-start text-start mb-4">
            <UserWithBubbleChat
              fullname="Teman 1"
              messageValue="Hai! Ada yang bisa saya bantu?"
            />
          </div>

          <div className="flex-col items-end justify-end text-end mb-4">
            <UserWithBubbleChat
              fullname="Anda"
              messageValue="Bagaimana cara daftar kuliah di Telkom?"
            />
          </div>
        </div>

        <div className="sticky bottom-12 bg-white">
          <TextareaWithButtonIcon placeholder="ketik pesan anda di sini...">
            <SendIcon size={24} className="text-white" />
          </TextareaWithButtonIcon>
        </div>
      </div>
    </>
  );
}
