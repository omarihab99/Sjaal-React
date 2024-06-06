/**
 * Represents a collection.
 *
 * @interface
 * @property {string} id - The id of the collection.
 * @property {string} name - The name of the collection.
 * @property {string} categoryId - The id of the category the collection belongs to.
 * @property {string} imgName - The name of the image file associated with the collection.
 */
export interface ICollection {
    id: string;
    name: string;
    categoryId: string;
    imgName: string;
}

