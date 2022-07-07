const { normalize, denormalize, schema } = require("normalizr");

const message = {
    author: {
        email: 'mail del usuario' ,
        nombre: 'nombre del usuario' ,
        apellido: 'apellido del usuario' ,
        edad: 'edad del usuario' ,
        alias: 'alias del usuario' ,
        avatar: 'url avatar (foto, logo) del usuario'
    },
    text: 'mensaje del usuario'
}
   

const authorSchema = new schema.Entity('authors')

const textSchema = new schema.Entity('texts')

const postSchema = new schema.Entity('posts', {
  author: authorSchema,
  texts: textSchema,
});



const util = require('util')

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}



const normalizedMessage = normalize(message, postSchema);
print(normalizedMessage)
console.log(JSON.stringify(normalizedMessage).length)

const denormalizedMessage = denormalize(normalizedMessage.result, postSchema, normalizedMessage.entities);
print(denormalizedMessage)
console.log(JSON.stringify(denormalizedMessage).length)