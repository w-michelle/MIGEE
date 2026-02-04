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
                                

                                product {
                                    title
                                    handle
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
        cartLinesAdd(cartId: $cartId, lines: $lines) {
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

export const imageMeta = `
    asset->{
        _id,
        url,
        metadata {
            dimensions{
                width,
                height
            },
            lqip
        }
    }

`;

export const HOME_PAGE_QUERY = `
    *[_type == "page" && slug.current == "home"][0]{
        title,
        hasTransparentHeader,
        modules[]{
            ...,
            items[]{
                ...,
                _type == "product" => @->{
                    _id,
                    productID,
                    productTitle,
                    "slug": slug.current,
                    productImage,
                    price,
                    "defaultVariant": *[_type == "productVariant" && string(productID) == string(^.productID)][0] {
                        variantID,
                         title,
                        price,
                     },
                }
            },
            media[] {
                _key,
                mediaType,
                image{
                ...,
                alt,
                customRatio,
                ${imageMeta}
            },
                video{
                asset->{
                url
                }
            }
            },
            photos[]{
                ...,
                alt,
                customRatio,
                ${imageMeta}
            },
      
            _type == "reference" => @->{
                ...
            }
        },
        seo
    }
`;
