import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";

export function CardItemChatSessionHistory({
  chatSession,
  setSelectedChatSession,
}) {
  return (
    <div
      className="flex flex-row items-center justify-between p-4 bg-white shadow-md rounded-lg mb-2 w-64"
      key={chatSession.id}
    >
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">{chatSession.title}</h1>
        <p className="text-sm text-gray-500">{chatSession.created_at}</p>
      </div>
      <div>
        <Button
          variant="secondary"
          onClick={() => setSelectedChatSession(chatSession)}
        >
          <LogInIcon size="16" className="mr-2" /> Join
        </Button>
      </div>
    </div>
  );
}
