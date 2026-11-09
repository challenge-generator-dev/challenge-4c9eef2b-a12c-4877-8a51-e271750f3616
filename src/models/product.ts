import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { Expose } from 'class-transformer';

export class Product {
    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsNumber()
    @Min(0)
    price: number;

    @Expose()
    @IsString()
    @IsOptional()
    description?: string;

    constructor(id: string, name: string, price: number, description?: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;
}