function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">

      <div className="flex flex-col items-center">

        <div className="h-28 w-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-2xl font-bold mt-5">
          {user?.name}
        </h2>

        <p className="text-gray-500">
          {user?.email}
        </p>

        <span className="mt-4 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
          Administrator
        </span>

      </div>

    </div>
  );
}

export default ProfileCard;