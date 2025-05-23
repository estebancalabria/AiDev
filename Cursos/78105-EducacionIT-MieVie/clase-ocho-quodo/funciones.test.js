const calcularDescuento = require('./funciones');


describe('calcularDescuento', () => {

    // Calculate correct discounted price when valid price and percentage are provided
    it('should return the correct discounted price when valid price and percentage are provided', () => {
      // Arrange
      const precio = 100;
      const porcentaje = 20;
      const expectedResult = 80;
  
      // Act
      const result = calcularDescuento(precio, porcentaje);
  
      // Assert
      expect(result).toBe(expectedResult);
    });

    // Throw error when price parameter is missing or null
    it('should throw an error when price parameter is missing or null', () => {
      // Arrange
      const porcentaje = 20;
  
      // Act & Assert
      expect(() => {
        calcularDescuento(null, porcentaje);
      }).toThrow("Los argumentos son obligatorios.");
  
      expect(() => {
        calcularDescuento(undefined, porcentaje);
      }).toThrow("Los argumentos son obligatorios.");
    });

    // Return the original price when percentage is 0
    it('should return the original price when percentage is 0', () => {
      const precio = 100;
      const porcentaje = 0;
      const resultado = calcularDescuento(precio, porcentaje);
      expect(resultado).toBe(100);
    });

    // Calculate discount for decimal/float price values
    it('should calculate discount for decimal price values', () => {
      const precio = 99.99;
      const porcentaje = 10;
      const resultado = calcularDescuento(precio, porcentaje);
      expect(resultado).toBeCloseTo(89.991);
    });

    // Calculate discount for decimal/float percentage values
    it('should calculate discount for decimal percentage values', () => {
      const precio = 100;
      const porcentaje = 12.5;
      const resultado = calcularDescuento(precio, porcentaje);
      expect(resultado).toBeCloseTo(87.5);
    });
});
