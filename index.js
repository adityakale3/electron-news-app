const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4e007221c77142a096f222223210a44a');
const $ = require('jquery');
const navItems = $('.nav-group-item');
let articles = null;
getNews('business');

function getNews(category){
newsapi.v2.topHeadlines({
    category: category,
    language: 'en',
    country : 'in'
  }).then((response) => {
    console.log(response.articles);
    articles = response.articles;
    showNews(response.articles);
    }).catch((err) => {
      console.log(err);
  });
}

  let singleNews = "";
  function showNews(allNews){
    $('#news-list').html("");
    $('#news-list').append(`
    <li class="list-group-header">
        <input class="form-control" type="text" value="" placeholder="Search for news" onchange="search(this)">
    </li>
    `);
    allNews.forEach(news => {
        singleNews = `
        <li class="list-group-item">
        <img class="img-circle media-object pull-left" src="${news.urlToImage}" width="50"
            height="50">
        <div class="media-body">
            <strong><a href="${news.url}" onclick="openArticle(event)">${news.title}</a></strong>
            <div>
                <span class="">${news.publishedAt}</span>
                <span class="pull-right">Author: ${news.author}</span>
            </div>
            <p>${news.description}</p>
        </div>
    </li>
        `;

//        document.getElementById('news-list').innerHTML(singleNews);
        $('#news-list').append(singleNews);
    });
  }

  function openArticle(event){
      event.preventDefault();
      let link = event.target.href;
      window.open(link);
  }

  navItems.click((event) => {
    console.log('clicked');
    navItems.removeClass('active');
    $(event.target).addClass('active');
    let categ = event.target.id;
    getNews(categ);
  });

  function search(input){
      let query = $(input).val();
      let sorted = articles.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
      showNews(sorted);
  }