import { Product } from '../models/product';
import { CreateProductDto } from '../models/product';
import { UpdateProductDto } from '../models/product';
import { ProductRepository } from '../repositories/product.repository';
import { NotFoundException, ConflictException, BadRequestException } from '../utils/http-exceptions';

export class ProductService {
    private readonly repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    async createProduct(dto: CreateProductDto): Promise<Product> {
        this.validateCreateDto(dto);
        
        const existingProduct = await this.repository.findByName(dto.name);
        if (existingProduct) {
            throw new ConflictException(`El producto con nombre '${dto.name}' ya existe`);
        }

        const product = new Product(
            this.generateId(),
            dto.name,
            dto.price,
            dto.description
        );

        return await this.repository.create(product);
    }

    async getProduct(id: string): Promise<Product> {
        this.validateId(id);
        
        const product = await this.repository.findById(id);
        if (!product) {
            throw new NotFoundException(`Producto con ID '${id}' no encontrado`);
        }

        return product;
    }

    async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
        this.validateId(id);
        this.validateUpdateDto(dto);

        const existingProduct = await this.repository.findById(id);
        if (!existingProduct) {
            throw new NotFoundException(`Producto con ID '${id}' no encontrado`);
        }

        if (dto.name && dto.name !== existingProduct.name) {
            const productWithName = await this.repository.findByName(dto.name);
            if (productWithName && productWithName.id !== id) {
                throw new ConflictException(`El nombre '${dto.name}' ya está en uso por otro producto`);
            }
        }

        const updateData: Partial<Product> = {};
        if (dto.name !== undefined) updateData.name = dto.name;
        if (dto.price !== undefined) updateData.price = dto.price;
        if (dto.description !== undefined) updateData.description = dto.description;

        return await this.repository.update(id, updateData);
    }

    async deleteProduct(id: string): Promise<void> {
        this.validateId(id);

        const existingProduct = await this.repository.findById(id);
        if (!existingProduct) {
            throw new NotFoundException(`Producto con ID '${id}' no encontrado`);
        }

        await this.repository.delete(id);
    }

    private validateCreateDto(dto: CreateProductDto): void {
        if (!dto.name || dto.name.trim().length === 0) {
            throw new BadRequestException('El nombre del producto es obligatorio');
        }

        if (dto.name.length > 100) {
            throw new BadRequestException('El nombre no puede exceder 100 caracteres');
        }

        if (dto.price === undefined || dto.price === null) {
            throw new BadRequestException('El precio es obligatorio');
        }

        if (typeof dto.price !== 'number' || dto.price < 0) {
            throw new BadRequestException('El precio debe ser un número positivo');
        }

        if (dto.price > 1000000) {
            throw new BadRequestException('El precio no puede exceder 1,000,000');
        }

        if (dto.description && dto.description.length > 500) {
            throw new BadRequestException('La descripción no puede exceder 500 caracteres');
        }
    }

    private validateUpdateDto(dto: UpdateProductDto): void {
        if (dto.name !== undefined) {
            if (dto.name.trim().length === 0) {
                throw new BadRequestException('El nombre del producto no puede estar vacío');
            }
            if (dto.name.length > 100) {
                throw new BadRequestException('El nombre no puede exceder 100 caracteres');
            }
        }

        if (dto.price !== undefined) {
            if (dto.price === null) {
                throw new BadRequestException('El precio no puede ser null');
            }
            if (typeof dto.price !== 'number' || dto.price < 0) {
                throw new BadRequestException('El precio debe ser un número positivo');
            }
            if (dto.price > 1000000) {
                throw new BadRequestException('El precio no puede exceder 1,000,000');
            }
        }

        if (dto.description !== undefined && dto.description.length > 500) {
            throw new BadRequestException('La descripción no puede exceder 500 caracteres');
        }
    }

    private validateId(id: string): void {
        if (!id || id.trim().length === 0) {
            throw new BadRequestException('El ID del producto es obligatorio');
        }
    }

    private generateId(): string {
        return `prod_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    }
}