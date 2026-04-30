import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

/**
 * MIDDLEWARE
 * express.json(): Essencial para o Express conseguir ler o corpo (body)
 * das requisições POST e PUT enviadas no formato JSON.
 */
app.use(express.json());

/**
 * ROTA POST /user
 * Finalidade: Criar um novo usuário no banco de dados.
 */
app.post("/user", async (req, res) => {
  // O Prisma realiza a operação assíncrona de criação no MongoDB
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  // 201 Created: Indica sucesso na criação do recurso
  res.status(201).json(req.body);
});

/**
 * ROTA GET /user
 * Finalidade: Listar todos os usuários salvos no MongoDB.
 */
app.get("/user", async (req, res) => {
  // findMany(): Método do Prisma para buscar todos os registros
  const users = await prisma.user.findMany();

  // 200 OK: Sucesso padrão para leitura
  res.status(200).json(users);
});

/**
 * ROTA PUT /user/:id
 * Finalidade: Editar dados de um usuário existente.
 * O ':id' na URL é um parâmetro que identifica qual usuário será alterado.
 */
app.put("/user/:id", async (req, res) => {
  // O Prisma usa o 'where' para encontrar o usuário pelo ID da URL
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  // Retornamos os dados atualizados
  res.status(200).json(req.body);
});

/**
 * ROTA DELETE /user/:id
 * Finalidade: Remover um usuário do banco de dados pelo ID.
 */
app.delete("/user/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Usuário deletado com sucesso!" });
});

app.listen(3000, () => {
  console.log("Server running on: http://localhost:3000");
});
