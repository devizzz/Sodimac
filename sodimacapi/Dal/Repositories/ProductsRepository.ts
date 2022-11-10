import { Container } from '@azure/cosmos';
import { ValueProvider } from '../ValueProvider';

export { Products } from '../../Domain/Entities/Products';

type ConstructorProps = {
    productsContainerProvider: ValueProvider<Container>,
};

class ProductsRepository {

    private readonly productsContainerProvider: ValueProvider<Container>;

    constructor({ productsContainerProvider }: ConstructorProps) {
        this.productsContainerProvider = productsContainerProvider;
    }

    async getProducts() {

        const querySpec = {
            query: 'SELECT * from c'
        };

        // read all items in the Items container
        const container = await this.productsContainerProvider.provide();
        const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll();

        return items;
    }

    async getUsersById(NIT: string) {

        const querySpec = {
            query: 'SELECT * from c'
        };

        const container = await this.productsContainerProvider.provide();
        const { resources: items } = await container.items.query(querySpec, { partitionKey: NIT }).fetchAll();

        return items;
    }

    async createProduct(item) {
        const container = await this.productsContainerProvider.provide();
        const { resource: createdItem } = await container.items.create(item)

        return createdItem;
    }

    async updateProduct(item) {
        const container = await this.productsContainerProvider.provide();
        await container.item(item.id).replace(item);
    }

    async deleteProduct(id, partitionKey) {
        const container = await this.productsContainerProvider.provide();
        await container.item(id, partitionKey).delete();
    }
}

export default ProductsRepository;
