$(() => {
    var posts = [];
    var $content = $('#jsonContent');
    var display = '';

    // Fetch data from both RSS feeds
    var main = new Promise((resolve) => {
        $.get(
            'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40matthewckwong',
            { rss: 'https://medium.com/feed/@matthewckwong' },
            (response) => {
                if (response.status == 'ok') {
                    posts = posts.concat(response.items); // Merge posts
                    resolve();
                }
            }
        );
    });

    var acdx = new Promise((resolve) => {
        $.get(
            'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40matthew.wong_6013',
            { rss: 'https://medium.com/feed/@matthew.wong_6013' },
            (response) => {
                if (response.status == 'ok') {
                    posts = posts.concat(response.items); // Merge posts
                    resolve();
                }
            }
        );
    });

    // Process and display the posts
    Promise.all([main, acdx])
        .then(() => {
            // Sort posts by publication date (descending order)
            posts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

            // Render sorted posts
            posts.forEach(item => {
                display += `<div class="card mb-3 mx-auto" style="width: 50rem;">`;
                display += `<div class="card-body">`;
                display += `<h5 class="card-title text-capitalize"><a href="${item.link}">${item.title}</a></h5>`;
                var yourString = item.description.replace(/<img[^>]*>/g, ""); // Remove images
                yourString = yourString.replace('h4', 'p');
                yourString = yourString.replace('h3', 'p');
                var maxLength = 120; // Maximum number of characters to extract
                var trimmedString = yourString.substr(0, maxLength); // Trim the string
                trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))); // Re-trim if in the middle of a word
                display += `<p class="card-text">Published ${item.pubDate.substr(0, 10)}</p>`;
                display += `<p class="card-text">${trimmedString}...</p>`;
                display += `<a href="${item.link}" target="_blank" class="btn btn-outline-success" >Read More</a>`;
                display += `</div></div>`;
            });

            $content.html(display);
        });
});