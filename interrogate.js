var github = require('octonode');

function interrogateGithubAPI() {

        var client = github.client();

        //Get the details associated with my own Github account
        client.get('/users/johnnywhite612', {}, function (err, status, body, headers) {
                console.log(body);
        });

}

interrogateGithubAPI();