import { Link, useLocation } from "react-router-dom";
import { Home, ScanLine, Lightbulb, Bookmark, Info } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/scanner", icon: ScanLine, label: "Icon Scan" },
  { path: "/inquiry", icon: Lightbulb, label: "Insights" },
  { path: "/collection", icon: Bookmark, label: "Gallery" },
  { path: "/about", icon: Info, label: "About" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-surface safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
