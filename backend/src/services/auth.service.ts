import jwt from "jsonwebtoken";
import * as UserService from "./user.service";
import * as argon2 from "argon2";

// fonction pour login
export async function signIn(email: string, password:string) {
    // on essaie de:
    try {
        // checker de récupérer un user avec l'email reçu
        const user = await UserService.getByEmail(email);
        
        // on vérifie que le password reçu est le même que le password en db
        if (await verifyPassword(password, user.password)) {
            // si c'est le cas, on crée un token et on le renvoie
            const token = signJwt({
                email: user.email,
                role: user.role,
            })

            return token;
        } else {
            // sinon erreur
            throw new Error();
        }
    } catch (e) {
        // si l'email n'existe pas, ou autre : erreur
        throw new Error("Invalid Auth!")
    }
}

export async function verifyPassword(password: string, hashedhpassword: string) {
    // on retourne true false en comparant les password via argon2
    return await argon2.verify(hashedhpassword, password)
}

export function signJwt(payload: any) {
    // si la clé secrète n'existe pas > erreur
    if (process.env.JWT_SECRET === undefined) {
        throw new Error();
    }

    // on crée le JWT avec un payload (objet d'info), la clé secrète et une expiration
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60,
    });
}

export function verifyToken(token: string) {
    // si la clé secrète n'existe pas > erreur
    if (process.env.JWT_SECRET === undefined) {
        throw new Error();
    }

    // si elle existe on utilise la fonction jwt pour vérifier le token et retourner le payload
    return jwt.verify(token, process.env.JWT_SECRET);
}