import amqplib, { Channel, Connection } from 'amqplib';
import { clearGlobalAppDefaultCred } from 'firebase-admin/lib/app/credential-factory';

class RabbitMQ {
    private static rabbitmq: RabbitMQ;
    private channel: Channel | null;

    private constructor() {
        this.channel = null;
    }

    public async connect(uri: string) {
        try {
            const conn: Connection = await amqplib.connect(uri);
            this.channel = await conn.createChannel();
            console.log('Connected to the rabbit mq successfully');
        }
        catch (error) {
            console.log(error);
        }
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