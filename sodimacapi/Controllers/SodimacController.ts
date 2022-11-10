import { HttpRequest } from "@azure/functions";
import { ControllerResponse } from "./ControllerResponse";
import SodimacService from "../Services/SodimacService";
import { ProductsDto } from "../Domain/Dtos/ProductsDto";
import { ValueError } from "../Domain/Entities/errors";

type ConstructorProps = {
    sodimacService: SodimacService
};

class SodimacController {

    private readonly sodimacService: SodimacService;

    constructor({ sodimacService }: ConstructorProps) {
        this.sodimacService = sodimacService;
    }

    public async handleReqest(req: HttpRequest): Promise<ControllerResponse> {
        switch (req.method) {
            case "GET":
                return await this.getProducts();
            case "POST":
                return await this.saveProduct(req);
            case "PUT":
                return await this.updateProduct(req);
            case "DELETE":
                return await this.deleteProduct(req);
            default:
                return ControllerResponse.notFound({ error: `${req.method} method not supported` });
        }
    }

    private async getProducts(): Promise<ControllerResponse> {
        try {
            const response = await this.sodimacService.getProducts();
            return ControllerResponse.success(response);
        } catch (error) {
            if (error instanceof ValueError) {
                return ControllerResponse.badRequest({ error: error.message || "Bad Request" });
            }
            return ControllerResponse.serverError({ error: error.message || "Server Error" });
        }
    }

    private async saveProduct(req: HttpRequest): Promise<ControllerResponse> {
        try {
            const productsDto = new ProductsDto(req.body);
            const response = await this.sodimacService.saveProduct(productsDto);
            return ControllerResponse.success(response);
        } catch (error) {
            if (error instanceof ValueError) {
                return ControllerResponse.badRequest({ error: error.message || "Bad Request" });
            }
            return ControllerResponse.serverError({ error: error.message || "Error interno" });
        }
    }

    private async updateProduct(req: HttpRequest): Promise<ControllerResponse> {
        try {
            const productsDto = new ProductsDto(req.body);
            await this.sodimacService.updateProduct(productsDto);
            return ControllerResponse.success();
        } catch (error) {
            if (error instanceof ValueError) {
                return ControllerResponse.badRequest({ error: error.message || "Bad Request" });
            }
            return ControllerResponse.serverError({ error: error.message || "Error interno" });
        }
    }

    private async deleteProduct(req: HttpRequest): Promise<ControllerResponse> {
        try {
            const { id, partitionKey } = req.query;
            if(id && partitionKey){
                await this.sodimacService.deleteProduct(id, partitionKey);
                return ControllerResponse.success();
            }
            else {
                return ControllerResponse.notFound();
            }
        } catch (error) {
            if (error instanceof ValueError) {
                return ControllerResponse.badRequest({ error: error.message || "Bad Request" });
            }
            return ControllerResponse.serverError({ error: error.message || "Error interno" });
        }
    }
}

export default SodimacController;
