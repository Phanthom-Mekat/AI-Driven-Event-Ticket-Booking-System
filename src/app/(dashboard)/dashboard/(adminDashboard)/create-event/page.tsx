"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/utils/eventSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";

export default function CreateEventPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const router = useRouter();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      date: "",
      time: "",
      price: "",
      tickets: "",
      features: "",
      image: undefined,
    },
  });

  useEffect(() => {
    console.log("Form State Errors:", form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = async (data: z.infer<typeof eventSchema>) => {
    console.log("Form submission triggered!");
    setIsLoading(true);
    console.log("Submitting Data:", data);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      form.setValue("image", file, { shouldValidate: true });
    }
  };

  return (
    <div className='min-h-screen py-12'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-3xl font-bold mb-8 text-center'>
            Create a New Event
          </h1>
          <Card>
            <Form {...form}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form submitted!", form.getValues());
                  form.handleSubmit(onSubmit)(e);
                }}
              >
                <CardHeader />
                <CardContent className='space-y-6'>
                  <FormField
                    name='title'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='Enter event title'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name='description'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder='Describe your event'
                            rows={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name='location'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='Enter location'
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      name='date'
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Select date'
                              type='date'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name='time'
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Select time'
                              type='time'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormField
                      name='price'
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Enter price'
                              type='text'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name='tickets'
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tickets</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Enter number of tickets'
                              type='number'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    name='image'
                    control={form.control}
                    render={() => (
                      <FormItem>
                        <FormLabel>Event Image</FormLabel>
                        <FormControl>
                          <div
                            className='border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer'
                            onClick={() =>
                              document.getElementById("image")?.click()
                            }
                          >
                            {imagePreview ? (
                              <Image
                                src={imagePreview as string}
                                width={1200}
                                height={600}
                                alt='Event Preview'
                                className='aspect-video rounded-lg'
                              />
                            ) : (
                              <Upload className='h-8 w-8 text-muted-foreground mb-2' />
                            )}
                            <Input
                              id='image'
                              type='file'
                              accept='image/*'
                              className='hidden'
                              onChange={handleImageChange}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className='flex justify-between mt-4'>
                  <Button
                    variant='outline'
                    type='button'
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type='submit' disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    ) : (
                      "Create Event"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
