"use client";

import { hasCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { handleStreamResponse } from "@/lib/utils";

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

import ChatInput from "@/components/ChatInput1";
import ChatMessages from "@/components/ChatMessages";

import MessageList from "@/components/message";
import { redirect } from "next/navigation";

type conversationType = {
  id: string;
  message: string | undefined;
  role: string;
};

type messages = {
  role: string;
  content: string;
  sources: string[];
  loading: boolean;
  error: boolean;
};

export default function Home() {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useImmer<messages[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const isLoading =
    messages.length && messages[messages.length - 1].loading;

  // if (!hasCookie("access_token")) {
  //   redirect("/auth/signIn");
  // }

  ("use server");
  async function sendChatMessage(message: any) {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen2.5:0.5b",
        stream: true,
        prompt: message,
      }),
    });
    if (!res.ok) {
      return Promise.reject({ status: res.status, data: await res.json() });
    }
    return res.body;
  }

  ("use server");
  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) return;

    setMessages((draft) => [
      ...draft,
      { role: "user", content: trimmedMessage },
      { role: "assistant", content: "", sources: [], loading: true },
    ]);

    setNewMessage("");
    try {
      const stream = await sendChatMessage(trimmedMessage);
      for await (const textChunk of handleStreamResponse(stream)) {
        setMessages((draft) => {
          draft[draft.length - 1].content += textChunk.response;
        });
      }
      setMessages((draft) => {
        draft[draft.length - 1].loading = false;
      });
    } catch (err) {
      console.log(err);
      setMessages((draft) => {
        draft[draft.length - 1].loading = false;
        draft[draft.length - 1].error = true;
      });
    }
  }

  return (
    <>
      <SidebarProvider className="">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 bg-[#1e1f20]">
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
          <div className="flex flex-1 flex-col">
            <div className="relative grow flex flex-1 flex-col gap-6 pt-2">
              {messages.length === 0 && (
                <div className="mt-3 font-urbanist text-xl font-light space-y-2 text-center">
                  <p>👋 Welcome!</p>
                  <p>
                    I am powered by the latest technology reports from fast and
                    easy medical assistant.
                  </p>
                  <p>Please begin with placing the problem you are facing.</p>
                </div>
              )}
              <ChatMessages messages={messages} isLoading={isLoading} />
            </div>
            <ChatInput
              newMessage={newMessage}
              isLoading={isLoading}
              setNewMessage={setNewMessage}
              submitNewMessage={submitNewMessage}
            />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
