/**
 * Helper for creating and querying Dictionaries.
 * A rudimentary alternative to ES6 Maps.
 */
export class Dictionary<T> {
    /**
     * @constructor
     * @param {object} items Initial seed of items.
    */
    constructor(protected items?: { [index: string]: T }) {
        if (this.items == null) {
            this.items = {};
        }
    }

    /**
     * Gets an item from the dictionary.
     *
     * @param {string} key The key of the item.
     * @return {object} Returns an item if found, else returns null.
     */
    get(key: string): T {
        if (!this.contains(key)) {
            return null;
        }
        return this.items[key];
    }

    /**
     * Adds an item into the dictionary.
     * If the key already exists, then it will throw.
     *
     * @param {string} key The key of the item.
     * @param {object} value The item to be added.
     * @return {object} Returns the added item.
     */
    add(key: string, value: T): T {
        if (this.contains(key)) {
            throw new Error(`Key: ${key} already exists.`);
        }
        return this.insert(key, value);
    };

    /**
     * Inserts an item into the dictionary.
     * If an item already exists with the same key, it will be overridden by the new value.
     *
     * @param {string} key The key of the item.
     * @param {object} value The item to be added.
     * @return {object} Returns the added item.
     */
    insert(key: string, value: T): T {
        this.items[key] = value;
        return value;
    }

    /**
     * Removes an item from the dictionary.
     * Will throw if the key doesn't exist.
     *
     * @param {string} key The key of the item.
     * @return {object} Returns the deleted item.
     */
    remove(key: string): T {
        if (!this.contains(key)) {
            throw new Error(`Key: ${key} not found.`);
        }
        var value = this.items[key];
        delete this.items[key];
        return value;
    };

    /**
     * Clears the dictionary.
     */
    clear() {
        this.items = {};
    }

    /**
     * Check if the dictionary contains the given key.
     *
     * @param {string} key The key of the item.
     * @return {boolean} Returns true if the key was found.
     */
    contains(key: string): boolean {
        if (key == null) {
            throw new Error('Key cannot be null or undefined');
        }
        return this.items.hasOwnProperty(key);
    }

    /**
     * Lists all the keys in the dictionary.
     *
     * @return {array} Returns all the keys.
     */
    keys(): string[] {
        return Object.keys(this.items);
    }

    /**
     * Lists all the values in the dictionary.
     *
     * @return {array} Returns all the values.
     */
    values(): T[] {
        return Object.values(this.items);
    }

    /**
     * Get the dictionary.
     *
     * @return {object} Returns the dictionary if it contains data, null otherwise.
     */
    lookup(): { [key: string]: T } {
        return this.keys().length ? this.items : null;
    }

    /**
     * Number of items in the dictionary.
     *
     * @return {number} Returns the number of items in the dictionary.
     */
    get count(): number {
        return this.values().length;
    };
}