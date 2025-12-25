const faqs = [
  { q: "Is this secure?", a: "Yes, JWT + HTTP-only cookies." },
  { q: "Is it responsive?", a: "Works on all screen sizes." },
  { q: "Can I customize?", a: "Fully customizable components." },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 px-4 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center dark:text-white">
          FAQ
        </h2>

        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="p-4 border rounded dark:border-gray-700">
              <h3 className="font-semibold dark:text-white">{f.q}</h3>
              <p className="text-gray-600 dark:text-gray-400">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
