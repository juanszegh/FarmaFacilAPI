import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
let janela = null

async function iniciarNavegador(url)
{
  if (!janela)
  {
      janela = await puppeteer.launch({ 
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', 
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', 
        '--disable-gpu'
      ]
    });
  }
    
  const pagina = await janela.newPage();
  await pagina.setRequestInterception(true);
  pagina.on('request', (req) => {
    if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });
  await pagina.goto(url, {waituntil: 'networkidle2'})
  return pagina
}
function ordenar(modo, dados)
{
    if (modo === "maior_preco")
    {
        return dados.sort(compararPreco)
    }
    if (modo === "menor_preco")
    {
        return dados.sort(compararPreco).reverse()
    }
    return dados;
}
function compararPreco(a,b)
{
    if ( a.preco > b.preco )
    {
        return -1;
    }
    if ( a.preco < b.preco )
    {
        return 1;
    }
      return 0;
} 
export async function trazerDados(nome, limite, farmacias, filtro) {
  const buscas = farmacias.map(async (f) => {
    try 
    {
      let resultado = [];
        const pagina = await iniciarNavegador(`${f.url.replaceAll("PRODUTO",nome)}`)
        const html = await pagina.content();
        const $ = cheerio.load(html);

        const precos_produtos = await $(f.seletor_preco)
        const nomes_produtos = await $(f.seletor_nome_produto)
        const links_produtos = await $(f.seletor_link)

        nomes_produtos.length = precos_produtos.length
        links_produtos.length = precos_produtos.length
        
        for (let i = 0; i < limite; i++) {
          if (i > nomes_produtos.length)
          {
            break;
          }
          let nome_atual = nomes_produtos.eq(i).text()
          let preco_atual = precos_produtos.eq(i).text()
          let link_atual = links_produtos.eq(i).attr('href')

          if (link_atual && !link_atual.startsWith('http')) {
            link_atual = f.url_puro + link_atual;
          }
          
          resultado.push({
            link: link_atual,
            farmacia: f.nm_farmacia,
            nome: nome_atual,
            preco: parseFloat(preco_atual.replace('R$', '').replace(',', '.').trim()),
            ultima_atualizacao: new Date()
          });  
        }
        await pagina.close();
        return resultado
    } 
    catch (erro) 
    {
      console.error(`Erro ao buscar dados da farmácia ${f.nome_farmacia}:`, erro.message);
      return [];
    }
  })
  let resultados = ordenar(filtro, (await Promise.all(buscas)).flat()).filter(r => r.preco && r.nome);;
  resultados.length = limite
  resultados = resultados.filter(r => r)
  return resultados
}
