const getPrice = (value) => {
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  return Number(
    addDecimals(value.reduce((acc, item) => acc + item.price * item.qty, 0))
  ).toFixed(2);
};

const groupBy = (req, list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  const subOrders = [...map].map(([key, value]) => ({
    user: req.user._id,
    farmer: key,
    orderItems: value,
    totalPrice: Number(getPrice(value)),
    shippingAddress: req.body.shippingAddress,
  }));

  return subOrders;
};

const orderToSubOrders = (req, res, next) => {
  if (req.body.orderItems && req.body.orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const subOrders = groupBy(
      req,
      req.body.orderItems,
      (orderItem) => orderItem.farmerId
    );
    req.subOrders = subOrders;
    next();
  }
};

export { orderToSubOrders };
