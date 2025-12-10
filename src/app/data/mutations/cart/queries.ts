//fetch cart

export const CART_QUERY = `
    query CartQuery($cartId: ID!) {
        cart(id: $cartId) {
            id
            checkoutUrl

            cost {
                subtotalAmount { amount currencyCode }
                totalAmount { amount currencyCode }
            }
            
            totalQuantity

            lines(first: 100) {
                edges {
                    node {
                        id
                        quantity

                        merchandise {
                            ... on ProductVariant {
                                id
                                title
                                availableForSale

                                product {
                                    title
                                }
                                
                                image {
                                    url
                                    width
                                    height
                                    altText
                                }
                                
                                price {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                }
            }
        }
    }

`;

// // //get customer to fetch their active cart
// export const GET_CUSTOMER_CART = `
//     query GetCustomerCart($customerAccessToken: String!) {
//         customer(customerAccessToken: $customerAccessToken) {
//             id
//             cart {
//                 id
//                 cost {
//                     subtotalAmount {
//                         amount
//                     }
//                 }
//                 lines(first: 50) {
//                     edges {
//                         node {
//                             id
//                             quantity
//                             merchandise {
//                                 ... on ProductVariant {
//                                     id
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `;
// export const GET_CUSTOMER = `

//     query getCustomer($customerAccessToken: String!) {
//     customer(customerAccessToken: $customerAccessToken) {
//         lastIncompleteCheckout {
//             id
//             lineItems(first: 50) {
//                 edges {
//                     node {
//                         id
//                         quantity
//                         title
//                         variant {
//                             id
//                         }
//                     }
//                 }
//             }
//         }
//     }

// }
// `;

//cart creation
export const CREATE_CART_MUTATION = `
    mutation CreateCart {
        cartCreate {
            cart {
                id
                checkoutUrl
            }
        }
    }

`;

//add to cart

export const ADD_TO_CART_MUTATION = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $line) {
            cart {
                id
            }
        }
    }


`;

export const UPDATE_CART_LINES_MUTATIONS = `
    mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart { id }
        }
    }

`;

export const REMOVE_CART_LINE = `
    mutation RemoveLine($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart { id }
        }
    }

`;

export const CART_BUYER_IDENTITY_UPDATE = `
    mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
        cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
            cart {
                id 
                buyerIdentity {
                    customer {
                        id 
                        email
                    }
                }
            }
            userErrors {
                field 
                message
            }
        }
    }
`;
