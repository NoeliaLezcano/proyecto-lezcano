import { databaseMySql, databaseSqlite3 } from "../db.js";

const productsList = [
  {
    title: "Escuadra",
    description: "La escuadra mas recta y sencilla",
    code: "ESC-001",
    stock: 10,
    price: 100,
    thumbnail: "/images/1.webp",
  },
  {
    title: "Calculadora",
    description: "La calculadora mas sencilla y practica",
    code: "CAL-001",
    stock: 10,
    price: 200,
    thumbnail: "/images/2.webp",
  },
  {
    title: "Globo Terráqueo",
    description: "Viaja por el mundo con este globo",
    code: "GLO-001",
    stock: 5,
    price: 500,
    thumbnail: "/images/3.webp",
  },
];

databaseMySql.schema.hasTable("products").then((exists) => {
  if (!exists) {
    databaseMySql.schema
      .createTable("products", (table) => {
        table.increments();
        table.string("title").notNullable().defaultTo("SIN TITULO");
        table.string("description").notNullable().defaultTo("SIN DESCRIPCION");
        table.string("code").notNullable().defaultTo("AAA123");
        table.integer("stock").notNullable().defaultTo(0);
        table.float("price").notNullable().defaultTo(0);
        table.string("thumbnail");
        table.timestamps(true, true);
      })
      .then(() => {
        console.log("Tabla products creada");
        productsList.forEach((product) => {
          databaseMySql("products")
            .insert(product)
            .then((res) => {
              console.log("Producto ID: " + res + " insertado");
            });
        });
      });
  } else {
    databaseMySql.schema.dropTable("products").then(() => {
      console.log("Tabla products eliminada");
    });
  }
});

databaseSqlite3.schema.hasTable("messages").then((exists) => {
  if (!exists) {
    databaseSqlite3.schema
      .createTable("messages", (table) => {
        table.increments();
        table.string("user").notNullable().defaultTo("DESCONOCIDO");
        table.string("message").notNullable().defaultTo("SIN MENSAJE");
        table.timestamps(true, true);
      })
      .then(() => {
        console.log("Tabla messages creada");
      });
  } else {
    databaseSqlite3.schema.dropTable("messages").then(() => {
      console.log("Tabla messages eliminada");
    });
  }
});
