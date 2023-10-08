const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const knex = require("knex");
const knexService = require("feathers-knex");
const memoryService = require("feathers-memory");

//Cors
const cors = require("cors");

//DB
const dbConfig = require("./knexfile.js");
const database = knex(dbConfig.development);

// Create a feathers instance.
const app = express(feathers());

//Enable cors
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// app.use("arrays", memoryService());

// Enable HTTP transport
app.configure(express.rest());

// HTTP compression
const compression = require("compression");
app.use(compression());

// JSON body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define the "Arrays" Knex service
const arraysService = knexService({
  Model: database,
  name: "Arrays",
});

//register the service as a route in feather
app.use("/api/arrays", arraysService);

//multer
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([
  { name: "image", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]);

// Feathers/Knex REST services
app.get("/", (request, response) => {
  response.send("Bienvenue sur le serveur !!");
});

app.post("/api/formdata", upload, async (request, response) => {
  try {
    const formData = request.body;
    const temporaryFiles = request.files;
    // Convert Bytea data to base64
    const formFiles = {};

    if (temporaryFiles.image !== undefined && temporaryFiles.image !== null) {
      formFiles.image641 = btoa(
        new Uint8Array(temporaryFiles.image[0].buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    } else {
      formFiles.image641 = null;
    }

    if (temporaryFiles.image2 !== undefined && temporaryFiles.image2 !== null) {
      formFiles.image642 = btoa(
        new Uint8Array(temporaryFiles.image2[0].buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    } else {
      formFiles.image642 = null;
    }

    if (temporaryFiles.image3 !== undefined && temporaryFiles.image3 !== null) {
      formFiles.image643 = btoa(
        new Uint8Array(temporaryFiles.image3[0].buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    } else {
      formFiles.image643 = null;
    }

    if (temporaryFiles.image4 !== undefined && temporaryFiles.image4 !== null) {
      formFiles.image644 = btoa(
        new Uint8Array(temporaryFiles.image4[0].buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    } else {
      formFiles.image644 = null;
    }

    // Final array data
    const arrayData = {
      name: formData.name,
      order: formData.order,
      description: formData.description,
      dimension: formData.dimension,
      image: formFiles.image641,
      image2: formFiles.image642,
      image3: formFiles.image643,
      image4: formFiles.image644,
      type: formData.type,
      type2: formData.type2,
      serial: formData.serial,
      year: formData.year,
      price: formData.price,
    };

    const createdArray = await arraysService.create(arrayData);

    response.status(201).json(createdArray);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Erreur lors du traitement des données" });
  }
});
app.post("/api/modif", upload, async (request, response) => {
  try {
    const formData = request.body;

    // Final array data
    const arrayData = {
      id: formData.id,
      name: formData.name,
      order: formData.order,
      description: formData.description,
      dimension: formData.dimension,
      type: formData.type,
      type2: formData.type2,
      serial: formData.serial,
      year: formData.year,
      price: formData.price,
    };

    const createdArray = await arraysService.patch(arrayData.id, arrayData);

    response.status(201).json(createdArray);
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Erreur lors du traitement des données" });
  }
}); // Start the server on port 3030
app.listen(3030, () => console.log("listening on port 3030"));
