const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// 1. FUNCIÓN PRINCIPAL (El motor de conexión)
async function ShopifyData(query: string, variables?: any) {
  const URL = `https://${domain}/api/2024-01/graphql.json`;

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    // AQUÍ ESTÁ LA CORRECCIÓN: Enviamos query y variables separados
    body: JSON.stringify({ query, variables }),
  };

  try {
    const response = await fetch(URL, options);
    const data = await response.json();

    // Si Shopify reporta errores de sintaxis, los mostramos
    if (data.errors) {
      console.error("❌ Error GraphQL:", data.errors[0].message);
    }

    return data;
  } catch (error) {
    throw new Error("Error fetching products from Shopify");
  }
}

// 2. OBTENER TODOS LOS PRODUCTOS (Para /shop)
export async function getProducts() {
  const query = `
  {
    products(first: 50) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);
  // Retornamos el array de productos o un array vacío si falla
  return response.data?.products?.edges || []; 
}

// 3. OBTENER UN PRODUCTO (Para la página de detalle)
export async function getProduct(handle: string) {
  const query = `
  query getProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
          }
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }`;

  // Enviamos el handle como variable segura
  const response = await ShopifyData(query, { handle });
  return response.data?.productByHandle;
}

// 4. CARRITO: CREAR
export async function createCart() {
  const query = `mutation cartCreate { cartCreate { cart { id checkoutUrl } } }`;
  const response = await ShopifyData(query);
  return response.data.cartCreate.cart;
}

// 5. CARRITO: AGREGAR ITEM
export async function addToCart(cartId: string, lines: any[]) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product { title handle }
                    image { url altText }
                  }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  `;
  const response = await ShopifyData(query, { cartId, lines });
  return response.data.cartLinesAdd.cart;
}

// 6. CARRITO: OBTENER
export async function getCart(cartId: string) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product { title handle }
                  image { url altText }
                }
              }
            }
          }
        }
        cost {
          totalAmount { amount currencyCode }
        }
      }
    }
  `;
  const response = await ShopifyData(query, { cartId });
  return response.data.cart;
}

// 7. CARRITO: ELIMINAR ITEM
export async function removeFromCart(cartId: string, lineIds: string[]) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product { title handle }
                    image { url altText }
                  }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  `;
  const response = await ShopifyData(query, { cartId, lineIds });
  return response.data.cartLinesRemove.cart;
}

// 8. CARRITO: ACTUALIZAR CANTIDAD
export async function updateCart(cartId: string, lines: any[]) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product { title handle }
                    image { url altText }
                  }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  `;
  const response = await ShopifyData(query, { cartId, lines });
  return response.data.cartLinesUpdate.cart;
}