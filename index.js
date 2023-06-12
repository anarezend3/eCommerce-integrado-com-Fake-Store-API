const apiURL = 'https://diwserver.vps.webdock.cloud/products';

function createSkeletonCard() {
  return `
    <div class="col-lg-4 col-md-6">
      <div class="card card-skeleton">
        <div class="card-body">
          <div class="img">
          <h5 class="card-title"></h5>
          <p class="card-text category"></p>
          <p class="card-text rating"></p>
          <p class="card-text price"></p>
        </div>
      </div>
    </div>
  `;
}

function createProductCard(product) {
  return `
    <div class="col-lg-4 col-md-6" data-category="${product.category}">
      <div class="card">
        <img class="card-img-top" src="${product.image}" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text category">${product.category}</p>
          <p class="card-text">
          <span class="rating-stars">
            <i class="fas fa-star${product.rating.rate >= 1 ? '' : '-half-alt'}"></i>
            <i class="fas fa-star${product.rating.rate >= 2 ? '' : '-half-alt'}"></i>
            <i class="fas fa-star${product.rating.rate >= 3 ? '' : '-half-alt'}"></i>
            <i class="fas fa-star${product.rating.rate >= 4 ? '' : '-half-alt'}"></i>
            <i class="fas fa-star${product.rating.rate >= 5 ? '' : '-half-alt'}"></i>
          </span>
          (${product.rating.rate})
          </p>
          <p class="card-text price">${product.price},00</p>

          <button id="verDetalhesBtn" class="btn btn-primary ver-detalhes-btn" style="background-color: #2f23d4;" data-id="${product.id}">Ver Detalhes</button>

        </div>
      </div>
    </div>
  `;
}


async function fetchProducts(searchTerm = '') {
  try {
    const url = getUrl(searchTerm, 21);
    const response = await fetch(url);
    const data = await response.json();
    return data?.products || data;
  } catch (error) {
    renderError();
    console.error(error);
  }
}

getUrl = (searchTerm, pageItems = 12) => {
  if (searchTerm) {
    return `${apiURL}/search?query=${searchTerm}&page_items=60`
  }
  return `${apiURL}?page_items=${pageItems}&page=205  
  `
}

async function displayProducts(searchTerm = '') {
  const products = await fetchProducts(searchTerm);
  const productsDiv = $('#products');
  productsDiv.empty();
  if (products.length > 0) {
    products.forEach(function (product) {
      productsDiv.append(createProductCard(product));
    });
  } else {
    productsDiv.append(`
      <div class="col-12">
        <h5 class="text-center">Produto não encontrado!</h2>
      </div>
    `);
  }
}

async function displayProductsByCategory(category = '') {
  try {
    const url = `https://diwserver.vps.webdock.cloud/products/category/${category}`;
    const response = await fetch(url);
    const data = await response.json();
    const productsDiv = $('#products');
    productsDiv.empty();
    if (data.products?.length) {
      data.products.forEach(function (product, index) {
        productsDiv.append(createProductCard(product, index));
      });
      AOS.init();
    } else {
      productsDiv.append(`
        <div class="col-12">
          <h5 class="text-center">Nenhum produto encontrado.</h2>
        </div>
      `);
    }
  } catch (error) {
    renderError();
    console.error(error);
  }
}

function renderSkeletons(skeletonQuantity) {
  const productsDiv = $('#products');
  for (let i = 0; i < skeletonQuantity; i++) {
    productsDiv.append(createSkeletonCard());
  }
}

function renderError() {
  const productsDiv = $('#products');
  productsDiv.empty();
  productsDiv.append(`
    <div class="col-12">
      <h2 class="text-center">Erro no servidor. Tente novamente.</h2>
    </div>
  `);
}


renderSkeletons(6);
