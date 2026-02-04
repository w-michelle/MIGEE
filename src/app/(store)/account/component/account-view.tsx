"use client";

interface CustomerProps {
  email: string;
  firstName: string;
  lastName: string;
}

const AccountView = ({ customer }: { customer: CustomerProps }) => {
  return (
    <div className="w-full flex gap-6 px-6 py-8 text-sm">
      <div className="flex-1">
        <h1 className="text-sm font-bold">ABOUT YOU</h1>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <dt className="font-bold">First Name</dt>
            <dd>{customer.firstName}</dd>
          </div>
          <div>
            <dt className="font-bold">Last Name</dt>
            <dd>{customer.lastName}</dd>
          </div>
          <div>
            <dt className="font-bold">Email</dt>
            <dd>{customer.email}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default AccountView;
