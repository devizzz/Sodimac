
export class ProductsDto {
    id: string;
    sku: string;
    name: string;
    stock: number;
    weight: number;

    /**
     * 
     * @param props 
     */
    constructor(props: Partial<ProductsDto>) {
        this.id = props.id;
        this.sku = props.sku;
        this.name = props.name;
        this.stock = props.stock;
        this.weight = props.weight;
    }
}
