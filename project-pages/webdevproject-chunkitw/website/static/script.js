
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

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

});

