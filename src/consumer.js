const amqp = require("amqplib");

connect();
async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
     const input = JSON.parse(message.content.toString());
     console.log(`Received job with input ${input.number}`);
     if(input.number == 78) 
     channel.ack(message)
    });

    console.log("Waiting for messages");
  } catch (error) {
    console.log(error);
  }
}
