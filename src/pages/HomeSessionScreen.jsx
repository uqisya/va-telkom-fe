import { Button } from "@/components/ui/button";
import axios from "axios";
import { LogInIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ChatScreen } from "./ChatScreen";

export function HomeSessionScreen() {
  const [chatSessionsHistory, setChatSessionsHistory] = useState([]);
  const [error, setError] = useState(null);
  const [newChatSession, setNewChatSession] = useState({});

  const [selectedChatSession, setSelectedChatSession] = useState({});

  const [showChatScreen, setShowChatScreen] = useState(false);

  useEffect(() => {
    async function getChatSessions() {
      try {
        const response = await axios.get("http://localhost:8000/api/chats");
        setChatSessionsHistory(response.data.data);
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
    setSelectedChatSession(selectedSession[0]);
  }

  async function startNewChatSession() {
    try {
      const response = await axios.post("http://localhost:8000/api/chats");
      setNewChatSession(response.data.data);
      setShowChatScreen(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  if (showChatScreen) {
    return <ChatScreen chatSessionID={newChatSession.id} />;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="mb-4">
          <Button onClick={() => startNewChatSession()}>Create New Chat</Button>
        </div>
        <label>Select Session:</label>
        <div className="my-4">
          {chatSessionsHistory.length === 0 ? (
            <p>No chat sessions available</p>
          ) : (
            <>
              <select className="mr-4" onChange={handleSelectChange}>
                {chatSessionsHistory.map((chatSession) => {
                  return (
                    <option key={chatSession.id} value={chatSession.id}>
                      {chatSession.title}
                    </option>
                  );
                })}
              </select>
              <Button size="icon">
                <LogInIcon size="16" />
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
