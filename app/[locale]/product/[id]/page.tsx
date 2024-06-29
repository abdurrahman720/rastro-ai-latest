import { getProduct, getProducts, getSuggestions } from '@/actions/dataFetcher';
import Navbar from '@/components/global/Navbar';
import ProductCard from '@/components/global/ProductCard';
import ProductDetails from '@/components/global/ProductDetails';
import { SkeletonCard } from '@/components/global/SkeletonCard';
import { ChevronLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
  
};

const page_size = 60;

const page = async ({ params }: Props) => {
  const product = await getProduct(params.id);

  const suggestions = await getSuggestions(params.id, 1, page_size);

  return (
    <div>
      <ProductDetails
        product={product}
        suggestions={suggestions}
        productId={params.id}
      />
    </div>
  );
};

export default page;
