export type CarCategory = 'Sedan' | 'Deportivo' | 'Pick Up' | 'SUV' ;

export interface Car {
  id: string;
  name: string;
  year: number;
  category: CarCategory;
  price: number;
  image: string;
  images: string[];
  details: {
    condition: string;
    keys: string;
    kilometers: string;
    engine: string;
    features: string[];
    additionalInfo?: string;
  };
}
