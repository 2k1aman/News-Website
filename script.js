const API_KEY = "0876ce328282abac4d7e380890916a88";
const url = "https://gnews.io/api/v4/search?q=";


window.addEventListener('load',()=>fetchNews("india"));

function reload(){
    document.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&lang=en&country=us&max=10&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles)
}

function bindData(articles) {
    const cardContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
  
    cardContainer.innerHTML = "";
    articles.forEach((article) => {
      if (!article.image) {
        return;
      }
      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone,article);
      cardContainer.appendChild(cardClone);
    });
  }

function fillDataInCard(cardClone,article){
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSrc = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSrc.innerHTML=`${article.source.name} · ${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
}
let currSelectedNav = null;
function navLinkClicked(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navItem;
    currSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return; 
    fetchNews(query);
    searchText.value = "";
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
})
