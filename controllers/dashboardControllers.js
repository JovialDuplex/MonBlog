const index = (request, response)=>{response.render("dashboard/index");};
const manageArticlePage = (request, response)=>{response.render("dashboard/article/index");};
const manageCategoryPage = (request, response)=>{response.render("dashboard/category");};
const manageUserPage = (request, response)=>{response.render("dashboard/user");};

// Controllers of article in dashboard
const addArticlePage = (request, response)=>{response.render("dashboard/article/add-article");};
const updateArticlePage = (request, response)=>{response.render("dashboard/article/update-article");};

module.exports = {
    index,
    manageArticlePage,
    manageCategoryPage,
    manageUserPage,

    // -------------------------
    addArticlePage,
    updateArticlePage,
};