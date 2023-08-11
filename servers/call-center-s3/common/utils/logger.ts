import { createWriteStream, WriteStream } from 'fs';
import { Writable } from 'stream';

class Logger {
    private logStream: WriteStream;

    constructor(logFilePath: string) {
        this.logStream = createWriteStream(logFilePath, { flags: 'a' });
    }

    public log(message: string): void {
        this.writeToStream(message);
    }

    private writeToStream(message: string): void {
        this.logStream.write(message);
    }

    public createWritableStream(): Writable {
        return new Writable({
            write: (chunk, encoding, callback) => {
                const message = chunk.toString();
                this.writeToStream(message);
                callback();
            },
        });
    }
}

export default Logger;
