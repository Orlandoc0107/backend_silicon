const z = require('zod');

const schemaRegister = z.object({
    email: z.string({message:'Debe ser tipo String'}).email({ message: 'Email inválido' }),
    password: z.string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
        .max(30, { message: 'La contraseña debe tener menos de 30 caracteres' }),
});

const schemaLogin = z.object({
    email: z.string({message:'Debe ser tipo String'}).email({ message: 'Email inválido' }),
    password: z.string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
        .max(30, { message: 'La contraseña debe tener menos de 30 caracteres' }),
});

module.exports = { schemaRegister, schemaLogin };
