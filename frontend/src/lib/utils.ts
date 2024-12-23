import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function* handleStreamResponse(stream: any) {
  const reader = stream.getReader(); // Get the stream reader
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read(); // Read the next chunk

      if (done) break; // Exit loop if the stream is complete
    
      const chunk = decoder.decode(value, { stream: true }); // Decode the chunk
      yield JSON.parse(chunk); // Parse and yield the JSON data
    }
  } finally {
    reader.releaseLock(); // Ensure reader is released when done
  }
}
