import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { sequelize, criarFarmacia, criarTudo, carregarFarmacias, criarAdmin } from "./models.js";
import * as busca from "./routes/busca.js";
import * as farmacias from "./routes/farmacias.js"; 
import * as admins from "./routes/admins.js"; 

export const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

async function inicializar() {
    try {
        // Sincroniza o banco de dados antes de iniciar o servidor
        await sequelize.sync({ force: true }); // force: true apenas em desenvolvimento!
        console.log("Banco de dados sincronizado");
        
        // Cria dados iniciais
        await criarTudo();
        
        // Inicia o servidor
        app.listen(port, () => {
            console.log(`Servidor: http://localhost:${port}`);
        });
        
        // Testa a carga de farmácias
        const farmacias = await carregarFarmacias();
    } catch (erro) {
        console.error("Erro durante a inicialização:", erro);
    }
}

inicializar();

app.use("/busca", busca.router);
app.use("/farmacias", farmacias.router);
app.use("/admins", admins.router);