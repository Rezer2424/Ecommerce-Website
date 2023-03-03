//http://api.devtoolstech.in/ecommerce/products

export const apiProduct = {
    fetch: async () => fetch('http://api.devtoolstech.in/ecommerce/products').then(resolve => resolve.json())
}

const apiCategory = {
    fetch: () => new Promise(resolve => setTimeout(() => resolve([
        {
            "id": 1,
            "name": "Books",
            "image": "http://placeimg.com/640/480/city"
        },
        {
            "id": 2,
            "name": "Home",
            "image": "http://placeimg.com/640/480/city"
        },
        {
            "id": 3,
            "name": "Kids",
            "image": "http://placeimg.com/640/480/city"
        },
        {
            "id": 4,
            "name": "Health",
            "image": "http://placeimg.com/640/480/city"
        },
        {
            "id": 5,
            "name": "Clothing",
            "image": "http://placeimg.com/640/480/city"
        }
    ]), 500))


}
export default apiCategory