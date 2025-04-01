"use client";
import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import { UpcomingEvents } from "@/components/home/Upcoming-events";
import PopularCategories from "@/components/home/popular-categories";
import FAQ from "@/components/AllCategories/FAQ";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowDownCircleIcon,
  Loader2,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    reload,
    status,
    error,
  } = useChat({
    api: "/api/gemini",
  });
  useEffect(() => {
    if (status === "submitted") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className={"w-11/12 mx-auto"}>
      <Hero />
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              className="rounded-full size-12 p-2 shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none"
            >
              {!isChatOpen ? (
                <MessageCircle className="size-6" />
              ) : (
                <ArrowDownCircleIcon className="size-6" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 w-[95%] md:w-[500px] right-4 z-50"
          >
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg font-bold">
                  Chat with us
                </CardTitle>
                <Button
                  onClick={toggleChat}
                  size="sm"
                  variant="ghost"
                  className="px-2 py-0"
                >
                  <X className="size-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </CardHeader>
              <CardContent className="overflow-hidden">
                <ScrollArea className="h-[300px] overflow-y-auto pr-4">
                  {messages?.length === 0 && (
                    <div className="w-full mt-32 text-gray-500 items-center justify-center flex gap-3">
                      No messages yet. Start a conversation.
                    </div>
                  )}
                  {messages?.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block rounded-lg ${
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-muted"
                        } p-3 px-4 `}
                      >
                        <ReactMarkdown
                          // eslint-disable-next-line react/no-children-prop
                          children={message.content}
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({
                              inline,

                              children,
                              ...props
                            }: { inline?: boolean | undefined;
                                children: ReactNode;}) {
                              return inline ? (
                                <code
                                  {...props}
                                  className="bg-gray-200 px-1 rounded"
                                >
                                  {children}
                                </code>
                              ) : (
                                <pre
                                  {...props}
                                  className="bg-gray-200 p-2 rounded"
                                >
                                  <code>{children}</code>
                                </pre>
                              );
                            },
                            ul: ({ children }) => (
                              <ul className="list-disc ml-4">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal ml-4">{children}</ol>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="w-full mt-32 text-gray-500 items-center justify-center flex gap-3">
                      <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
                      <button
                        className="text-gray-500 text-sm underline"
                        type="button"
                        onClick={() => stop()}
                      >
                        abort...
                      </button>
                    </div>
                  )}
                  {error && (
                    <div className="w-full text-gray-500 items-center justify-center flex gap-3">
                      <div className="text-red-500">
                        Error: An error occurred while loading the messages.
                      </div>
                      <button
                        className="text-gray-500 text-sm underline"
                        type="button"
                        onClick={() => reload()}
                      >
                        Retry
                      </button>
                    </div>
                  )}
                  <div ref={scrollRef}></div>
                </ScrollArea>
              </CardContent>

              <CardFooter>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center space-x-2"
                >
                  <input
                    value={input}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Type your message"
                    className="flex-1 p-2 border-2 rounded-md"
                  />
                  <Button
                    type="submit"
                    className="size-9"
                    disabled={isLoading}
                    size="icon"
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <PopularCategories />
      <Testimonials />
      <FAQ />
      <Statistics />
      <UpcomingEvents />
      <CTA />
      <Footer />
    </div>
  );
}
