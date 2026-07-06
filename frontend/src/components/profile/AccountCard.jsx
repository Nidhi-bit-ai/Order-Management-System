function AccountCard({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-6">
        Account Information
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500 text-sm">
            Name
          </p>

          <p className="font-semibold">
            {user?.name}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Email
          </p>

          <p className="font-semibold">
            {user?.email}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Role
          </p>

          <p className="font-semibold">
            Administrator
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Account Status
          </p>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
            Active
          </span>
        </div>

      </div>

    </div>
  );
}

export default AccountCard;