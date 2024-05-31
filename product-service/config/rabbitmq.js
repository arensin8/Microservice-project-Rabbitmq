const amqp = require("amqplib");
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

const createQueue = async (queueName) => {
  await returnChannel();
  await channel.assertQueue(queueName);
  return channel;
};

const pushToQueue = async (queueName, data) => {
  try {
    await returnChannel();
    await channel.assertQueue();
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  connectTChannel,
  pushToQueue,
  returnChannel,
  createQueue,
};
