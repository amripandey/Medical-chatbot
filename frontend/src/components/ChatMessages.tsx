import Markdown from "react-markdown";
import useAutoScroll from "@/hooks/useAutoScroll";
import Spinner from "@/components/Spinner";
import { Bot, User, CircleX } from "lucide-react";
import { useEffect, useRef } from "react";

function ChatMessages({ messages, isLoading }: any) {
  const scrollRef = useRef(null);
  const scrollContentRef = useAutoScroll(scrollRef, isLoading);

  return (
    <div className="grow space-y-4 px-2">
      {messages.map(({ role, content, loading, error }: any, idx: any) => (
        <div
          key={idx}
          className={`flex ${
            role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex items-start gap-4 py-4 px-3 rounded-xl ${
              role === "user" ? "bg-gray-700" : "bg-transparent"
            } max-w-[80%] break-words`}
            style={{
              boxSizing: "border-box",
              maxWidth: "80%",
              wordWrap: "break-word",
            }}
          >
            {role === "user" && (
              <User
                className="h-5 w-5 bg-gray-500 rounded-md shrink-0"
                name="user"
              />
            )}
            {role === "assistant" && (
              <Bot className="h-5 w-5 block shrink-0 " />
            )}
            <div>
              <div className="markdown-container">
                {loading && !content ? (
                  <Spinner />
                ) : role === "assistant" ? (
                  <Markdown>{content}</Markdown>
                ) : (
                  <div className="whitespace-pre-line">{content}</div>
                )}
              </div>
              {error && (
                <div
                  className={`flex items-center gap-1 text-sm text-error-red ${
                    content && "mt-2"
                  }`}
                >
                  <CircleX className="h-5 w-5 text-red-900" name="error" />
                  <span className="text-red-600">
                    Error generating the response
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
}

export default ChatMessages;
