"use client";

import { User, Bot, TextCursor } from "lucide-react";

type MessageType = {
  message: string | undefined;
  role: string;
};

type MessageListType = {
  conversations: MessageType[];
  isLoading: boolean;
};

type MessageBoxType = {
  message: string | undefined;
  role: string;
  isLoading: boolean;
};

type roleColorMatchType = {
  User: string;
  Bot: string;
};

export default function MessageList({
  conversations,
  isLoading,
}: MessageListType) {
  return (
    <div className="flex flex-col items-center text-sm bg-gray-800 overflow-x-hidden overflow-y-auto">
      {conversations.map((item: MessageType, index: number) => (
        <MessageBox
          isLoading={isLoading}
          key={index}
          message={item.message}
          role={item.role}
        />
      ))}
    </div>
  );
}

function MessageBox({ message, role, isLoading }: MessageBoxType) {
  const roleColorMatch: { [index: string]: string } = {
    User: "bg-gray-800",
    Bot: "bg-[#444654]",
  };

  const isUser = role === "User";

  return (
    <div
      className={`group w-full text-gray-100 border-b border-gray-900/50 ${roleColorMatch[role]} `}
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 m-auto w-full">
        <div className="flex flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
          <div className="w-8 flex flex-col relative items-end">
            <div className="relative h-7 w-7 p-1 flex items-center justify-center bg-black/75 text-opacity-100">
              {isUser ? (
                <User className="h-4 w-4 " />
              ) : (
                <Bot className="h-4 w-4 " />
              )}
            </div>
          </div>
          <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
            <div className="flex flex-grow flex-col gap-3">
              <div className="flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                <div className="prose w-full break-words prose-invert">
                  {isLoading || message == undefined ? (
                    <TextCursor className="h-6 w-6 animate-pulse" />
                  ) : (
                    <p>{message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
