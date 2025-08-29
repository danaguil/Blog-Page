/*
    * Article Class
    * Represents an article with properties like id, title, content, authorId, date, viewCount, and status.
    * Includes methods to manage article data.    
*/
class Article {
    constructor(id, title, content, authorId, date = new Date().toISOString()) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.date = date;

        this.viewCount = 0;
        this.status = 'published'; // draft, published, archived
    }

    // gives a short excerpt of the content to user
    getExcerpt(maxLength = 100) {
         const text = this.content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        return text.length > maxLength ? text.substr(0, maxLength) + '...' : text;
    }

    // Method to increment view count
    incrementView(){
        this.viewCount += 1;
    }

    // format date to a more readable format
    getFormattedDate() {
        return new Date(this.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // update article content
    updateContent(newTitle, newContent, dateUpdated = new Date().toISOString()) {
        this.title = newTitle || this.title;
        this.content = newContent || this.content;
        this.date = dateUpdated;
    }

    // find a post by ID from a global posts array (assuming posts is a global array)
    findPostById(postId) {
        return posts.find(p => p.id === postId);
    }

    // get all posts by this author from a global posts array
    getAllMyPosts() {
        return posts.filter(p => p.authorId === this.authorId);
    }
}