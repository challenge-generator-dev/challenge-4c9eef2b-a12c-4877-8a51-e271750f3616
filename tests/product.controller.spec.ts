import { Request, Response } from 'express';
import { ProductController } from '../src/controllers/product.controller';
import { ProductService } from '../src/services/product.service';

jest.mock('../src/services/product.service');

describe('ProductController', () => {
  let controller: ProductController;
  let mockService: jest.Mocked<ProductService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    mockService = {
      createProduct: jest.fn(),
      getProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    } as any;
    
    controller = new ProductController(mockService);
    
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    
    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };
    
    mockRequest = {
      body: {},
      params: {},
    };
  });

  describe('createProduct', () => {
    it.skip('debería crear un producto exitosamente', async () => {
      // given
      const productData = { name: 'Test Product', price: 100, description: 'Test description' };
      const createdProduct = { id: '123', ...productData };
      mockRequest.body = productData;
      mockService.createProduct.mockResolvedValue(createdProduct);

      // when
      await controller.createProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(mockService.createProduct).toHaveBeenCalledWith(productData);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(createdProduct);
    });

    it.skip('debería manejar error de validación', async () => {
      // given
      mockRequest.body = { name: '', price: -10 };
      mockService.createProduct.mockRejectedValue(new Error('Validation error'));

      // when
      await controller.createProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(statusMock).toHaveBeenCalledWith(400);
    });
  });

  describe('getProduct', () => {
    it.skip('debería obtener un producto por id', async () => {
      // given
      const product = { id: '123', name: 'Test', price: 100, description: 'Test' };
      mockRequest.params = { id: '123' };
      mockService.getProduct.mockResolvedValue(product);

      // when
      await controller.getProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(mockService.getProduct).toHaveBeenCalledWith('123');
      expect(jsonMock).toHaveBeenCalledWith(product);
    });

    it.skip('debería retornar 404 si el producto no existe', async () => {
      // given
      mockRequest.params = { id: 'nonexistent' };
      mockService.getProduct.mockResolvedValue(null);

      // when
      await controller.getProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(statusMock).toHaveBeenCalledWith(404);
    });
  });

  describe('updateProduct', () => {
    it.skip('debería actualizar un producto existente', async () => {
      // given
      const updateData = { name: 'Updated Name' };
      const updatedProduct = { id: '123', name: 'Updated Name', price: 100, description: 'Test' };
      mockRequest.params = { id: '123' };
      mockRequest.body = updateData;
      mockService.updateProduct.mockResolvedValue(updatedProduct);

      // when
      await controller.updateProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(mockService.updateProduct).toHaveBeenCalledWith('123', updateData);
      expect(jsonMock).toHaveBeenCalledWith(updatedProduct);
    });

    it.skip('debería retornar 404 si el producto no existe para actualizar', async () => {
      // given
      mockRequest.params = { id: 'nonexistent' };
      mockRequest.body = { name: 'Updated' };
      mockService.updateProduct.mockResolvedValue(null);

      // when
      await controller.updateProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(statusMock).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteProduct', () => {
    it.skip('debería eliminar un producto exitosamente', async () => {
      // given
      mockRequest.params = { id: '123' };
      mockService.deleteProduct.mockResolvedValue();

      // when
      await controller.deleteProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(mockService.deleteProduct).toHaveBeenCalledWith('123');
      expect(statusMock).toHaveBeenCalledWith(204);
    });

    it.skip('debería manejar error al eliminar producto inexistente', async () => {
      // given
      mockRequest.params = { id: 'nonexistent' };
      mockService.deleteProduct.mockRejectedValue(new Error('Product not found'));

      // when
      await controller.deleteProduct(mockRequest as Request, mockResponse as Response);

      // then
      expect(statusMock).toHaveBeenCalledWith(404);
    });
  });
});