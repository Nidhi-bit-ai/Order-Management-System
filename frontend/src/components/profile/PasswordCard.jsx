import { useState } from "react";
import { changePassword } from "../../services/authService";

function PasswordCard() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("New password and Confirm password do not match.");
      return;
    }

    if (form.newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (form.currentPassword === form.newPassword) {
      alert("New password must be different from current password.");
      return;
    }

    try {
      setLoading(true);

      const response = await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      alert(response.message || "Password updated successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-6">
        Change Password
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          className="w-full border rounded-lg p-3"
          value={form.currentPassword}
          onChange={handleChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full border rounded-lg p-3"
          value={form.newPassword}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          className="w-full border rounded-lg p-3"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </form>

    </div>
  );
}

export default PasswordCard;