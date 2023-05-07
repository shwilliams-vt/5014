const html_dir = "./html/"
const css_dir = "./css/"
const header_html_file = "header.html"

async function getText(url)
{
    let r = await fetch(url);
    return await r.text();
}

function create_elem(type, inner)
{
    let elem = document.createElement(type);
    elem.innerHTML = inner;
    return elem;

}

async function scroll_in()
{
    let e = await document.getElementsByClassName("main");
    let es = Array.from(e)
    es.forEach(elem=>{
        elem.classList.add("scroll_in");
    })

}

async function load_css(url)
{
    let elem = await document.createElement("link");
    elem.href = css_dir + url + ".css";
    elem.rel = "stylesheet";
    await new Promise(r=>{
        console.log("1")
        elem.addEventListener("load", ()=>r());
        document.head.appendChild(elem);
    });
} 

async function create_header()
{
    let header = await getText(html_dir + header_html_file);
    let header_elem = create_elem("div", header);
    header_elem.style.width = "100%";
    document.body.prepend(header_elem);
}

async function load_page(page)
{
    let elem = await getText(html_dir + page + ".html");
    document.body.appendChild(create_elem("div", elem));

    scroll_in();

}

window.manager =
{
    create_header: create_header,
    load: load_page,
    load_css: load_css
}

window.addEventListener("load",
async function (){
    await load_css("main");
    window.loadedAll = true;
})