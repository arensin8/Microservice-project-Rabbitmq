const amqp = require("amqplib");
const { OrderMdoel } = require("../model/orderModel");
let channel;

const connectTChannel = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    return connection.createChannel();
  } catch (error) {
    console.log("Cant connect to RabbitMQ server");
  }
};

const returnChannel = async () => {
  if (!channel) {
    channel = await connectTChannel();
  }
  return channel;
};

const pushToQueue = async (queueName, data) => {
  try {
    await channel.assertQueue();
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(error.message);
  }
};

const createQueue = async (queueName) => {
  const channel = await returnChannel();
  await channel.assertQueue(queueName);
  return channel;
};

const createOrderWithQueue = async (queueName) => {
  await createQueue(queueName);
  channel.consume(queueName, async (msg) => {
    if (msg.content) {
      const { products, userEmail } = JSON.parse(msg.content.toString());
      const totalPrice = products
        .map((p) => +p.price)
        .reduce((prev, curr) => prev + curr, 0);
      const newOrder = new OrderMdoel({ products, userEmail, totalPrice });
      await newOrder.save();
      console.log(products);
      console.log(newOrder);
      channel.ack(msg);
      pushToQueue("PRODUCT", newOrder);
    }
  });
};

module.exports = {
  connectTChannel,
  pushToQueue,
  returnChannel,
  createOrderWithQueue,
  createQueue,
};
