import { getProducts } from '@/actions/dataFetcher';
import Products from '@/components/global/Products';
import { redirect } from 'next/navigation';

export const revalidate = 30;

const page_size = 30;

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let initialProducts = null;

  try {
    initialProducts = await getProducts(
      1,
      page_size,
      searchParams.search as string
    );
  } catch (error: any) {
    console.log(error);
  }

  return (
    <div className='mx-auto'>
      <div className='px-5 md:px-10 '>
        <Products initialProducts={initialProducts} />
      </div>
    </div>
  );
}
