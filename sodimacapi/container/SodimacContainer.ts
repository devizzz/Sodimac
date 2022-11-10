import { asClass, createContainer, asValue } from 'awilix';
import SodimacService from '../Services/SodimacService';
import { ValueProvider } from '../Dal/ValueProvider';
import SodimacController from '../Controllers/SodimacController';
import { Container as CosmosDbContainer } from '@azure/cosmos';
import DbContext from '../Dal/dbContext';
import { ProductsMapper } from '../Domain/Mappers/ProductsMapper';
import ProductsRepository from '../Dal/Repositories/ProductsRepository';

type ContainerProps = {
    sodimacService: SodimacService,
    sodimacController: SodimacController,
    productsRepository: ProductsRepository,
    productsContainerProvider: ValueProvider<CosmosDbContainer>,
    productsMapper: ProductsMapper,
};

const container = createContainer<ContainerProps, any>();

container
    .register({
        sodimacController: asClass(SodimacController).singleton(),
    })
    .register({
        sodimacService: asClass(SodimacService).singleton()
    })
    .register({
        productsMapper: asClass(ProductsMapper).singleton()
    })
    .register({
        productsRepository: asClass(ProductsRepository).singleton(),
    })
    .register({
        productsContainerProvider: asValue(new ValueProvider( async () => await DbContext('Products', 'sku')))
    });

export default container;
