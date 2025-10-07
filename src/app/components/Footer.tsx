import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 pt-16 pb-8  w-full min-h-[400px]
">
      <div className="max-w-7xl mx-auto px-6 sm:px-20 grid grid-cols-1 sm:grid-cols-3 gap-12 items-start">
        {/* Company Info */}
        <div>
          <div className="text-2xl font-bold text-[#B49C5B] mb-4">KSHC</div>
          <p className="text-gray-400 mb-4">
            Kuwaiti Sudanese Holding Company is a leading investment group advancing Sudan’s economic growth through innovation and strategic partnerships.
          </p>
          <div className="flex gap-4 mt-4">
        <a href="#" className="hover:text-[#B49C5B]" aria-label="Twitter">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56c-.883.392-1.832.656-2.828.775a4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.72 0-4.924 2.205-4.924 4.924 0 .386.044.763.127 1.124C7.728 8.82 4.1 6.884 1.671 3.965c-.423.724-.666 1.562-.666 2.457 0 1.695.863 3.19 2.175 4.068-.802-.025-1.557-.246-2.217-.616v.062c0 2.367 1.684 4.342 3.918 4.788-.41.112-.843.172-1.288.172-.316 0-.623-.03-.922-.086.624 1.951 2.432 3.372 4.576 3.412A9.868 9.868 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.56z"/></svg>
        </a>
        <a href="#" className="hover:text-[#B49C5B]" aria-label="LinkedIn">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.74z"/></svg>
        </a>
        </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#B49C5B] mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-[#B49C5B] transition">About Us</a></li>
            <li><a href="/subsidiaries" className="hover:text-[#B49C5B] transition">Subsidiaries</a></li>
            <li><a href="/news" className="hover:text-[#B49C5B] transition">News & Media</a></li>
            <li>                  <Link href="/careers/" className="text-white"
                        aria-label="Careers"
                  >
                    Careers
                  </Link></li>
            <li><a href="/contact" className="hover:text-[#B49C5B] transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-[#B49C5B] mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <span className="block text-gray-300">Email:</span>
              <a href="mailto:info@kshc.com" className="hover:text-[#B49C5B] transition">info@kshc.com</a>
            </li>
            <li>
              <span className="block text-gray-300">Phone:</span>
              <a href="tel:+249123456789" className="hover:text-[#B49C5B] transition">+249 900 922 906 | +249 900 922 905</a>
            </li>
            <li>
              <span className="block text-gray-300">Address:</span>
              <span> Al Amarat Street 1, Khartoum, Sudan</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; 2025 Kuwaiti Sudanese Holding Company (KSHC). All rights reserved.
      </div>
    </footer>
  );
}
