import * as cheerio from "cheerio";

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
        const pagina = await fetch(`${f.url.replaceAll("PRODUTO",nome)}`)
        const html = await pagina.text();

        const $ = cheerio.load(html);

        const precos = $(f.seletor_preco)
        const nomes = $(f.seletor_nome_produto)
        const links = $(f.seletor_link)

        const max = Math.min(precos.length, nomes.length, links.length);
        const total = Math.min(max, limite);
        
        for (let i = 0; i < total; i++) {

          let nome_atual = nomes.eq(i).text()
          let preco_atual = precos.eq(i).text()
          let link_atual = links.eq(i).attr('href')

          if (link_atual && !link_atual.startsWith('http')) {
            link_atual = f.url_puro + link_atual;
          }
          
          resultado.push({
            link: link_atual,
            farmacia: f.nm_farmacia,
            nome: nome_atual,
            preco: parseFloat(preco_atual.replace(/[^\d,]/g, '').replace(',', '.')),
            ultima_atualizacao: new Date()
          });  
        }
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
