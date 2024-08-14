import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChatScreen } from "./ChatScreen";
import { CardItemChatSessionHistory } from "@/components/CardItemChatSessionHistory";
import { BASE_URL } from "@/services/api";
import { toast } from "sonner";

export function HomeSessionScreen() {
  const [chatSessionsHistory, setChatSessionsHistory] = useState([]);
  const [chatSession, setChatSession] = useState({});

  const [showChatScreen, setShowChatScreen] = useState(false);
  const [totalChat, setTotalChat] = useState(0);

  useEffect(() => {
    async function getChatSessions() {
      try {
        const response = await axios.get(`${BASE_URL}/chats`);
        setChatSessionsHistory(response.data.data);
        setTotalChat(response.data.data.length);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    getChatSessions();
  }, []);

  async function startchatSession() {
    try {
      const response = await axios.post(`${BASE_URL}/chats`);
      setChatSession(response.data.data);
      setShowChatScreen(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  function joinChatSession(chatSession) {
    setChatSession(chatSession);
    setShowChatScreen(true);
  }

  if (showChatScreen) {
    return <ChatScreen chatSessionID={chatSession.id} />;
  }

  return (
    <>
      <div className="flex flex-col items-center h-screen m-4 mb-16">
        <label className="font-semibold">Chat Session History</label>
        <label className="text-sm text-gray-500">Total Chat: {totalChat}</label>
        <div>
          {chatSessionsHistory.length === 0 ? (
            <p>No chat sessions available</p>
          ) : (
            <>
              {chatSessionsHistory.map((chatSession) => {
                return (
                  <>
                    <CardItemChatSessionHistory
                      chatSession={chatSession}
                      setSelectedChatSession={joinChatSession}
                      key={chatSession.id}
                    />
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 p-4 bg-white flex items-center justify-center">
        <Button className="w-full" onClick={() => startchatSession()}>
          Create New Chat
        </Button>
      </div>
    </>
  );
}
