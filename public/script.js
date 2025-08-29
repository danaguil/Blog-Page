
// Sample article data
const articles = {
    'My first article': {
        date: 'August 3, 2024',
        content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
    },
    'Second article': {
        date: 'August 4, 2024',
        content: `<p>This is the content of the second article. It contains different information and insights about various topics that readers might find interesting.</p>
        
        <p>Each article provides unique value and perspective, helping readers understand different concepts and ideas in a clear and engaging way.</p>`
    },
    'Third article': {
        date: 'August 1, 2024',
        content: `<p>The third article explores new territories and discusses innovative approaches to solving common problems.</p>
        
        <p>With detailed examples and practical advice, this article serves as a comprehensive guide for readers looking to expand their knowledge.</p>`
    }
};

// Function to load article content
function loadArticle(title, date, articleId) {
    const articleTitle = document.getElementById('article-title');
    const articleDate = document.getElementById('article-date');
    const articleContent = document.getElementById('article-content');
    const breadcrumb = document.getElementById('article-breadcrumb');

    articleTitle.textContent = title;
    articleDate.textContent = date;
    breadcrumb.textContent = `/article/${articleId}`;


    if (articles[title]) {
        articleContent.innerHTML = articles[title].content;
    } else {
        articleContent.innerHTML = `<p>This is the content for "${title}". Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`;
    }

    // Highlight selected article
    const allItems = document.querySelectorAll('.article-item');
    allItems.forEach(item => item.style.backgroundColor = '');
    
    event.currentTarget.style.backgroundColor = '#f1f5f9';
}

// Initialize with first article selected
document.addEventListener('DOMContentLoaded', function() {
    const firstItem = document.querySelector('.article-item');
    firstItem.style.backgroundColor = '#f1f5f9';
});