function isPriceMatch(price, priceRange) {
  if (priceRange === '') {
    return true; 
  } else if (priceRange === '0-800') {
    return price >= 0 && price <= 800;
  } else if (priceRange === '0-1000') {
    return price >= 0 && price <= 1000;
  } else if (priceRange === '1000+') {
    return price > 1000;
  }
}
function isCategoryMatch(productCategory, selectedCategory) {
  if (selectedCategory === '') {
    return true;
  } else {
    return productCategory === selectedCategory;
  }
}

function filterProducts(priceRange, selectedCategory) {
  const productsDiv = $('#products');
  const productCards = productsDiv.children();

  productCards.hide();

  productCards.each(function () {
    const priceText = $(this).find('.price').text();
    const price = parseFloat(priceText);
    const productCategory = $(this).data('category');
    const priceMatch = isPriceMatch(price, priceRange);

    const categoryMatch = selectedCategory === '' || productCategory === selectedCategory;

    if (priceMatch && categoryMatch) {
      $(this).show();
    }
  });
}

function populateCategories(categories) {
  const categorySelect = $('#categoryFilter');

  categories.forEach(function (category) {
    categorySelect.append(`<option value="${category}">${category}</option>`);
  });
}
$('#priceFilter').change(function () {
  const selectedPriceRange = $(this).val();
  const selectedCategory = $('#categoryFilter').val();
  filterProducts(selectedPriceRange, selectedCategory);
});

$('#categoryFilter').change(function () {
  const selectedPriceRange = $('#priceFilter').val();
  const selectedCategory = $(this).val();
  filterProducts(selectedPriceRange, selectedCategory);
});

$('#searchButtonHome').click(function () {
  const searchTerm = $('#searchInput').val();
  var url = "pesquisa.html?term=" + encodeURIComponent(searchTerm);
  window.location.href = url;
});

$('#searchButton').click(function () {
  const searchTerm = $('#searchInput').val();
  displayProducts(searchTerm);
});

$("#searchInput").keyup(function (event) {
  if (event.keyCode === 13) {
    const searchTerm = $('#searchInput').val();
    displayProducts(searchTerm);
  }
});

async function initializeCategories() {
  try {
    const response = await fetch(`${apiURL}/categories`);
    const categories = await response.json();
    populateCategories(categories);
  } catch (error) {
    console.error(error);
  }
}

initializeCategories();
