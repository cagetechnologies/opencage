import { Request } from "express";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";

export class Authentication {
    static authentication(req: Request) {
        //var privateKEY = fs.readFileSync('private.pem', 'utf8');
        var token = req.get('X-Access-Token')!.substr('Bearer '.length);

        var publicKEY = fs.readFileSync('public.pem', 'utf8');
        var i = 'OpenCage';          // Issuer
        var s = 'hello@opencage.tech';        // Subject
        var a = 'https://opencage.tech'; // Audience
        console.log("token is " + token);

        var verifyOptions: jwt.VerifyOptions = {
            issuer: i,
            subject: s,
            audience: a,
            algorithms: ["RS256"]
        };
        try {
            var legit: any = jwt.verify(token, publicKEY, verifyOptions);
            console.log("\nJWT verification result: " + JSON.stringify(legit));

            return legit;
        } catch {
            return null;
        }
    }
}