import { Link, useLocation } from "react-router-dom";
import { Home, ScanLine, Bookmark, Info } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Home", focal: false },
  { path: "/about", icon: Info, label: "About", focal: false },
  { path: "/scanner", icon: ScanLine, label: "Icon Scan", focal: true },
  { path: "/collection", icon: Bookmark, label: "Gallery", focal: false },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[hsl(220,10%,8%)] border-t border-[hsl(var(--gold))]">
      <div className="flex items-center justify-around px-4 py-3">
        {navItems.map(({ path, icon: Icon, label, focal }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 uppercase tracking-widest text-[11px] ${
                focal ? "font-extrabold" : "font-medium"
              } ${
                isActive
                  ? "text-[hsl(var(--gold))]"
                  : "text-white/60 hover:text-white/90"
              }`}
              style={focal ? { textShadow: "0 0 18px rgba(201, 150, 59, 0.7), 0 0 36px rgba(201, 150, 59, 0.3)" } : undefined}
            >
              <Icon size={16} strokeWidth={isActive ? 2.5 : 1.5} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
