import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const nav = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Roadmap", "Changelog"],
    },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "Status"] },
  ];

  return (
    <footer className="mt-auto relative text-slate-300 bg-gradient-to-b from-[#0F172B] to-[#344366] px-6 py-14 md:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold tracking-wide text-white">
                YourBrand
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-md text-slate-400">
              Building reliable full‑stack experiences. Scalable. Secure.
              Developer focused.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="group p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <Facebook
                  size={20}
                  className="text-slate-300 group-hover:text-white"
                />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="group p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <Instagram
                  size={20}
                  className="text-slate-300 group-hover:text-white"
                />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                className="group p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <Youtube
                  size={20}
                  className="text-slate-300 group-hover:text-white"
                />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="group p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <Linkedin
                  size={20}
                  className="text-slate-300 group-hover:text-white"
                />
              </a>
            </div>
          </div>

          {nav.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-200 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-slate-400">
            © {year} YourBrand. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
