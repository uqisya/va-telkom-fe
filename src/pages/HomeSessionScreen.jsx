import { Button } from "@/components/ui/button";
import axios from "axios";
import { LogInIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ChatScreen } from "./ChatScreen";
import { CardItemChatSessionHistory } from "@/components/CardItemChatSessionHistory";

export function HomeSessionScreen() {
  const [chatSessionsHistory, setChatSessionsHistory] = useState([]);
  const [error, setError] = useState(null);
  const [chatSession, setChatSession] = useState({});

  const [showChatScreen, setShowChatScreen] = useState(false);
  const [totalChat, setTotalChat] = useState(0);

  useEffect(() => {
    async function getChatSessions() {
      try {
        const response = await axios.get("http://localhost:8000/api/chats");
        setChatSessionsHistory(response.data.data);
        setTotalChat(response.data.data.length);
      } catch (error) {
        setError(error.response.data.message);
      }
    }
    getChatSessions();
  }, []);

  function handleSelectChange(event) {
    const selectedId = parseInt(event.target.value, 10);
    const selectedSession = chatSessionsHistory.filter(
      (session) => session.id === selectedId
    );
    // setSelectedChatSession(selectedSession[0]);
  }

  async function startchatSession() {
    try {
      const response = await axios.post("http://localhost:8000/api/chats");
      setChatSession(response.data.data);
      setShowChatScreen(true);
    } catch (error) {
      setError(error.response.data.message);
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
