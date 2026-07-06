import { useAuth } from "../../context/AuthContext";
import ProfileCard from "../../components/profile/ProfileCard";
import AccountCard from "../../components/profile/AccountCard";
import PasswordCard from "../../components/profile/PasswordCard";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Profile
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your administrator account
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-1">
          <ProfileCard user={user} />
        </div>

        <div className="xl:col-span-2 space-y-6">
          <AccountCard user={user} />

          <PasswordCard />
        </div>

      </div>

    </div>
  );
}

export default Profile;