const apiURL = 'https://diwserver.vps.webdock.cloud/products';

function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

/* Sugestão: Adicionar tratamento de erros mais robusto e melhorar a usabilidade para o usuário */

async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`${apiURL}/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function displayProductDetails(product) {
  const productDetailsDiv = $('#productDetails');
  const productDetailsHTML = `
    <div class="col-md-6">
      <img class="img-fluid" src="${product.image}" alt="${product.title}">
    </div>
    <div class="col-md-6">
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <p>Price: ${product.price} USD</p>
      <p>Description: ${product.description}</p>
    </div>
  `;
  productDetailsDiv.html(productDetailsHTML);
}

async function showProductDetails() {
  const productId = getProductIdFromURL();
  if (productId) {
    const product = await fetchProductDetails(productId);
    if (product) {
      displayProductDetails(product);
    }
  }
}
showProductDetails();
