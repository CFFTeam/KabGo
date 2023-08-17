import amqplib, { Channel, Connection } from 'amqplib';

class RabbitMQ {
    private static rabbitmq: RabbitMQ;
    private channel: Channel | null;

    private constructor() {
        this.channel = null;
    }

    public connect(uri: string) {
        amqplib
            .connect(uri)
            .then(async (conn: Connection) => this.channel = await conn.createChannel())
            .then(() => {
                console.log('Connected to the rabbit mq successfully');
            })
            .catch((error) => {
                console.log('Could not connect to the rabbit mq', error);
            });
    }

    public static getInstance(): RabbitMQ {
        return this.rabbitmq || (this.rabbitmq = new this());
    }

    public async publish(queue: string, message: string) {
        await this.channel?.assertQueue(queue);
        this.channel?.sendToQueue(queue, Buffer.from(message));
    }

    public async consume(queue: string, callback: (message: string) => void) {
        await this.channel?.assertQueue(queue);
        this.channel?.consume(queue, (message) => {
            if (message) {
                callback(message.content.toString());
                this.channel?.ack(message);
            }
        });
    }
}

export default RabbitMQ.getInstance();