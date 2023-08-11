import * as jwt from 'jsonwebtoken';

interface JWT {
    secret: string;

    createToken(payload: any, options?:jwt.SignOptions): string;
    verifyToken(token: string): any;
}

class JsonWebToken implements JWT {
    secret: string;

    constructor(secret?: string) {
        this.secret = secret ?? process.env.JWT_SECRET as string ?? 'KabGo-Auth-Server-Secret-152421';
    }

    createToken(payload: any, options?: jwt.SignOptions): string {
        return jwt.sign(payload, this.secret, options);
    }

    verifyToken(token: string): any {
        return jwt.verify(token, this.secret);
    }
}

export default JsonWebToken;