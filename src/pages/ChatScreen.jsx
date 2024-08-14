import { UserWithBubbleChat } from "@/components/UserWithBubbleChat";
import { HeaderChatSection } from "../components/HeaderChatSection";
import { TextareaWithButtonIcon } from "@/components/TextareaWithButtonIcon";
import { SendIcon } from "lucide-react";
import { AssistantWithBubbleChat } from "@/components/AssistantWithBubbleChat";
import { BubbleChat } from "@/components/BubbleChat";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardItemQuestionFaq } from "@/components/CardItemQuestionFaq";
import { Skeleton } from "@/components/ui/skeleton";

export function ChatScreen({ chatSessionID }) {
  // ====================================================================================================
  // state untuk chat
  const [newMessage, setNewMessage] = useState({});
  const [messages, setMessages] = useState([]);

  // ====================================================================================================

  // state untuk menyimpan error dari API
  const [error, setError] = useState(null);

  // state untuk menyimpan data faq
  const [faqs, setFaqs] = useState([]);

  // state untuk loading
  const [isLoading, setIsLoading] = useState(false);

  // set pesan pertama dari asisten ketika halaman pertama kali di-load
  useEffect(() => {
    async function getFirstChat() {
      setIsLoading(true);
      try {
        const responseFirstChat = await axios.get(
          `http://localhost:8000/api/chats/${chatSessionID}`
        );
        setNewMessage(responseFirstChat.data.data.chat);
      } catch (error) {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }

    async function getFaqs() {
      setIsLoading(true);
      try {
        const responseFaq = await axios.get("http://localhost:8000/api/faqs");
        setFaqs(responseFaq.data.data);
      } catch (error) {
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }

    getFirstChat();
    getFaqs();
  }, [chatSessionID]);

  // ketika ada pesan baru dari asisten, tambahkan ke array pesan asisten
  useEffect(() => {
    if (newMessage.fullname && newMessage.message) {
      setMessages((prevmessage) => [...prevmessage, newMessage]);
    }
  }, [newMessage]);

  // handle faq template
  function handleFaqButton(faq) {
    // add faq to user messages
    setMessages((prevmessage) => [
      ...prevmessage,
      { fullname: "Anda", message: faq.question },
    ]);

    // send message to assistant (hit API)
    sendMessageToAssistant({
      fullname: "Anda",
      message: faq.question,
    });
  }

  // hit API untuk mengirim pesan ke asisten, dan menerima balasan dari asisten
  async function sendMessageToAssistant(value) {
    // kirim pesan ke API
    try {
      const responseAssistant = await axios.post(
        `http://localhost:8000/api/chats/${chatSessionID}`,
        {
          fullname: value.fullname,
          message: value.message,
        }
      );

      // set pesan balasan dari asisten
      setNewMessage(responseAssistant.data.data.chat);
    } catch (error) {
      setError(error);
    }
  }

  // fungsi untuk meng-handle submit pesan dari user (passing function ke TextareaWithButtonIcon)
  function handleMessageSubmit(value) {
    setNewMessage({
      fullname: value.fullname,
      message: value.message,
    });
    sendMessageToAssistant(value);
  }

  // render skelenton apabila loading
  function generateSkeleton() {
    return (
      <>
        <div className="rounded-md">
          <Skeleton className="h-12 w-[75%] my-2" />
          <Skeleton className="h-12 w-[75%] my-2" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col m-4 min-h-screen">
        <div className="sticky top-0 bg-white">
          <HeaderChatSection />
        </div>
        <div className="flex-auto">
          {isLoading ? (
            generateSkeleton()
          ) : (
            <div>
              Faq:
              {faqs.map((faq) => {
                return (
                  <CardItemQuestionFaq
                    key={faq.id}
                    faq={faq}
                    handleFaqButton={handleFaqButton}
                  />
                );
              })}
            </div>
          )}
          {messages
            .filter((value) => {
              return !(value.fullname === "" && value.message === "");
            })
            .map((value, index) => {
              if (value.fullname === "Anda") {
                return (
                  <UserWithBubbleChat key={index}>
                    <BubbleChat
                      fullname={value.fullname}
                      message={value.message}
                      bgColor="bg-slate-100"
                    />
                  </UserWithBubbleChat>
                );
              }
              return (
                <AssistantWithBubbleChat key={index}>
                  <BubbleChat
                    fullname={value.fullname}
                    message={value.message}
                    bgColor="bg-red-100"
                  />
                </AssistantWithBubbleChat>
              );
            })}
        </div>
        <div className="sticky bottom-0 bg-white">
          <TextareaWithButtonIcon
            placeholder="ketik pesan anda di sini..."
            handleMessageSubmit={handleMessageSubmit}
          >
            <SendIcon size={24} className="text-white" />
          </TextareaWithButtonIcon>
        </div>
      </div>
    </>
  );
}
