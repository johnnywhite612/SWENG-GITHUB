var axios = require('axios');

function test() {
        let config = {
                params: {
                        q: 'type:org location:dublin',

                },
        }

        axios.get('https://api.github.com/search/users', config).then((response) => {
                console.log(response.data);
              }, (error) => {
                console.log(error);
              });
}

test();