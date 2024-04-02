
var loc = window.location.href;

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    if (loc.includes("index.html")){
        // Yelp API integration
        // Adapted from https://rapidapi.com/letscrape-6bRBa3QguO5/api/yelp-reviews
        const settings = {
            url: 'https://yelp-reviews.p.rapidapi.com/business-reviews?business_id=say-it-with-sweets-altoona&page=1&page_size=10&num_pages=1&language=en',
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '327bb7d7e3msh0bcd87962a49531p1212d4jsn670f8696d379',
              'X-RapidAPI-Host': 'yelp-reviews.p.rapidapi.com'
            }
        };
        
        const reviewsContainer = document.getElementById('reviews-container');
        const loadingText = document.createElement('div');
        loadingText.id = 'reviews-loading';
        loadingText.textContent = 'Loading...';
        reviewsContainer.parentNode.insertBefore(loadingText, reviewsContainer);

        $.ajax(settings)
            .done(function(response) {
                console.log(response);
                response.data.reviews.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.classList.add('review');
                    reviewElement.innerHTML = `
                        <p class="review-name">${review.author_name}</p>
                        <p class="review-text">${review.review_text}</p>
                        <p class="review-rating">Rating: ${review.review_rating}</p>
                    `;
                    reviewsContainer.appendChild(reviewElement);
                });

                // Remove the loading text and show the reviews
                loadingText.remove();
                reviewsContainer.classList.add('loaded');
            })
            .fail(function(error) {
                console.error('Error:', error);
                // Remove the loading text and show an error message
                loadingText.textContent = 'Failed to load reviews.';
            });
    }

    if (loc.includes("products.html")) {
        // Using the https://kenwheeler.github.io/slick/ library here
        $('.product-carousel').slick({
            dots: false,
            arrows: false,
            infinite: false,
            speed: 0,
            slidesToShow: 1,
            draggable: false,
            adaptiveHeight: true
        });
        
        $('.category-buttons button').on('click', function() {
            var category = $(this).data('category');
            $('.product-carousel').slick('slickGoTo', $('.product-category[data-category="' + category + '"]').index());

            // Remove the 'active' class from all buttons
            $('.category-buttons button').removeClass('active');

            // Add the 'active' class to the clicked button
            $(this).addClass('active');
        });

        $('.image-carousel').slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 100,
            draggable: true
        });
    }

});

