"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BriefcaseBusiness,
  Delete,
  House,
  Mail,
  Phone,
  SquarePen,
  Upload,
  User,
} from "lucide-react";
import Image from "next/image";
import { UserType } from "@/utils/userType";
import { Input } from "@/components/ui/input";

const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(1, "Contact is required"),
  profession: z.string(),
  about: z.string(),
  address: z.string(),
  image: z.instanceof(File).optional(),
});

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

const Profile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [toggle, setToggle] = useState(true);

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    // Simulate loading the user data
    const fetchUserData = async () => {
      // Replace this with actual API request
      const fetchedUserData: UserType = {
        _id: "123456789", // Added _id property
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "123-456-7890",
        profession: "Software Engineer",
        about: "I am a passionate software engineer.",
        address: "123 Main Street, City",
        image: "/images/profile.jpg",
      };
      setUser(fetchedUserData);
      setImagePreview(fetchedUserData.image);

      // Set form default values after fetching user data
      form.reset({
        name: fetchedUserData.name,
        email: fetchedUserData.email,
        contact: fetchedUserData.contact,
        profession: fetchedUserData.profession,
        about: fetchedUserData.about,
        address: fetchedUserData.address,
      });
    };

    fetchUserData();
  }, [form]);

  // Add null checks for user in the render section
  if (!user) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data: UpdateProfileFormValues) => {
    setIsSubmitting(true);
    console.log(data);

    // After form submission, you can update the user data as needed
    setIsSubmitting(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className='w-full p-6 flex flex-col lg:flex-row gap-6'>
      <Card className='w-full lg:w-1/3 border-none shadow-none'>
        <CardContent className='p-0 '>
          <div className='relative'>
            <Image
              src='/image/cybersecurity.jpg'
              alt='banner image'
              width={500}
              height={160}
              objectFit='cover'
              className='h-40 rounded-t object-cover'
            />
            <Image
              src={imagePreview || user.image}
              alt={user.name}
              width={144}
              height={144}
              className='w-36 h-36 rounded-full absolute -bottom-10 border-2 border-[var(--color-primary)] left-2 right-0 object-cover'
            />
          </div>
          <div className='mt-12 px-4 pb-4 space-y-1'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-accent'>
              {user.name}
            </h2>
            <div className='text-lg font-semibold flex gap-2 items-center'>
              <Mail />
              {user.email}
            </div>
            <div className='text-lg font-semibold flex gap-2 items-center'>
              <Phone />
              {user.contact}
            </div>
            <div className='text-lg font-semibold flex gap-2 items-center'>
              <House />
              {user.address}
            </div>
            <div className='text-lg font-semibold flex gap-2 items-center'>
              <BriefcaseBusiness />
              <p className='break-words w-full '>{user.profession}</p>
            </div>
            <hr />
            <div className='text-base'>{user.about}</div>
          </div>
        </CardContent>
      </Card>
      <div className='border-none shadow-md bg-secondary w-full lg:w-2/3 rounded-md '>
        <div className='flex gap-6 justify-between items-center p-4 border-b-2 border-dashed border-gray-400'>
          <h1 className='text-xl font-semibold'>My Profile</h1>
          <div onClick={() => setToggle(!toggle)}>
            {toggle ? <SquarePen /> : <Delete />}
          </div>
        </div>
        {toggle ? (
          <div className='grid grid-cols-2 gap-4 p-4 text-base sm:text-lg'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <User />
                Full Name
              </div>
              <div className='bg-background rounded-md py-1 px-3 break-words'>
                {user.name}
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Mail />
                Email
              </div>
              <div className='bg-background rounded-md py-1 px-3 break-words'>
                {user.email}
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Phone />
                Contact
              </div>
              <div className='bg-background rounded-md py-1 px-3 break-words'>
                {user.contact}
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <House />
                Address
              </div>
              <div className='bg-background rounded-md py-1 px-3 break-words'>
                {user.address}
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <BriefcaseBusiness />
                Profession
              </div>
              <div className='bg-background rounded-md py-1 px-3 break-words'>
                {user.profession}
              </div>
            </div>
          </div>
        ) : (
          <div className='p-4 text-base sm:text-lg'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <input
                            type='text'
                            {...field}
                            className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <input
                            disabled
                            type='email'
                            {...field}
                            className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='contact'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact</FormLabel>
                        <FormControl>
                          <input
                            type='text'
                            {...field}
                            className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <input
                            type='text'
                            {...field}
                            className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='profession'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession</FormLabel>
                        <FormControl>
                          <input
                            type='text'
                            {...field}
                            className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='about'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className='block w-full border border-gray-300 text-black rounded-md py-1 pl-3 shadow-sm'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                              width={144}
                              height={144}
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
                <div className='w-full'>
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full mt-4'
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
