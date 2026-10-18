const { UserService } = require('../src/userService');

describe('UserService - testes refatorados', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });

  describe('createUser', () => {
    test('cria um usuário adulto com status ativo', () => {
      // Arrange
      const dados = { nome: 'Fulano de Tal', email: 'fulano@teste.com', idade: 25 };

      // Act
      const usuario = userService.createUser(dados.nome, dados.email, dados.idade);

      // Assert
      expect(usuario).toEqual(expect.objectContaining({
        nome: dados.nome,
        email: dados.email,
        idade: dados.idade,
        isAdmin: false,
        status: 'ativo',
      }));
      expect(usuario.id).toEqual(expect.any(String));
      expect(usuario.createdAt).toEqual(expect.any(Date));
    });

    test('rejeita usuário menor de idade', () => {
      // Arrange
      const idadeMinimaInvalida = 17;

      // Act / Assert
      expect(() => userService.createUser('Menor', 'menor@email.com', idadeMinimaInvalida))
        .toThrow('O usuário deve ser maior de idade.');
    });

    test.each([
      ['nome', '', 'usuario@email.com', 25],
      ['email', 'Usuario', '', 25],
      ['idade', 'Usuario', 'usuario@email.com', 0],
    ])('rejeita cadastro sem %s', (_campo, nome, email, idade) => {
      // Arrange
      // Os dados de cada cenário são definidos na tabela acima.

      // Act / Assert
      expect(() => userService.createUser(nome, email, idade))
        .toThrow('Nome, email e idade são obrigatórios.');
    });
  });

  describe('getUserById', () => {
    test('retorna o usuário cadastrado para um ID existente', () => {
      // Arrange
      const criado = userService.createUser('Alice', 'alice@email.com', 28);

      // Act
      const encontrado = userService.getUserById(criado.id);

      // Assert
      expect(encontrado).toBe(criado);
    });

    test('retorna null para um ID inexistente', () => {
      // Arrange
      const idInexistente = 'id-inexistente';

      // Act
      const encontrado = userService.getUserById(idInexistente);

      // Assert
      expect(encontrado).toBeNull();
    });
  });

  describe('deactivateUser', () => {
    test('desativa um usuário comum', () => {
      // Arrange
      const usuario = userService.createUser('Comum', 'comum@email.com', 30);

      // Act
      const resultado = userService.deactivateUser(usuario.id);

      // Assert
      expect(resultado).toBe(true);
      expect(userService.getUserById(usuario.id).status).toBe('inativo');
    });

    test('não desativa um administrador', () => {
      // Arrange
      const administrador = userService.createUser('Admin', 'admin@email.com', 40, true);

      // Act
      const resultado = userService.deactivateUser(administrador.id);

      // Assert
      expect(resultado).toBe(false);
      expect(userService.getUserById(administrador.id).status).toBe('ativo');
    });

    test('retorna false quando o usuário não existe', () => {
      // Arrange
      const idInexistente = 'id-inexistente';

      // Act
      const resultado = userService.deactivateUser(idInexistente);

      // Assert
      expect(resultado).toBe(false);
    });
  });

  describe('generateUserReport', () => {
    test('informa que não há usuários quando a base está vazia', () => {
      // Arrange
      // A base é limpa no beforeEach.

      // Act
      const relatorio = userService.generateUserReport();

      // Assert
      expect(relatorio).toContain('Nenhum usuário cadastrado.');
    });

    test('inclui nome e status do usuário no relatório', () => {
      // Arrange
      userService.createUser('Alice', 'alice@email.com', 28);

      // Act
      const relatorio = userService.generateUserReport();

      // Assert
      expect(relatorio).toContain('Nome: Alice');
      expect(relatorio).toContain('Status: ativo');
    });
  });
});
