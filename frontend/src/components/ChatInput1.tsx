import { Send } from "lucide-react";
import useAutosize from "@/hooks/useAutoSize";

function ChatInput({
  newMessage,
  isLoading,
  setNewMessage,
  submitNewMessage,
}: any) {
  const textareaRef = useAutosize(newMessage);

  function handleKeyDown(e: any) {
    if (e.keyCode === 13 && !e.shiftKey && !isLoading) {
      e.preventDefault();
      submitNewMessage();
    }
  }

  return (
    <div className="sticky bottom-0 py-4 w-full bg-[#1e1f20]">
      <div className="flex w-full justify-center">
        <div className="w-[80%] text-black rounded-3xl z-50 font-mono origin-bottom animate-chat duration-400">
          <div className="pr-0.5 relative shrink-0 rounded-3xl overflow-hidden ring-1 focus-within:ring-2 transition-all">
            <textarea
              className="block max-h-[140px] w-full py-2 px-4 pr-11 rounded-3xl resize-none placeholder:text-gray-600 placeholder:leading-4 placeholder:-translate-y-1 sm:placeholder:leading-normal sm:placeholder:translate-y-0 focus:outline-none"
              ref={textareaRef}
              placeholder="Describe your condition"
              rows={1}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-md hover:bg-slate-300"
              onClick={submitNewMessage}
            >
              <Send className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
