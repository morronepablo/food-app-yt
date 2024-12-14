/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { DollarSign } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react";
import { CartItem } from "@/types/cartType";
import { useCartStore } from "@/store/useCartStore";

const Success = () => {
  const { orders, getOrderDetails } = useOrderStore();
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getOrderDetails();
      console.log(orders);
    }, 5000);

    // Limpieza al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-[850px] max-h-[850px]">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col max-h-screen[850px]">
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div
          className={`${
            orders.length > 2 ? "max-h-[850px]" : "min-h-[850px]"
          } px-4 py-4`}
        >
          {orders.map((order: any, orderIndex: number) => (
            <div
              key={orderIndex}
              className="flex items-center justify-center px-4 py-4"
            >
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Order Status:{" "}
                    <span className="text-[#FF5A5A]">
                      {order.status.toUpperCase()}
                    </span>
                  </h1>
                </div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Order Summary
                  </h2>
                  {/* Items for the current order */}
                  {order.cartItems.map((item: CartItem) => (
                    <div className="mb-4" key={item._id}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            alt=""
                            className="w-14 h-14 rounded-md object-cover"
                          />
                          <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">
                            {item.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-800 dark:text-gray-200 flex items-center">
                            <DollarSign />
                            <span className="text-lg font-medium">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </div>
                <Link to="/">
                  <Button className="bg-orange hover:bg-hoverOrange w-full py-3 rounded-md shadow-lg">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Success;
