"use client";
import { useSession } from "next-auth/react";
import React from "react";

const DashboardPage = () => {
  const { data: session } = useSession();
  console.log(session?.user, "session data");
  // const userRole: string = session?.user?.role;
  const userRole: string = "admin";
  return (
    <div className='w-full p-6'>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      {userRole === "admin" ? (
        <div>Admin Dashboard</div>
      ) : userRole === "user" ? (
        <div>User Dashboard</div>
      ) : null}{" "}
    </div>
  );
};

export default DashboardPage;
