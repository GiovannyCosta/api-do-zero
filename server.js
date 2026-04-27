import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

/**
 * Middleware para converter o corpo das requisições em JSON.
 * Sem esta linha, o 'req.body' retornará 'undefined'.
 */
app.use(express.json());

// Banco de dados em memória (Array) para armazenar os usuários temporariamente
const users = [];

/**
 * ROTA POST /user
 * Finalidade: Criar um novo usuário.
 */
app.post("/user", async (req, res) => {
  // Exibe no terminal os dados enviados pelo Thunder Client/Postman
  console.log(req.body);

  // Adiciona os dados recebidos no array 'users'
  users.push(req.body);

  // USANDO PRISMA E MONGODB
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  /**
   * res.status(201): Define o código HTTP "Created" (Sucesso na criação).
   * .json(): Envia os dados de volta para o cliente no formato JSON.
   */
  res.status(201).json(req.body);
});

/**
 * ROTA GET /user
 * Finalidade: Listar todos os usuários cadastrados no array.
 */
app.get("/user", (req, res) => {
  // res.status(200): Código HTTP "OK" (Padrão para buscas bem-sucedidas)
  res.status(200).json(users);
});

/**
 * Inicialização do Servidor
 */
app.listen(3000, () => {
  // Exibe no terminal o endereço do servidor
  console.log("Server running on: http://localhost:3000");
});
