import { UserWithBubbleChat } from "@/components/UserWithBubbleChat";
import { HeaderChatSection } from "../components/HeaderChatSection";
import { TextareaWithButtonIcon } from "@/components/TextareaWithButtonIcon";
import { AssistantWithBubbleChat } from "@/components/AssistantWithBubbleChat";
import { BubbleChat } from "@/components/BubbleChat";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardItemQuestionFaq } from "@/components/CardItemQuestionFaq";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/services/api";
import { userEnum } from "@/enums/userEnum";
import { toast } from "sonner";

/*
  TERIMA PROPS DARI HOME SCREEN

  1. chatSessionID: chat session id yang dipilih
*/

/*
  JIKA KLIK ITEM BUTTON FAQ

  1. akan eksekusi function 'handleFaqButton' yang akan mengirim pesan baru ke server
  2. pesan baru tersebut akan disimpan ke state 'newMessage'
  3. pesan baru tersebut akan ditampilkan di chat screen
  4. pesan tersebut akan dikirim ke server untuk mendapatkan balasan dari asisten/server
  5. balasan dari asisten/server akan disimpan ke state 'newMessage'
  6. balasan tersebut akan ditampilkan di chat screen
*/

/*
  JIKA KLIK BUTTON SEND

  1. akan eksekusi function 'handleMessageSubmit' yang akan mengirim pesan baru ke server
  2. check apakah pesan empty atau tidak, jika empty maka tidak akan mengirim pesan (toast warning)
  3. pesan baru tersebut akan disimpan ke state 'newMessage'
  4. pesan baru tersebut akan ditampilkan di chat screen
  5. pesan tersebut akan dikirim ke server untuk mendapatkan balasan dari asisten/server
  6. balasan dari asisten/server akan disimpan ke state 'newMessage'
  7. balasan tersebut akan ditampilkan di chat screen
*/

/* 
  JIKA KLIK BUTTON EXIT

  1. akan kembali ke home screen dengan cara render ulang atau redirect ke home screen (href='/')
  2. state pada home screen akan direset
*/

export function ChatScreen({ chatSessionID }) {
  // state untuk menyimpan pesan baru baik dari user/client maupun asisten/server
  const [newMessage, setNewMessage] = useState({});
  // state untuk menyimpan list seluruh pesan dari user/client dan asisten/server
  const [messages, setMessages] = useState([]);

  // state untuk menyimpan data faq
  const [faqs, setFaqs] = useState([]);

  // state untuk loading, biasa digunakan ketika fetching data dari API
  const [isLoading, setIsLoading] = useState(false);

  // fetch data chat session dan faq saat component ini di render
  useEffect(() => {
    // fetch seluruh data chat untuk session terpilih
    async function getAllChat() {
      setIsLoading(true);
      try {
        const responseAllChat = await axios.get(
          `${BASE_URL}/chats/${chatSessionID}`
        );
        // mapping data response agar sesuai dengan format yang diinginkan (fullname, message)
        const allChat = responseAllChat.data.data.map((response) => {
          return {
            fullname: response.chat.fullname,
            message: response.chat.message,
          };
        });
        // simpan seluruh data array chat ke state
        setMessages(allChat);
      } catch (error) {
        handleError(error);
      }
      setIsLoading(false);
    }

    // fetch data faq
    async function getFaqs() {
      setIsLoading(true);
      try {
        const responseFaq = await axios.get(`${BASE_URL}/faqs`);
        // simpan data faq ke state
        setFaqs(responseFaq.data.data);
      } catch (error) {
        handleError(error);
      }
      setIsLoading(false);
    }

    getAllChat();
    getFaqs();
  }, [chatSessionID]);

  // ketika ada pesan baru dari user/client atau asisten/server, selalu tambahkan pesan baru ke array list messages
  useEffect(() => {
    if (newMessage.fullname && newMessage.message) {
      setMessages((prevmessage) => [...prevmessage, newMessage]);
    }
  }, [newMessage]);

  // handle ketika user/client klik button item pada faq
  function handleFaqButton(faq) {
    // tambahkan pesan baru
    setNewMessage({
      fullname: userEnum.CLIENT,
      message: faq.question,
    });

    // kirim pesan baru tersebut ke server
    sendMessageToAssistant({
      fullname: userEnum.CLIENT,
      message: faq.question,
    });
  }

  // fungsi untuk mengirim pesan ke asisten/server, kemudian akan mendapatkan balasan berupa pesan
  async function sendMessageToAssistant(value) {
    try {
      // kirim body fullname dan message ke server
      const responseAssistant = await axios.post(
        `${BASE_URL}/chats/${chatSessionID}`,
        {
          fullname: value.fullname,
          message: value.message,
        }
      );

      // set pesan baru dari balasan asisten/server
      setNewMessage(responseAssistant.data.data.chat);
    } catch (error) {
      handleError(error);
    }
  }

  // fungsi untuk meng-handle submit pesan dari user (textarea input)
  function handleMessageSubmit(value) {
    // tambahkan pesan baru
    setNewMessage({
      fullname: value.fullname,
      message: value.message,
    });
    // kirim pesan baru tersebut ke server
    sendMessageToAssistant(value);
  }

  // fungsi untuk meng-handle error ketika fetch data dari API
  function handleError(error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }

  // render skelenton untuk loading
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
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 bg-white">
          <HeaderChatSection />
        </div>
        <div className="flex-auto m-4">
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
              {messages.map((value, index) => {
                if (value.fullname === userEnum.CLIENT) {
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
          )}
        </div>
        <div className="sticky bottom-0 bg-white p-4">
          <TextareaWithButtonIcon
            placeholder="ketik pesan anda di sini..."
            handleMessageSubmit={handleMessageSubmit}
          />
        </div>
      </div>
    </>
  );
}
