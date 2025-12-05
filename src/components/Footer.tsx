import { Phone, MapPin, Instagram, Facebook, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Automotriz San Felipe</h3>
            <p className="text-primary-foreground/80 mb-4">
              Vehículos seminuevos de la mejor calidad desde el año 2000.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/automotriz_sanfelipe/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground p-2 rounded-lg hover:scale-110 transition-transform"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/people/Automotriz-San-Felipe/100063555460968/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground p-2 rounded-lg hover:scale-110 transition-transform"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
  <h3 className="text-xl font-bold mb-4">Contacto</h3>
  <div className="space-y-3">
    <a href="tel:6141390069" className="flex items-center gap-2 hover:text-accent transition-colors">
      <Phone className="h-5 w-5" />
      <span>614-139-00-69</span>
    </a>

    <a href="tel:6144144474" className="flex items-center gap-2 hover:text-accent transition-colors">
      <Phone className="h-5 w-5" />
      <span>614-414-44-74</span>
    </a>

    {/* WhatsApp */}
    <a
      href="https://wa.me/5216144637800"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-accent transition-colors"
    >
      <MessageCircle className="h-5 w-5" />
      <span>614-463-78-00 (WhatsApp)</span>
    </a>

    <div className="flex items-start gap-2">
      <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
      <span>Av División del Nte 107, San Felipe I Etapa, 31203 Chihuahua, Chih.</span>
    </div>
  </div>
</div>

          <div>
            <h3 className="text-xl font-bold mb-4">Horario</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Lunes - Viernes: 9 a.m. - 7 p.m.</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Sábado: 9 a.m. - 4 p.m.</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>Domingo: Cerrado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Automotriz San Felipe. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
