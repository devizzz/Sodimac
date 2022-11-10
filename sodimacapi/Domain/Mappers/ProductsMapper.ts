import { ProductsDto } from "../Dtos/ProductsDto";
import { Products } from "../Entities/Products";

export class ProductsMapper {

  entityToDto(entity: Products): ProductsDto {
    return new ProductsDto(entity);
  }

  dtoToEntity(dto: ProductsDto): Products { 
    return new Products(dto);
  }

}
