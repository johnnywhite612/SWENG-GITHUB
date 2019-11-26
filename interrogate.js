var github = require('octonode');

function interrogateGithubAPI() {

        var client = github.client();

        //Get the details associated with my own Github account
        client.get('/search/users', {}, function (err, status, body, headers) {
                console.log(body);

        });

        //Check if my LCA assignment repo is public or private
        let sampleRepo = client.repo('johnnywhite612/LowestCommonAncestor');
        sampleRepo.info(function(err, data, headers) {
                console.log("Is this repo private? Answer: " + (data.private == true ? 'YES' : 'NO'));
              });
        
}

interrogateGithubAPI();