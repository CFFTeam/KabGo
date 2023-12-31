import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

interface JWT {
    secret: string;
    createToken(payload: any, options?:jwt.SignOptions): string;
    verifyToken(token: string): any;
}

class JsonWebToken implements JWT {
    static createToken(arg0: { id: string; }) {
        throw new Error('Method not implemented.');
    }
    secret: string;

    constructor(secret?: string) {
        this.secret = secret ?? process.env.JWT_SECRET as string ?? 'KabGo-Auth-Server-Secret-152421';
    }

    createToken(payload: any, options?: SignOptions): string {
        return jwt.sign(payload, this.secret, options);
    }

    verifyToken(token: string): any {
        return jwt.verify(token, this.secret);
    }
}

export default JsonWebToken;