import { faker } from '@faker-js/faker'
faker.locale = 'es'

function generarProducto(id) {
  return {
    id,
    nombre: faker.commerce.product(),
    precio: faker.commerce.price(),
    image: faker.image.image(),
  }
}

export { generarProducto }