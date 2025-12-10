"use client";

import Loader from "@/components/Loader";

import { useState } from "react";

interface CustomerProps {
  email: string;
  firstName: string;
  lastName: string;
}

const AccountView = ({ customer }: { customer: CustomerProps }) => {
  // const [loading, setLoading] = useState(false);

  // const handleLogout = async () => {
  //   setLoading(true);
  //   try {
  //     await fetch("/logout");
  //     window.location.href=""
  //   } catch (error) {
  //     console.log("something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="h-screen bg-neutral-200">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div className="flex gap-6 p-6 mt-4">
      <div className="space-y-2 font-bold">
        <p>ABOUT YOU</p>
        <p>ORDER HISTORY</p>

        <a
          href="/api/logout"
          className="hover:cursor-pointer hover:underline"
        >
          LOGOUT
        </a>
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-bold">ABOUT YOU</h1>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <p className="font-bold">First Name</p>
            <p>{customer.firstName}</p>
          </div>
          <div>
            <p className="font-bold">Last Name</p>
            <p>{customer.lastName}</p>
          </div>
          <div>
            <p className="font-bold">Email</p>
            <p>{customer.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountView;
