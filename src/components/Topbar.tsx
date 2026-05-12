export default function Topbar() {
  return (
    <div className="w-full bg-brand-dark text-white text-xs sm:text-sm">
      <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-1 py-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a
            href="mailto:hello@trainhub.example"
            className="hover:text-sky-300 transition-colors"
          >
            hello@trainhub.example
          </a>
          <a
            href="tel:+10000000000"
            className="hover:text-sky-300 transition-colors"
          >
            +1 (000) 000-0000
          </a>
          <span className="opacity-80">Sample City, Sample Country</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="opacity-80">Follow us:</span>
          <a aria-label="Facebook" href="#" className="hover:text-sky-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>
          </a>
          <a aria-label="LinkedIn" href="#" className="hover:text-sky-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 4.97 8.5a2.5 2.5 0 0 1 .01-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.9-2.1 3.9-2.1 4.2 0 5 2.7 5 6.3V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z"/></svg>
          </a>
          <a aria-label="Twitter" href="#" className="hover:text-sky-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 4H22l-7 8 8.2 12h-6.4l-5-7.3L5.9 24H2.8l7.5-8.6L2.4 4h6.5l4.5 6.7L18.9 4z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
