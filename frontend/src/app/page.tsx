"use client";
import { hasCookie } from "cookies-next";

import React, {
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  useCallback,
  useState,
  useRef,
} from "react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import ChatInput from "@/components/chatinput";
import MessageList from "@/components/message";
import { redirect } from "next/navigation";

type conversationType = {
  id: string;
  message: string | undefined;
  role: string;
};

export default function Home() {
  const [conversation, setConversation] = useState<conversationType[]>([]);
  const [textBoxInput, setTextBoxInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentMessageRef = useRef("");
  const latestChatId = () => crypto.randomUUID();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // if(!hasCookie("access_token")){
  //   redirect("/auth/signIn"
  //   )
  // }

  const sendUserQuery = (
    e: KeyboardEvent<HTMLTextAreaElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    /*
    Step 1: Flip the loading to true
    Step 2: Update the response of user in conversation array
    Step 3: Fetch the data from ollama
    Step 4: Create the output messageBox
    Step 5: Stream the ollama response
    Step 6: Clear textBoxInput value
    */
    setIsLoading((prev) => true);

    const userMessageId = latestChatId();
    const botMessageId = latestChatId();

    setConversation((prev) => [
      ...prev,
      { id: userMessageId, message: textBoxInput, role: "User" },
    ]);

    setConversation((prev) => [
      ...prev,
      { id: botMessageId, message: undefined, role: "Bot" },
    ]);

    setTextBoxInput("");

    try {
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen2.5:0.5b",
          stream: true,
          prompt: textBoxInput,
        }),
      })
        .then((res) => {
          setIsLoading((prev) => false);
          handleStreamResponse(res, botMessageId);
        })
        .catch((error) => setErrorMessage("Problem with response"));
    } catch (error) {
      setErrorMessage("Failed to Fetch response");
    }
  };

  const handleStreamResponse = (response: Response, botMessageId: string) => {
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    currentMessageRef.current = "";

    function processStream() {
      reader
        .read()
        .then(({ done, value }: any) => {
          if (done) {
            setIsLoading(false);
            return;
          }

          const chunk = decoder.decode(value);
          const text_chunk = JSON.parse(chunk);
          currentMessageRef.current += text_chunk.response;

          setConversation((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId
                ? { ...msg, message: currentMessageRef.current }
                : msg
            )
          );

          processStream();
        })
        .catch((err) => setErrorMessage("Problem With Response Streaming"));
    }
    processStream();
  };

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 bg-[#18191a]">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      HealthGpt
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="w-full h-[calc(100vh-3.5rem)] flex flex-1 flex-col gap-4 px-4 overflow-hidden bg-[#18191a]">
            <div className="mx-auto h-[calc(100vh-10rem)] w-full max-w-3xl overflow-y-auto scrollbar-gutter-stable scroll-m-4">
              {conversation.length > 0 ? (
                <MessageList
                  conversations={conversation}
                  isLoading={isLoading}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-200 gap-2">
                    Health GPT
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className="sticky bottom-0 left-0 right-0 w-full px-4">
            <div className="mx-auto max-w-3xl">
              <ChatInput
                control={{
                  textBoxInput,
                  setTextBoxInput,
                  sendUserQuery,
                  isLoading,
                  errorMessage,
                }}
              />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
