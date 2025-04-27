'use client';
import Image from 'next/image';

export default function QastPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans px-6 sm:px-20 py-12 flex flex-col gap-32 transition-colors duration-300">

      {/* Hero Section */}
      <header className="flex justify-between items-center px-6 sm:px-20 py-4 ">
        <div className="flex items-center gap-2">
          <Image
            src="/qast-logo.png"
            alt="QAST Logo"
            width={80}
            height={80}
            priority
          />
        </div>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-gray-600">
          <a href="#home" className="hover:text-gray-900 transition">Home</a>
          <a href="#about" className="hover:text-gray-900 transition">About</a>
          <a href="#services" className="hover:text-gray-900 transition">Services</a>
          <a href="#contact" className="hover:text-gray-900 transition">Contact</a>
        </nav>
      </header>

      <main className="flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight text-gray-900">
          QAST: Qualified And Skilled Team
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
          Empowering digital transformation through a collective of experts in ICT, cloud systems, and AI innovation.
        </p>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <a
            href="#"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-semibold hover:from-purple-500 hover:to-blue-500 transition"
          >
            Get Started
          </a>
          <a
            href="#"
            className="border border-gray-400 text-gray-800 px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>
      </main>

      {/* About Section */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">About QAST</h2>
        <p className="text-gray-600 text-lg">
          <strong>QAST</strong> — a leader in the ICT industry in Sudan, is a subsidiary of the esteemed Kuwaiti Sudanese Holding Company (KSHC) and operates as a sister company to Zain Sudan. Our primary focus is to navigate the dynamic nature of ICT infrastructure and deliver exceptional services to our valued clients. With a commitment to service delivery, innovative solutions, software development, and customized services for open-source digitalization platforms, QAST is at the forefront of technological advancements.
        </p>
      </section>

      {/* Services Section */}
      <section className="text-center">
  <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">Business Domains</h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
    {[
      { title: 'Information Technology', desc: 'QAST provides advanced technology solutions to boost businesses’ success, with a dedicated team of experts dedicated to providing exceptional services that meet your unique needs.' },
      { title: 'Telecom', desc: 'As a leading provider of telecom solutions with a focus on reliability and innovation, QAST offers a wide array of services that optimize your communication infrastructure and enhance connectivity.' },
      { title: 'Cloud & Hosting', desc: 'QAST cloud services provide reliable, secure, scalable infrastructure, robust hosting solutions, and efficient resource allocation, allowing focus on core business while handling technical aspects.' },
    ].map((service, idx) => {
      // Define an array of gradient colors
      const gradients = [
        'from-purple-400 to-blue-500',
        'from-blue-500 to-purple-400',
        'from-purple-400 to-blue-500',
      ];

      return (
        <div
          key={idx}
          className={`bg-gradient-to-r ${gradients[idx % gradients.length]} rounded-xl p-6 shadow-lg hover:shadow-xl transition text-white`}
        >
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-sm">{service.desc}</p>
        </div>
      );
    })}
  </div>
</section>

      {/* Partners Section */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">Strategic Partners</h2>
        <p className="text-gray-600 mb-8">
        QAST believes in the power of collaboration. We have established strategic partnerships with industry-leading technology providers, enabling us to deliver world-class solutions to our clients. By combining our expertise with that of our partners, we ensure that our clients benefit from the latest advancements and best-in-class technologies.
        </p>
        <div className="bg-gray-100 rounded-xl py-8 px-6">
          <span className="text-gray-500">[Partner Logos]</span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Ready to Partner with QAST?</h2>
        <p className="text-gray-600 mb-6">Get in touch and explore how we can build the future together.</p>
        <a
          href="#"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-sm font-semibold hover:from-purple-500 hover:to-blue-500 transition"
        >
          Contact Us
        </a>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm pt-16 border-t border-gray-300 mt-12">
        <p>© 2025 QAST. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-gray-900 transition">Privacy</a>
          <a href="#" className="hover:text-gray-900 transition">Terms</a>
          <a href="#" className="hover:text-gray-900 transition">Contact</a>
        </div>
      </footer>
    </div>
  );
}