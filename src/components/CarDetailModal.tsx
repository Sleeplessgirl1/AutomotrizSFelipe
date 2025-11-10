import { Car } from '@/types/car';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Check, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

interface CarDetailModalProps {
  car: Car | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CarDetailModal = ({ car, open, onOpenChange }: CarDetailModalProps) => {
  if (!car) return null;

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-MX')} NEGOCIABLE!`;
  };

  // Función para generar enlace de WhatsApp
  const getWhatsAppLink = (message: string) => {
    const phoneNumber = '5214144474'; // Reemplaza con tu número de WhatsApp
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  // Mensaje predeterminado para WhatsApp
  const whatsappMessage = `Hola, estoy interesado en el ${car.name} ${car.year} que vi en su sitio web. ¿Podrían darme más información?`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary">
            {car.name} {car.year}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Carousel className="w-full">
            <CarouselContent>
              {car.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative rounded-xl overflow-hidden aspect-video">
                    <img 
                      src={image} 
                      alt={`${car.name} ${car.year} - Imagen ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <div className="bg-secondary/30 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Detalles del vehículo</h3>
            
            <div className="grid gap-3 mb-6">
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="font-semibold">{car.details.condition}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="font-semibold">{car.details.keys}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="font-semibold">{car.details.kilometers}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="font-semibold">{car.details.engine}</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {car.details.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-3xl font-bold text-accent mb-6">
              {formatPrice(car.price)}
            </div>

            <div className="bg-primary text-primary-foreground rounded-lg p-6 space-y-4">
              <h4 className="text-xl font-bold mb-3">CONTACTANOS:</h4>
              
              <a href="tel:6141390069" className="flex items-center gap-3 hover:text-accent transition-colors">
                <Phone className="h-5 w-5" />
                <span className="font-semibold">614-139-00-69</span>
              </a>
              
              <a href="tel:6144144474" className="flex items-center gap-3 hover:text-accent transition-colors">
                <Phone className="h-5 w-5" />
                <span className="font-semibold">614-414-44-74</span>
              </a>

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="flex-1"
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
                  variant="secondary"
                  size="lg"
                  className="flex-1"
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

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                  asChild
                >
                  <a 
                    href={getWhatsAppLink(whatsappMessage)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailModal;