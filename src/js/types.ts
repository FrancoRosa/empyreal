export type ProductType = {
  id: number;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  price: number;
  image: string;
  price_hidden: boolean;
  quantity?: number;
};
