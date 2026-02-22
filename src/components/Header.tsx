import { useState } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Process', href: '#process' },
    { label: 'Services', href: '#services' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-950/95 backdrop-blur-lg border-b border-stone-800">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold font-display text-white uppercase tracking-tighter">
            Deck<span className="text-orange-600">Masters</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-stone-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+19078918283"
            className="flex items-center gap-2 text-stone-400 hover:text-orange-500 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-wider">(907) 891-8283</span>
          </a>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-display font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
            Get Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 hover:bg-stone-800 rounded transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-950 py-4">
          <nav className="container mx-auto px-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-stone-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-stone-800 my-2" />
            <a
              href="tel:+19078918283"
              className="flex items-center gap-2 text-orange-500 font-bold uppercase text-xs tracking-widest py-2"
            >
              <Phone className="w-4 h-4" />
              (907) 891-8283
            </a>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-display font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mt-2">
              Get Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
