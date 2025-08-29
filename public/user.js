class user {
    constructor(id, username, email, password, dateJoined = new Date().toISOString(),
    firstName, lastName, role)
    {
        this.id = id;
        this.username = username;

        this.email = email;
        this.password = password;

        this.dateJoined = dateJoined;

        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role; // admin or guest

        this.articlesSaved = []; // array of article IDs, user can save articles
    }

    // getters
    getUsername(){
        return this.username;
    }
    getEmail(){
        return this.email;
    }
    getFirstName(){
        return this.firstName;
    }
    getLastName(){
        return this.lastName;
    }
    getDateJoined(){
        return this.dateJoined
    }

    getArticlesSaved(){
        return this.articlesSaved;
    }

    // updating
    updateRole(newRole){
        this.role = newRole;
    }
    saveArticle(articleId){
        this.articlesSaved.push(articleId);
    }
    removeArticle(articleId){
        this.articlesSaved = this.articlesSaved.filter(id => id !== articleId);
    }
}       
