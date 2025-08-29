class Admin extends user {
    constructor(id, username, email, password, dateJoined = new Date().toISOString(),
    firstName, lastName, role) {
        super(id, username, email, password, dateJoined = new Date().toISOString(),
    firstName, lastName, role);
        this.role = 'admin'; // admin role
        this.posts = []; // array of post IDs created by admin
        this.totalViews = 0; // total views across all posts
    }

    // method to add a post
    addPost(postId) {
        this.posts.push(postId);
    }

    // edit a post
    editPost(postId, updates) {
        const post = this.findPostById(postId);
        if (post & post.admin.id == this.id) { // if we found the post and it belongs to this admin
            post.updateContent(updates.title, updates.content, updates.dateUpdated);
            
            return post;
        }
        throw new Error('Post not found or unauthorized');
    }

    deletePost(postId) {
        const postIndex = this.posts.indexOf(postId);
        if (postIndex > -1) {
            this.posts.splice(postIndex, 1);
            // Also remove from global posts array
            return true;
        }
        return false;    
    }

     getPostStats() {
        const posts = this.getAllMyPosts();
        return {
            totalPosts: posts.length,
            publishedPosts: posts.filter(p => p.status === 'published').length,
            draftPosts: posts.filter(p => p.status === 'draft').length,
            totalViews: posts.reduce((sum, post) => sum + post.viewCount, 0),
            averageViews: posts.length ? Math.round(this.totalViews / posts.length) : 0
        };
    }

    // method to increment total views
    incrementTotalViews(views) {
        this.totalViews += views; // add views to total
    }

}