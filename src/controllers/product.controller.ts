import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../models/product';
import { UpdateProductDto } from '../models/product';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class ProductController {
    private readonly service: ProductService;

    constructor(service: ProductService) {
        this.service = service;
        this.createProduct = this.createProduct.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto = plainToInstance(CreateProductDto, req.body);
            const errors = await validate(dto);
            
            if (errors.length > 0) {
                const validationErrors = errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints
                }));
                res.status(400).json({
                    statusCode: 400,
                    message: 'Validation failed',
                    errors: validationErrors
                });
                return;
            }

            const product = await this.service.createProduct(dto);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const product = await this.service.getProduct(id);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const dto = plainToInstance(UpdateProductDto, req.body);
            const errors = await validate(dto);
            
            if (errors.length > 0) {
                const validationErrors = errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints
                }));
                res.status(400).json({
                    statusCode: 400,
                    message: 'Validation failed',
                    errors: validationErrors
                });
                return;
            }

            const product = await this.service.updateProduct(id, dto);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await this.service.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}