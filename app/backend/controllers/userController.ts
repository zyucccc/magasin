/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '@/prisma/prismaClient';
import { hash, compare } from 'bcryptjs';

// inscription
export async function createUser(userData: any) {
    try {
        // check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (existingUser) {
            throw new Error('email used');
        }

        // hash password
        const hashedPassword = await hash(userData.password, 10);

        // create user
        const newUser = await prisma.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                nom: userData.nom,
                prenom: userData.prenom,
                adresse: userData.adresse || null,
                code_postal: userData.code_postal || null,
                ville: userData.ville || null,
                pays: userData.pays || 'France',
                telephone: userData.telephone || null
            }
        });


        const { ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    } catch (error) {
        console.error('inscription failed:', error);
        throw error;
    }
}

// login
export async function verifyUser(email: string, password: string) {
    try {
        // find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return null;
        }

        // check password
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
            return null;
        }

        const { ...userWithoutPassword } = user;
        return userWithoutPassword;
    } catch (error) {
        console.error('user doesnt exist or mdp is not correct:', error);
        throw error;
    }
}
