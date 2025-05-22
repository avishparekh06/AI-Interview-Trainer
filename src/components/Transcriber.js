"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={`aspect-square h-full w-full ${className}`}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 ${className}`}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

function Transcriber({ conversation }) {
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="flex flex-col w-full max-w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="font-medium text-gray-800">Live Transcript</div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((message, index) => (
          <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {message.role === 'assistant' && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div className={`px-4 py-1 rounded-lg max-w-[70%] ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
              <p>{message.text}</p>
              <div className="text-xs text-gray-400">{message.timestamp}</div>
            </div>
            {message.role === 'user' && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transcriber;
export { Avatar, AvatarImage, AvatarFallback };