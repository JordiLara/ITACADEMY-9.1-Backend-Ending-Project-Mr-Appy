// app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; //para poder hacer puts, y tal desde el cliente al servidor
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import { testConnection } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configura el middleware CORS para que peuda recibir solicitudes de POST, PUT, DELETE, UPDATE, etc.
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://localhost:4200",
      "http://localhost:5174",
      process.env.CLIENT_URL,
    ],
  })
);

//header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// Middleware para analizar el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes con datos de formulario
app.use(express.urlencoded({ extended: true })); // Para analizar datos de formularios en el cuerpo de la solicitud

await testConnection();

// Configurar rutas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/team", teamRoutes);
app.use("/review", reviewRoutes);
app.use("/calendar", calendarRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/api", statsRoutes);
app.use("/test", testRoutes);

// Iniciar el servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor iniciado en el puerto " + process.env.PORT);
});
