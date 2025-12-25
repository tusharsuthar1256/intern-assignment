const features = [
  "JWT Authentication",
  "MongoDB Integration",
  "Responsive UI",
  "Dark / Light Mode",
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center dark:text-white">
          Features
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {features.map((f) => (
            <div
              key={f}
              className="p-6 bg-white dark:bg-black rounded-xl shadow"
            >
              <p className="font-semibold dark:text-white">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
