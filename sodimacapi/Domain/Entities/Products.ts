import { ValueError } from "./errors";

export class Products {
    id: string;
    sku: string;
    name: string;
    stock: number;
    weight: number;

    /**
     * 
     * @param props 
     */
     constructor(props: Partial<Products>, validate = true) {
        this.id = props.id;
        this.sku = props.sku;
        this.name = props.name;
        this.stock = props.stock;
        this.weight = props.weight;
        if (validate) this.validate();
    }

    /**
     * validate company properties
     */
    validate() {
        if (typeof (this.sku) != "string" || !this.sku)
            throw new ValueError("sku should be not empty string");

        if (typeof (this.name) != "string" || !this.name)
            throw new ValueError("name should be not empty string");

        if (typeof (this.stock) != "number" || !this.stock)
            throw new ValueError("stock should be not empty");

        if (typeof (this.weight) != "number" || !this.weight)
            throw new ValueError("weight should be not empty");
    }
}
