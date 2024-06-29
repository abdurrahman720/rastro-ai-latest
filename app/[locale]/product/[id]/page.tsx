import { getProduct, getProducts, getSuggestions } from '@/actions/dataFetcher';
import ProductDetails from '@/components/global/ProductDetails';

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
