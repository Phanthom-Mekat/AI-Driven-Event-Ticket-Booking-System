"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventDescriptionGenerator } from "@/components/event-description-generator";

export default function CreateEventPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);
    setIsLoading(true);
  };

  return (
    <div className='min-h-screen py-12'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-3xl font-bold mb-8 text-center'>
            Create a New Event
          </h1>

          <Tabs defaultValue='manual'>
            <TabsList className='grid w-full grid-cols-2 mb-6'>
              <TabsTrigger value='manual'>Manual Entry</TabsTrigger>
              <TabsTrigger value='ai-assist'>AI Assistance</TabsTrigger>
            </TabsList>
            {/* Manual Description Taps */}
            <TabsContent value='manual'>
              <Card>
                <form onSubmit={handleSubmit}> 
                  <CardContent className='space-y-6'>
                    <div className='space-y-2'>
                      <Label htmlFor='instructor'>Instructor:</Label>
                      <Input
                        id='instructor'
                        placeholder='Enter event instructor'
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='title'>Event Title</Label>
                      <Input
                        id='title'
                        placeholder='Enter event title'
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='description'>Event Description</Label>
                      <Textarea
                        id='description'
                        placeholder='Describe your event'
                        rows={5}
                        required
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='category'>Category</Label>
                        <Select required>
                          <SelectTrigger id='category'>
                            <SelectValue placeholder='Select category' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='technology'>
                              Technology
                            </SelectItem>
                            <SelectItem value='music'>Music</SelectItem>
                            <SelectItem value='food'>Food</SelectItem>
                            <SelectItem value='arts'>Arts</SelectItem>
                            <SelectItem value='business'>Business</SelectItem>
                            <SelectItem value='wellness'>Wellness</SelectItem>
                            <SelectItem value='sports'>Sports</SelectItem>
                            <SelectItem value='education'>Education</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='location'>Location</Label>
                        <Input
                          id='location'
                          placeholder='Event location'
                          required
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='date'>Date</Label>
                        <Input id='date' type='date' required />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='time'>Time</Label>
                        <Input id='time' type='time' required />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='price'>Ticket Price ($)</Label>
                        <Input
                          id='price'
                          type='number'
                          min='0'
                          step='0.01'
                          required
                        />
                        <p className='text-xs text-muted-foreground'>
                          Our AI will optimize pricing based on demand
                        </p>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='tickets'>Total Tickets Available</Label>
                        <Input id='tickets' type='number' min='1' required />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='image'>Event Image</Label>
                      <div className='border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center'>
                        <Upload className='h-8 w-8 text-muted-foreground mb-2' />
                        <p className='text-sm text-muted-foreground mb-1'>
                          Drag and drop an image, or click to browse
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          Recommended size: 1200 x 600 pixels
                        </p>
                        <Input
                          id='image'
                          type='file'
                          accept='image/*'
                          className='hidden'
                        />
                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          className='mt-4'
                          onClick={() =>
                            document.getElementById("image")?.click()
                          }
                        >
                          Select Image
                        </Button>
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='features'>Event Features</Label>
                      <Textarea
                        id='features'
                        placeholder='List the features of your event (one per line)'
                        rows={3}
                      />
                      <p className='text-xs text-muted-foreground'>
                        Our AI will help categorize and tag your event based on
                        these features
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className='flex justify-between'>
                    <Button
                      variant='outline'
                      type='button'
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <Button type='submit' disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          Creating...
                        </>
                      ) : (
                        "Create Event"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            {/* AI Assistant Tabs */}
            <TabsContent value='ai-assist'>
              <div className='space-y-8'>
                <EventDescriptionGenerator />

                <Card>
                  <CardHeader>
                    <CardTitle>AI-Assisted Event Creation</CardTitle>
                    <CardDescription>
                      Let our AI help you create a compelling event listing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground mb-4'>
                      Use the description generator above to create your event
                      description, then complete the rest of the form below.
                    </p>

                    {/* Simplified form with the same fields as the manual tab */}
                    {/* ... */}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
