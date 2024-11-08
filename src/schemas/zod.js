const {z} = require('zod');

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
    descripcion: z.string().min(15, {message:'La descripcion debe tener almenos 15 caracteres'}),
    precio: z.number().positive({message:'El precio debe ser Positivo'}),
    stock: z.number().positive({message:'El stock debe ser Positivo'})
})

const schemaProduct_Update = z.object({
    nombre: z.string().optional(),
    descripcion: z.string().optional(),
    precio: z.number().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
});

module.exports = { schemaRegister, schemaLogin, schemaProduct_Create, schemaProduct_Update };
