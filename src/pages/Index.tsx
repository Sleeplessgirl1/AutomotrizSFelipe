import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import CarDetailModal from '@/components/CarDetailModal';
import { Button } from '@/components/ui/button';
import { Car as CarType, CarCategory } from '@/types/car';
import { fetchCars } from '@/lib/fetchCars';
import { ArrowRight, Award, Shield, HandshakeIcon } from 'lucide-react';
import heroImage from '@/assets/hero-showroom.png';

const Index = () => {
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [featuredCars, setFeaturedCars] = useState<CarType[]>([]);

  useEffect(() => {
fetchCars().then(data => setFeaturedCars(data.slice(0, 6))); // updated
  }, []);

  const handleViewDetails = (car: CarType) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const categories: CarCategory[] = ['Sedan', 'Deportivo', 'Pick Up', 'SUV'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative overflow-hidden h-[600px] md:h-[700px]">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                Vehículos Seminuevos de la Mejor Calidad
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/95 drop-shadow-md">
                Encuentra el auto perfecto para ti con las mejores opciones de financiamiento en Chihuahua
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 shadow-xl" asChild>
                  <Link to="/catalogo">
                    Ver Catálogo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8 shadow-xl" asChild>
                  <Link to="/sobre-nosotros">Conócenos</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-accent text-accent-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Más de 20 Años de Experiencia</h3>
              <p className="text-muted-foreground">Desde el 2000, brindando vehículos de calidad a nuestros clientes</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-accent text-accent-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Vehículos Certificados</h3>
              <p className="text-muted-foreground">Todos nuestros autos cuentan con factura de agencia y están en excelentes condiciones</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-accent text-accent-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HandshakeIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Financiamiento Flexible</h3>
              <p className="text-muted-foreground">Excelentes opciones de crédito bancario y financiamiento directo</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Nuestras Categorías</h2>
          <div className="grid gap-4 justify-center grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/catalogo?categoria=${category}`}
                className="bg-card hover:bg-primary hover:text-primary-foreground border-2 border-border hover:border-accent rounded-xl p-6 text-center font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Vehículos Destacados</h2>
            <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold" asChild>
              <Link to="/catalogo">
                Ver Todos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} onViewDetails={() => handleViewDetails(car)} />
            ))}
          </div>
        </div>
      </section>

      <CarDetailModal car={selectedCar} open={modalOpen} onOpenChange={setModalOpen} />
      <Footer />
    </div>
  );
};

export default Index;