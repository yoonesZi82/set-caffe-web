const { default: showNotification } = require("./notification");

const addToCard = ({ id, img, name, price, userID, count }) => {
  if (!userID) {
    showNotification({
      type: "error",
      message: "پیغام",
      description: "برای افزودن به سبد خرید لطفا وارد شوید",
    });
    return false;
  }
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const isProduct = orders.find((item) => item.id === id);
  if (isProduct) {
    isProduct.count += 1;
    showNotification({
      type: "warning",
      message: "پیغام",
      description: "به تعداد محصول در سبد خرید شما افزوده شد",
    });
  } else {
    const product = {
      count: count ? count : 1,
      id,
      img,
      name,
      price,
    };
    orders.push(product);
    showNotification({
      type: "success",
      message: "پیغام",
      description: "محصول با موفقیت به سبد خرید اضافه شد",
    });
  }
  localStorage.setItem("orders", JSON.stringify(orders));
};

export default addToCard;
