"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";

export function EventDescriptionGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    features: "",
  });
  const [generatedDescription, setGeneratedDescription] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...eventDetails,
          features: eventDetails.features.split(",").map((f) => f.trim()),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedDescription(data.description);
      } else {
        throw new Error("Failed to generate description");
      }
    } catch (error) {
      console.error("Error generating description:", error);
      setGeneratedDescription(
        "Could not generate description. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Sparkles className='h-5 w-5 text-[var(--color-primary))]' />
          AI Event Description Generator
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='title'>Event Title</Label>
          <Input
            id='title'
            name='title'
            value={eventDetails.title}
            onChange={handleChange}
            placeholder='Tech Conference 2023'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='category'>Category</Label>
          <Input
            id='category'
            name='category'
            value={eventDetails.category}
            onChange={handleChange}
            placeholder='Technology'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='date'>Date</Label>
            <Input
              id='date'
              name='date'
              value={eventDetails.date}
              onChange={handleChange}
              placeholder='November 15, 2023'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='location'>Location</Label>
            <Input
              id='location'
              name='location'
              value={eventDetails.location}
              onChange={handleChange}
              placeholder='San Francisco, CA'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='features'>Features (comma-separated)</Label>
          <Input
            id='features'
            name='features'
            value={eventDetails.features}
            onChange={handleChange}
            placeholder='Keynote speeches, Workshops, Networking'
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isLoading || !eventDetails.title || !eventDetails.category}
          className='w-full'
        >
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Generating...
            </>
          ) : (
            "Generate Description"
          )}
        </Button>

        {generatedDescription && (
          <div className='mt-4 space-y-2'>
            <Label>Generated Description</Label>
            <Textarea value={generatedDescription} readOnly className='h-24' />
          </div>
        )}
      </CardContent>
      <CardFooter className='text-xs text-muted-foreground'>
        Powered by OpenAI. Descriptions are generated based on the provided
        event details.
      </CardFooter>
    </Card>
  );
}
