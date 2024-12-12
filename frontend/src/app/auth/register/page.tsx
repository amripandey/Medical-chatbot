"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function SignUpPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("http://localhost:8000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      console.error(response);
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Register
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your age"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="medicalHistory"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Medical History
              </label>
              <textarea
                id="medicalHistory"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Describe your medical history"
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="currentMedications"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Current Medications
              </label>
              <textarea
                id="currentMedications"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="List your current medications"
              ></textarea>
            </div>

            <div className="mb-6">
              <label
                htmlFor="allergies"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Allergies
              </label>
              <textarea
                id="allergies"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="List your allergies"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
