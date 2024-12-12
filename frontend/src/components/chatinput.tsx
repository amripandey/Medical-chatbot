import { Send } from "lucide-react";
import React, { useState, ChangeEvent, useEffect, MouseEvent } from "react";

interface propType {
  control: {
    textBoxInput: string;
    setTextBoxInput: React.Dispatch<React.SetStateAction<string>>;
    sendUserQuery: (e: MouseEvent<HTMLButtonElement>) => void;
    isLoading: boolean;
    errorMessage: string | undefined;
  };
}

export default function ChatInput({ control }: propType) {
  const {
    textBoxInput,
    setTextBoxInput,
    sendUserQuery,
    isLoading,
    errorMessage,
  } = control;


  function processUserInput(userInput: string) {
    const regex = /^\s*$/;

    return regex.test(userInput);
  }

  return (
    <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 border-white/20 md:border-transparent bg-gray-800 md:!bg-transparent md:bg-vert-dark-gradient pt-2">
      <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
          {errorMessage ? (
            <div className="mb-2 md:mb-0">
              <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                <span className="text-red-500 text-sm">{errorMessage}</span>
              </div>
            </div>
          ) : null}
          <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-gray-900/50 text-white bg-gray-700 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.10)]">
            <textarea
              value={textBoxInput}
              tabIndex={0}
              data-id="root"
              placeholder="Send a message..."
              className="outline-none overflow-y-hidden h-[24px] max-h-[200px] m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 pl-2 md:pl-0"
              onChange={(e) => setTextBoxInput(e.target.value)}
            ></textarea>
            <button
              disabled={isLoading || processUserInput(textBoxInput)}
              onClick={sendUserQuery}
              className="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 bg-transparent disabled:bg-gray-500 right-1 md:right-2 disabled:opacity-40"
            >
              <Send className="h-4 w-4 mr-1 text-white " />
            </button>
          </div>
        </div>
      </form>
      <div className="px-3 pt-2 pb-3 text-center text-xs text-white/50 md:px-4 md:pt-3 md:pb-6">
        <span>
          ChatGPT Clone may produce inaccurate information about people, places,
          or facts.
        </span>
      </div>
    </div>
  );
}
