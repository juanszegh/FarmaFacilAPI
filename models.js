import { Sequelize, DataTypes } from "sequelize";
import MD5 from "crypto-js/md5.js";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './farmaFacil.db',
    logging: false // Desativa logs para melhor visualização
});

export const Farmacia = sequelize.define('Farmacia', {
    cd_farmacia: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },   
    nm_farmacia: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url_puro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // seletor_img: {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    // },
    seletor_preco: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    seletor_link: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    seletor_nome_produto: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false 
});

export const Admin = sequelize.define('Admin', {
    cd_admin: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },   
    nm_login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nm_senha: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    timestamps: false 
});

export async function criarAdmin(adm) {
    try {
        return await Admin.create(adm);
    } catch(erro) {
        console.log('Erro ao criar Administrador:', erro);
        throw erro;
    }
}

export async function criarTudo() {
    await Farmacia.sync({ force: true }); // Força recriação da tabela (apenas para desenvolvimento)
    
    await criarFarmacia({
        nm_farmacia: 'Drogaria São Paulo',
        url: 'https://www.drogariasaopaulo.com.br/pesquisa?q=PRODUTO',
        url_puro: 'https://www.drogariasaopaulo.com.br/',
        seletor_preco: 'a.valor-por',
        seletor_link: '.collection-image-link',
        seletor_nome_produto: 'a.collection-link'
    });
    await criarFarmacia({
        nm_farmacia: 'Farma Conde',
        url: 'https://www.farmaconde.com.br/PRODUTO?_q=PRODUTO',
        url_puro: 'https://www.farmaconde.com.br/',
        seletor_preco: '.vtex-product-price-1-x-currencyContainer--container__selling-price',
        seletor_link: '.vtex-product-summary-2-x-clearLink.h-100.flex.flex-column',
        seletor_nome_produto: 'div > h3 > span'
    });
    await criarFarmacia({
        nm_farmacia: 'Nissei',
        url: 'https://www.farmaciasnissei.com.br/pesquisa/PRODUTO/',
        url_puro: 'https://www.farmaciasnissei.com.br/',
        seletor_preco: '.produto > div > div > div > p',
        seletor_link: '.produto > a',
        seletor_nome_produto: '[data-target=nome_produto]'
    });
    await criarAdmin({
        nm_login: "roberto123",
        nm_senha: MD5("santos1992").toString()
    })
}

export async function criarFarmacia(farmacia) {
    try {
        return await Farmacia.create(farmacia);
    } catch(erro) {
        console.log('Erro ao criar Farmácia:', erro);
        throw erro;
    }
}

export async function carregarFarmacias() {
    try {
        return await Farmacia.findAll(); // RETORNA os resultados
    } catch(erro) {
        console.log('Erro ao carregar dados:', erro);
        throw erro;
    }
}