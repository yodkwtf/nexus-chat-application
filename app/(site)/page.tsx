import AuthForm from './components/AuthForm';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col-reverse lg:flex-row min-h-screen">
      {/* Left Column (CTA) */}
      <div
        className="lg:w-1/2 p-10"
        style={{ background: 'linear-gradient(45deg, #00BFFF, #0099CC)' }}
      >
        <div className="flex flex-col justify-center h-full">
          <h1 className="text-4xl font-bold mb-2 text-center text-white">
            Welcome to Nexus Chat!
          </h1>
          <p className="text-lg my-6 mx-auto text-center text-white">
            Your Ultimate Chat Experience
          </p>
          <p className="text-sm opacity-90 mx-auto text-center text-white">
            Join Nexus Chat today and connect with others effortlessly.
          </p>
          <a
            href="https://github.com/yodkwtf/nexus-chat-application"
            className="mt-8 bg-gray-800  hover:bg-cyan-700 text-white py-2 px-8 rounded-full font-semibold shadow-md transition duration-300 ease-in-out w-auto max-w-lg mx-auto"
            title="GitHub Repository"
            target="_blank"
          >
            GitHub Code
          </a>
        </div>
      </div>

      {/* Right Column (Form) */}
      <div className="lg:w-1/2 bg-gray-100 p-10">
        <div className="sm:mx-auto flex flex-col justify-center h-full sm:w-full sm:max-w-md">
          <Image
            alt="logo"
            className="mx-auto w-auto"
            height={64}
            width={64}
            src="/images/logo.png"
          />

          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 tracking-tight">
            Join Nexus Chat Today!
          </h2>

          {/* Auth Form */}
          <AuthForm />
        </div>
      </div>
    </main>
  );
}
