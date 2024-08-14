import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChatScreen } from "./ChatScreen";
import { CardItemChatSessionHistory } from "@/components/CardItemChatSessionHistory";
import { BASE_URL } from "@/services/api";
import { toast } from "sonner";

/*
  AWALAN

  1. saat component ini di render, maka akan lakukan fetch data '/chats' (GET)
  2. data chat session yang didapat akan disimpan ke state 'chatSessionsHistory' (array list)
  3. total chat session akan disimpan ke state 'totalChat'
  4. state showChatScreen saat ini false, artinya akan tetap di home screen saat ini
*/

/*
  JIKA KLIK TOMBOL 'Create New Chat'

  1. akan eksekusi async function 'startchatSession' yang akan request ke API '/chats' (POST)
  2. chat session yang baru dibuat akan disimpan ke state 'chatSession'
  3. state showChatScreen jadi true, artinya akan pindah ke chat screen dengan chat_session_id yang baru dibuat
*/

/*
  JIKA KLIK JOIN DARI CHAT SESSION HISTORY

  1. akan eksekusi function 'joinChatSession', ia akan meminta chat session yang dipilih dengan cara trigger onClick button 'Join' dari CardItemChatSessionHistory, lalu akan simpan chat session yang dipilih ke state 'chatSession'
  2. state showChatScreen jadi true, artinya akan pindah ke chat screen dengan chat_session_id yang dipilih
*/

export function HomeSessionScreen() {
  // state array list yang nanti akan diisi setelah fetch data dari API
  const [chatSessionsHistory, setChatSessionsHistory] = useState([]);

  // state untuk menyimpan object chat session yang dipilih, fungsinya nanti untuk lihat detail chat session (by chat_session_id)
  const [chatSession, setChatSession] = useState({});

  // state untuk atur ganti tampilan ke chat screen atau tetap di home screen
  const [showChatScreen, setShowChatScreen] = useState(false);

  // state untuk menyimpan total chat, diisi setelah fetch data dari API
  const [totalChat, setTotalChat] = useState(0);

  // fetch data '/chats' (GET) saat component ini di render
  useEffect(() => {
    async function getChatSessions() {
      try {
        const response = await axios.get(`${BASE_URL}/chats`);
        // simpan data chat session ke state (array list)
        setChatSessionsHistory(response.data.data);
        // simpan total chat ke state
        setTotalChat(response.data.data.length);
      } catch (error) {
        handleError(error);
      }
    }
    getChatSessions();
  }, []);

  // handle saat klik tombol 'Create New Chat', akan eksekusi function ini
  async function startchatSession() {
    try {
      // request ke API untuk create new chat session
      const response = await axios.post(`${BASE_URL}/chats`);
      // set chat session yang baru dibuat ke state (fungsinya untuk simpan chat_session_id)
      setChatSession(response.data.data);
      // set state showChatScreen jadi true, artinya akan pindah ke chat screen
      setShowChatScreen(true);
    } catch (error) {
      handleError(error);
    }
  }

  // handle error saat fetch data atau request API
  function handleError(error) {
    if (error.response) {
      // handle error kalau ada response error dari API
      toast.error(error.response.data.message);
    } else {
      // handle error kalau tidak ada response dari API
      toast.error(error.message);
    }
  }

  // function ini akan dipanggil saat klik button 'Join' dari CardItemChatSessionHistory
  function joinChatSession(chatSession) {
    // set chat session yang dipilih ke state
    setChatSession(chatSession);
    // set state showChatScreen jadi true, artinya akan pindah ke chat screen
    setShowChatScreen(true);
  }

  // jika state showChatScreen true, maka akan pindah/tampilkan component ChatScreen dengan chat_session_id (baik yang baru dibuat atau yang sudah ada)
  if (showChatScreen) {
    return <ChatScreen chatSessionID={chatSession.id} />;
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen my-4 mb-16">
        <label className="font-semibold">Chat Session History</label>
        <label className="text-sm text-gray-500">Total Chat: {totalChat}</label>
        <div className="m-4">
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
        <div className="fixed bottom-0 bg-white w-full max-w-md p-4">
          <Button className="w-full" onClick={() => startchatSession()}>
            Create New Chat
          </Button>
        </div>
      </div>
    </>
  );
}
