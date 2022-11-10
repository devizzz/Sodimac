import { ProductsDto } from "../Domain/Dtos/ProductsDto";
import { ProductsMapper } from "../Domain/Mappers/ProductsMapper";
import ProductsRepository, { Products } from "../Dal/Repositories/ProductsRepository";

type ConstructorProps = {
    productsRepository: ProductsRepository,
    productsMapper: ProductsMapper,
};

class SodimacService {

  private readonly productsRepository: ProductsRepository; 
  private readonly productsMapper: ProductsMapper;

  constructor({productsRepository, productsMapper}: ConstructorProps) {
    this.productsRepository = productsRepository;
    this.productsMapper = productsMapper;
  }

  public async saveProduct(productDto: ProductsDto): Promise<ProductsDto> {
    const product = this.productsMapper.dtoToEntity(productDto);
    const createdItem = await this.productsRepository.createProduct(product);
    return this.productsMapper.entityToDto(createdItem);
  }

  public async updateProduct(productDto: ProductsDto): Promise<void> {
    const product = this.productsMapper.dtoToEntity(productDto);
    await this.productsRepository.updateProduct(product);
  }

  public async getProducts(): Promise<ProductsDto[]> {
    const items = await this.productsRepository.getProducts();
    const productsDto = items.map(x => this.productsMapper.entityToDto(new Products(x, false)));
    return productsDto;
  }

  public async deleteProduct(id: string, partitionKey: string): Promise<void> {
    await this.productsRepository.deleteProduct(id, partitionKey);
  }
}

export default SodimacService;
