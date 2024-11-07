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

const schemaProduct_Create = z.object({
    nombre: z.string().min(3, {message:'El nombre debe tener almenos 3 caracteres'}),
    description: z.string().min(15, {message:'La descripcion debe tener almenos 15 caracteres'}),
    precio: z.number().positive({message:'El precio debe ser Positivo'}),
    stock: z.number().positive({message:'El stock debe ser Positivo'})
})

module.exports = { schemaRegister, schemaLogin, schemaProduct_Create };
