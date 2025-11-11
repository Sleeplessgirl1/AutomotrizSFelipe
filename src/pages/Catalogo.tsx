import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import CarDetailModal from '@/components/CarDetailModal';
import { Car as CarType, CarCategory } from '@/types/car';
import { cars } from '@/data/cars';

const Catalogo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<CarCategory | 'Todos'>('Todos');
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories: (CarCategory | 'Todos')[] = ['Todos', 'Sedan', 'Deportivo', 'Pick Up', 'SUV', ];

  useEffect(() => {
    const categoria = searchParams.get('categoria');
    if (categoria && categories.includes(categoria as any)) {
      setSelectedCategory(categoria as CarCategory);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: CarCategory | 'Todos') => {
    setSelectedCategory(category);
    if (category === 'Todos') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', category);
    }
    setSearchParams(searchParams);
  };

  const filteredCars = selectedCategory === 'Todos' 
    ? cars 
    : cars.filter(car => car.category === selectedCategory);

  const handleViewDetails = (car: CarType) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-12 bg-gradient-to-br from-primary to-[hsl(var(--brand-blue-light))] text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Nuestro Catálogo</h1>
          <p className="text-xl text-primary-foreground/90">
            Explora nuestra amplia selección de vehículos seminuevos
          </p>
        </div>
      </section>

      <section className="py-8 bg-secondary/30 sticky top-20 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground shadow-lg scale-105'
                    : 'bg-card hover:bg-primary hover:text-primary-foreground border-2 border-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-lg text-muted-foreground">
              Mostrando <span className="font-bold text-foreground">{filteredCars.length}</span> vehículos
              {selectedCategory !== 'Todos' && ` en la categoría ${selectedCategory}`}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <CarCard 
                key={car.id} 
                car={car} 
                onViewDetails={() => handleViewDetails(car)}
              />
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground">
                No se encontraron vehículos en esta categoría
              </p>
            </div>
          )}
        </div>
      </section>

      <CarDetailModal 
        car={selectedCar}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      <Footer />
    </div>
  );
};

export default Catalogo;
