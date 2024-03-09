class Funcionario {
  constructor(nome, idade, cargo) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
  }

  seApresentar() {
    return `Olá, meu nome é ${this.nome} e eu trabalho como ${this.cargo}.`;
  }

  trabalhar() {
    return `${this.nome} está trabalhando em seu notebook.`;
  }
}

// Definição da classe Gerente, que herda de Funcionario
class Gerente extends Funcionario {
  constructor(nome, idade, cargo, departamento) {
    super(nome, idade, cargo);
    this.departamento = departamento;
  }

  gerenciar() {
    return `${this.nome} está gerenciando o departamento ${this.departamento}.`;
  }
}

// Definição da classe Desenvolvedor, que herda de Funcionario
class Desenvolvedor extends Funcionario {
  constructor(nome, idade, cargo, linguagem) {
    super(nome, idade, cargo);
    this.linguagem = linguagem;
  }

  programar() {
    return `${this.nome} está programando em ${this.linguagem}.`;
  }
}

// Criando instâncias de um gerente e um desenvolvedor
const gerente = new Gerente('Fernanda', 36, 'Gerente', 'TI');
const desenvolvedor = new Desenvolvedor('Ricardo', 30, 'Desenvolvedor', 'JavaScript');

// Chamando métodos apropriados para cada funcionário
console.log(gerente.seApresentar());
console.log(gerente.trabalhar());
console.log(gerente.gerenciar());

console.log(desenvolvedor.seApresentar());
console.log(desenvolvedor.trabalhar());
console.log(desenvolvedor.programar());

function exibirErro(mensagem) {
  const erroElement = document.getElementById('error');
  erroElement.textContent = mensagem;
  erroElement.style.display = 'block';
}
document.getElementById('position').addEventListener('change', function() {
  const departmentField = document.getElementById('department-field');
  const languageField = document.getElementById('language-field');
  const cargoInvalidoError = document.getElementById('cargo-invalido-error');
  
  if (this.value === 'Gerente') {
    departmentField.style.display = 'block';
    languageField.style.display = 'none';
    cargoInvalidoError.style.display = 'none';
  } else if (this.value === 'Desenvolvedor') {
    departmentField.style.display = 'none';
    languageField.style.display = 'block';
    cargoInvalidoError.style.display = 'none';
  } else {
    departmentField.style.display = 'none';
    languageField.style.display = 'none';
    cargoInvalidoError.style.display = 'block';
  }
});

document.getElementById('employee-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const cargo = document.getElementById('cargo').value;
  const departamento = document.getElementById('departamento').value;
  const linguagem = document.getElementById('linguagem').value;

  try {
    if (!nome || !idade || !cargo) {
      throw new Error('Por favor, preencha todos os campos obrigatórios!');
    }

    if (cargo === 'Gerente' && !departamento) {
      throw new Error("Por favor, preencha o campo 'Departamento'.");
    }

    if (cargo === 'Desenvolvedor' && !linguagem) {
      throw new Error("Por favor, preencha o campo 'Linguagem de Programação'.");
    }

    let funcionario;
    if (cargo === 'Gerente') {
      funcionario = new Gerente(nome, idade, cargo, departamento);
    } else if (cargo === 'Desenvolvedor') {
      funcionario = new Desenvolvedor(nome, idade, cargo, linguagem);
    } else {
      throw new Error('Cargo inválido.');
    }

    document.getElementById('output').innerHTML = `
      <p>${funcionario.seApresentar()}</p>
      <p>${funcionario.trabalhar()}</p>
      ${funcionario instanceof Gerente ? `<p>${funcionario.gerenciar()}</p>` : ''}
      ${funcionario instanceof Desenvolvedor ? `<p>${funcionario.programar()}</p>` : ''}
    `;

    document.getElementById('error').textContent = '';
  } catch (error) {
    exibirErro(error.message);
  }
});