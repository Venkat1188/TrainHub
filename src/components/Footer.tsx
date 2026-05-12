import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-x py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white font-bold">
              TH
            </span>
            <span className="font-semibold text-lg text-white">
              TrainHub Institute
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            A demo template for professional training institutes. Replace this
            copy with your own organization&apos;s description.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/courses" className="hover:text-white">Courses</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/consultancy" className="hover:text-white">Consultancy</Link></li>
            <li><Link href="/locations" className="hover:text-white">Locations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Training Areas</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/categories" className="hover:text-white">Information Technology</Link></li>
            <li><Link href="/categories" className="hover:text-white">Business</Link></li>
            <li><Link href="/categories" className="hover:text-white">Health</Link></li>
            <li><Link href="/categories" className="hover:text-white">Agriculture</Link></li>
            <li><Link href="/categories" className="hover:text-white">Research &amp; Data</Link></li>
            <li><Link href="/categories" className="hover:text-white">Project Management</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>123 Sample Street</li>
            <li>Sample City, Sample Country</li>
            <li><a href="tel:+10000000000" className="hover:text-white">+1 (000) 000-0000</a></li>
            <li><a href="tel:+10000000001" className="hover:text-white">+1 (000) 000-0001</a></li>
            <li><a href="mailto:hello@trainhub.example" className="hover:text-white">hello@trainhub.example</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {year} TrainHub Institute. Demo template — not a real organization.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link href="#" className="hover:text-white">Return Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
