import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Users, CreditCard, MapPin, Phone, Instagram, Facebook, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SobreNosotros = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12 bg-gradient-to-br from-primary to-[hsl(var(--brand-blue-light))] text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl text-primary-foreground/90">
            Conoce nuestra historia y compromiso con la calidad
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-accent text-accent-foreground p-4 rounded-xl">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold">Nuestra Misión</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ser una empresa especializada en la comercialización de autos seminuevos de la mejor calidad. 
              Nuestra misión está encaminada hacia la excelencia, es decir, hacia la total satisfacción del cliente, 
              así como los profesionales que la integran con un comportamiento respetuoso, amigable y la distinción de liderazgo.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-accent text-accent-foreground p-4 rounded-xl">
                <Users className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold">Quiénes Somos</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Con tantos vehículos seminuevos, no es de extrañar por qué Automotriz San Felipe se ha convertido en una de 
              las principales concesionarias en Chihuahua. Desde 2000, nos hemos esforzado por brindar asesoramiento de 
              calidad a nuestros clientes sobre los mejores vehículos en el mercado.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ofrecemos una amplia gama de opciones, y nuestro equipo de profesionales está aquí para satisfacer todas sus necesidades.
            </p>
          </div>
        </div>
      </section>

      {/* Financing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-accent text-accent-foreground p-4 rounded-xl">
                <CreditCard className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-bold">Excelentes Opciones de Financiamiento</h2>
            </div>
            
            <div className="bg-card border-2 border-border rounded-xl p-8 mb-8">
              <p className="text-lg mb-6 leading-relaxed">
                Automotriz San Felipe quiere que usted quede totalmente satisfecho con su vehículo. Nuestro equipo está aquí 
                para facilitar su vida con excelentes planes de financiamiento que se adaptan a sus necesidades.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-accent">Información de Financiamiento Bancario</h3>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Tasa flexible:</strong> 12.99%
                </p>
                
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">Plazos de financiamiento según modelo:</strong>
                </p>
                
                <ul className="space-y-2 pl-6">
                  <li className="text-muted-foreground">
                    <strong className="text-foreground">2016:</strong> 2 años / 24 meses (Financiera Atria)
                  </li>
                  <li className="text-muted-foreground">
                    <strong className="text-foreground">2017:</strong> 3 años / 36 meses (Financiera Atria)
                  </li>
                  <li className="text-muted-foreground">
                    <strong className="text-foreground">2018:</strong> 2 años / 24 meses (Scotiabank, Afirme, Santander)
                  </li>
                  <li className="text-muted-foreground">
                    <strong className="text-foreground">2019:</strong> 3 años / 36 meses (Banco)
                  </li>
                  <li className="text-muted-foreground">
                    <strong className="text-foreground">2020:</strong> 4 años / 48 meses (Banco)
                  </li>
                  <li className="text-muted-foreground">
                    <strong className="text-foreground">2021 en adelante:</strong> 5 años / 60 meses
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary text-primary-foreground rounded-xl p-6">
                <h4 className="text-xl font-bold mb-3">Beneficios</h4>
                <ul className="space-y-2">
                  <li>✓ Se puede abonar a capital sin penalización</li>
                  <li>✓ Vehículos con garantía de 2 años o 40,000 kms (crédito Scotiabank)</li>
                  <li>✓ Se facturan a su nombre (no pagan cambio de propietario)</li>
                </ul>
              </div>

              <div className="bg-accent text-accent-foreground rounded-xl p-6">
                <h4 className="text-xl font-bold mb-3">Crédito Directo</h4>
                <ul className="space-y-2">
                  <li>✓ Enganche del 25%</li>
                  <li>✓ Plazo máximo de 3 meses</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic">
              Nota: Financiera Atria tiene una tasa más alta por los modelos que financia. El banco es fija del 12.99%
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Visítanos</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-card rounded-xl p-6 border-2 border-border">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="h-6 w-6 text-accent" />
                  Horario de Servicio
                </h3>
                <div className="space-y-2">
                  <p className="text-lg"><strong>Lunes - Viernes:</strong> 9 a.m. - 7 p.m.</p>
                  <p className="text-lg"><strong>Sábado:</strong> 9 a.m. - 4 p.m.</p>
                  <p className="text-lg"><strong>Domingo:</strong> Cerrado</p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border-2 border-border">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Phone className="h-6 w-6 text-accent" />
                  Contacto
                </h3>
                <div className="space-y-3">
                  <a href="tel:6141390069" className="flex items-center gap-2 text-lg hover:text-accent transition-colors">
                    <Phone className="h-5 w-5" />
                    614-139-00-69
                  </a>
                  <a href="tel:6144144474" className="flex items-center gap-2 text-lg hover:text-accent transition-colors">
                    <Phone className="h-5 w-5" />
                    614-414-44-74
                  </a>
                  
                  <div className="flex gap-3 pt-2">
                    <Button 
                      size="lg"
                      className="flex-1 bg-accent hover:bg-accent/90"
                      asChild
                    >
                      <a 
                        href="https://www.instagram.com/automotriz_sanfelipe/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Instagram className="h-5 w-5" />
                        Instagram
                      </a>
                    </Button>
                    
                    <Button 
                      size="lg"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      asChild
                    >
                      <a 
                        href="https://www.facebook.com/people/Automotriz-San-Felipe/100063555460968/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Facebook className="h-5 w-5" />
                        Facebook
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-card rounded-xl p-6 border-2 border-border">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-accent" />
                Ubicación
              </h3>
              <p className="text-lg mb-4">
                Av División del Nte 107, San Felipe I Etapa, 31203 Chihuahua, Chih.
              </p>
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.6907446859795!2d-106.12086!3d28.68177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea429c89e4d4c9%3A0x6c5c5c5c5c5c5c5c!2sAv%20Divisi%C3%B3n%20del%20Nte%20107%2C%20San%20Felipe%20I%20Etapa%2C%2031203%20Chihuahua%2C%20Chih.!5e0!3m2!1sen!2smx!4v1234567890123!5m2!1sen!2smx"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Automotriz San Felipe"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SobreNosotros;
