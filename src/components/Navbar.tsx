import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import logo from '@/assets/logo.jpg';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/catalogo', label: 'Catálogo' },
    { path: '/sobre-nosotros', label: 'Sobre Nosotros' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={logo} 
              alt="Automotriz San Felipe Logo" 
              className="h-16 w-16 object-contain group-hover:scale-110 transition-transform"
            />
            <div>
              <h1 className="text-xl font-bold">Automotriz San Felipe</h1>
              <p className="text-xs text-primary-foreground/80">Vehículos Seminuevos de Calidad</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isActive(path) 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-primary-foreground/10'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary text-primary-foreground border-primary-foreground/20">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      isActive(path) 
                        ? 'bg-accent text-accent-foreground' 
                        : 'hover:bg-primary-foreground/10'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;