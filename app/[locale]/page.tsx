import { getProducts } from '@/actions/dataFetcher';
import Products from '@/components/global/Products';
import SearchAlert from '@/components/global/SearchAlert';

export const revalidate = 30;

const page_size = 30;

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
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
    <div className='px-5 md:px-10'>
      {searchParams.search && <SearchAlert search={searchParams.search} />}
      <Products initialProducts={initialProducts} />
    </div>
  );
}
