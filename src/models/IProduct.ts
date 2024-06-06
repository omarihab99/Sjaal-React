
/**
 * Represents a product.
 *
 * @interface
 * @property {string} id - The id of the product.
 * @property {string} collectionId - The id of the collection the product belongs to.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {string[]} availableSizes - The available sizes of the product.
 * @property {number} availableQuantaties - The available quantities of the product.
 * @property {string} description - The description of the product.
 * @property {string[]} images - The images of the product.
 */
export interface IProduct {
    id: string;
    collectionId: string;
    name: string;
    price: number;
    availableSizes: string[];
    availableQuantaties: number;
    description: string;
    images: string[];
}

