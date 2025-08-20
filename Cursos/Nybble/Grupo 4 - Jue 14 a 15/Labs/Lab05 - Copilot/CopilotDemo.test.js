const { convertirClavesMinuscula } = require('./CopilotDemo');

test('convertirClavesMinuscula should convert object keys to lowercase', () => {
  const objeto = {
    Nombre: 'John',
    Edad: 30,
    Correo: 'john@example.com'
  };

  const objetoMinuscula = convertirClavesMinuscula(objeto);

  expect(objetoMinuscula).toEqual({
    nombre: 'John',
    edad: 30,
    correo: 'john@example.com'
  });
});

test('convertirClavesMinuscula should handle empty object', () => {
  const objeto = {};

  const objetoMinuscula = convertirClavesMinuscula(objeto);

  expect(objetoMinuscula).toEqual({});
});