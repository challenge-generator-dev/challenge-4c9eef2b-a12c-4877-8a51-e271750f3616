import { ProductService } from '../src/services/product.service';
import { ProductRepository } from '../src/repositories/product.repository';
import { Product, CreateProductDto, UpdateProductDto } from '../src/models/product';

jest.mock('../src/repositories/product.repository');

describe('ProductService', () => {
  let service: ProductService;
  let mockRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
    
    service = new ProductService(mockRepository);
  });

  describe('createProduct', () => {
    it.skip('debería crear un producto con datos válidos', async () => {
      // given
      const dto: CreateProductDto = { name: 'New Product', price: 50, description: 'Description' };
      const expectedProduct: Product = { id: 'uuid-1', ...dto };
      mockRepository.create.mockResolvedValue(expectedProduct);

      // when
      const result = await service.createProduct(dto);

      // then
      expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining(dto));
      expect(result).toEqual(expectedProduct);
    });

    it.skip('debería lanzar error si el nombre está vacío', async () => {
      // given
      const dto: CreateProductDto = { name: '', price: 50 };

      // when & then
      await expect(service.createProduct(dto)).rejects.toThrow('Product name is required');
    });

    it.skip('debería lanzar error si el precio es negativo', async () => {
      // given
      const dto: CreateProductDto = { name: 'Test', price: -10 };

      // when & then
      await expect(service.createProduct(dto)).rejects.toThrow('Price must be positive');
    });

    it.skip('debería lanzar error si el precio es cero', async () => {
      // given
      const dto: CreateProductDto = { name: 'Test', price: 0 };

      // when & then
      await expect(service.createProduct(dto)).rejects.toThrow('Price must be positive');
    });
  });

  describe('getProduct', () => {
    it.skip('debería obtener un producto por id existente', async () => {
      // given
      const product: Product = { id: '123', name: 'Test', price: 100, description: 'Test' };
      mockRepository.findById.mockResolvedValue(product);

      // when
      const result = await service.getProduct('123');

      // then
      expect(mockRepository.findById).toHaveBeenCalledWith('123');
      expect(result).toEqual(product);
    });

    it.skip('debería retornar null si el producto no existe', async () => {
      // given
      mockRepository.findById.mockResolvedValue(null);

      // when
      const result = await service.getProduct('nonexistent');

      // then
      expect(result).toBeNull();
    });

    it.skip('debería lanzar error si el id está vacío', async () => {
      // when & then
      await expect(service.getProduct('')).rejects.toThrow('Product ID is required');
    });
  });

  describe('updateProduct', () => {
    it.skip('debería actualizar un producto existente', async () => {
      // given
      const updateData: UpdateProductDto = { name: 'Updated Name' };
      const updatedProduct: Product = { id: '123', name: 'Updated Name', price: 100, description: 'Test' };
      mockRepository.update.mockResolvedValue(updatedProduct);

      // when
      const result = await service.updateProduct('123', updateData);

      // then
      expect(mockRepository.update).toHaveBeenCalledWith('123', updateData);
      expect(result).toEqual(updatedProduct);
    });

    it.skip('debería retornar null si el producto no existe', async () => {
      // given
      mockRepository.update.mockResolvedValue(null);

      // when
      const result = await service.updateProduct('nonexistent', { name: 'Test' });

      // then
      expect(result).toBeNull();
    });

    it.skip('debería manejar actualización de precio negativo', async () => {
      // given
      const updateData: UpdateProductDto = { price: -50 };

      // when & then
      await expect(service.updateProduct('123', updateData)).rejects.toThrow('Price must be positive');
    });
  });

  describe('deleteProduct', () => {
    it.skip('debería eliminar un producto existente', async () => {
      // given
      mockRepository.delete.mockResolvedValue();

      // when
      await service.deleteProduct('123');

      // then
      expect(mockRepository.delete).toHaveBeenCalledWith('123');
    });

    it.skip('debería lanzar error si el producto no existe', async () => {
      // given
      mockRepository.delete.mockRejectedValue(new Error('Product not found'));

      // when & then
      await expect(service.deleteProduct('nonexistent')).rejects.toThrow('Product not found');
    });

    it.skip('debería lanzar error si el id está vacío', async () => {
      // when & then
      await expect(service.deleteProduct('')).rejects.toThrow('Product ID is required');
    });
  });
});