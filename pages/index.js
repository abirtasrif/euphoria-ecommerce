import Slider from "@/components/Slider";
import ProductsPage from "./products";
import { getAllProducts } from "@/prisma/products";
import Countdown from "@/components/Countdown";
import MenProductsPage from "./products/men";
import WomenProductsPage from "./products/women";

const HomePage = ({ products }) => {
  const endDate = new Date().getTime() + 48 * 60 * 60 * 1000;

  const menProducts = products.filter((product) => product.category === "Men");
  const womenProducts = products.filter(
    (product) => product.category === "Women"
  );

  return (
    <div>
      <Slider />
      <ProductsPage products={products} />
      <Countdown endDate={endDate} />
      <MenProductsPage products={menProducts} />
      <WomenProductsPage products={womenProducts} />
    </div>
  );
};

export default HomePage;

export const getServerSideProps = async () => {
  const products = await getAllProducts();

  const updatedProducts = products.map((product) => ({
    ...product,
    updatedAt: product.updatedAt.toString(),
    createdAt: product.createdAt.toString(),
  }));

  return {
    props: {
      products: updatedProducts,
    },
  };
};
