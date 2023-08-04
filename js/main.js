async function fetchProjetos() {

    try {

        let projetos = await fetch('https://raw.githubusercontent.com/Moreno1337/ewcfolder/main/projetos.json');
        let projetosConvertidos = await projetos.json();

        return projetosConvertidos;

    } catch {
        console.log('Não foi possível resgatar os projetos.');
    }
}

const divProjetos = document.querySelector('.div__projetos');

async function displayProjetos() {
    const lista = await fetchProjetos();

    lista.projetos.forEach(projeto => criaProjeto(projeto.titulo, projeto.imagem, projeto.descricao, projeto.fotos, projeto.videos));
}

function criaProjeto(titulo, img, descricao, fotos, videos) {
    let template = `
        <div class="mascara"></div>
        <h3 class="template__titulo">${titulo}</h3>
        <button class="template__botao">Veja Mais</button>
    `;

    const div = document.createElement('div');
    div.classList.add('projetos__template');
    div.style.backgroundImage = `url(${img})`;
    div.style.backgroundSize = 'cover';
    div.style.backgroundPosition = 'center';
    div.innerHTML = template;

    divProjetos.appendChild(div);

    div.children[2].addEventListener('click', () => {
        mostraDescricao(div, titulo, descricao, fotos, videos);
    });
}

function mostraDescricao(div, titulo, descricao, fotos, videos) {
    let template = `
        <div class="mascara"></div>
        <h3 class="template__titulo">${titulo}</h3>
        <div class="template__descricao"></div>
        <button class="template__botao">Voltar</button>
    `;

    div.innerHTML = template;

    if(descricao.length > 0) {
        descricao.forEach(desc => {
            let p = document.createElement('p');
            p.innerHTML = desc;
            div.children[2].appendChild(p);
        });
    }

    if(fotos.length > 0) {
        fotos.forEach(foto => {
            let img = document.createElement('img');
            img.setAttribute('src', foto);
            div.children[2].appendChild(img);
        })
    }

    if(videos.length > 0) {
        videos.forEach(video => {
            let iframe = document.createElement('iframe');
            iframe.setAttribute('title', 'YouTube video player');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('src', `${video}`);

            div.children[2].appendChild(iframe);
        })
    }

    div.children[3].addEventListener('click', () => {
        voltaExibicaoInicial(div, titulo, descricao, fotos, videos);
    })

}

function voltaExibicaoInicial(div, titulo, descricao, fotos, videos) {
    let template = `
        <div class="mascara"></div>
        <h3 class="template__titulo">${titulo}</h3>
        <button class="template__botao">Veja Mais</button>
    `;

    div.innerHTML = template;

    div.children[2].addEventListener('click', () => {
        mostraDescricao(div, titulo, descricao, fotos, videos);
    });
}

displayProjetos();
