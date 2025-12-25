const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
          Build Faster. Launch Smarter.
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          A modern platform to build secure, scalable web apps effortlessly.
        </p>
        <button className="mt-6 px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
