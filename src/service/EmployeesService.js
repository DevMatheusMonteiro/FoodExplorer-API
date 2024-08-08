const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
class EmployeesService {
  constructor(employeesRepository) {
    this.employeesRepository = employeesRepository;
  }
  async create({ name, email, password }) {
    const checkUserExists = await this.employeesRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError("Email já cadastrado!");
    }
    const hashedPassword = await hash(password, 8);
    const employee_id = await this.employeesRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return employee_id;
  }
  async update({ id, admin_id, name, email, password, role }) {
    const employee = await this.employeesRepository.findById(id, admin_id);
    if (!employee) {
      throw new AppError("Funcionário não encontrado!", 404);
    }
    if (email) {
      const employeeUpdate = await this.employeesRepository.findByEmail(email);
      if (employeeUpdate && employeeUpdate.id != employee.id) {
        throw new AppError("Email já cadastrado!");
      }
    }
    if (role && role !== "employee" && role !== "admin") {
      throw new AppError(`Autorização inválida!`);
    }
    employee.name = name ?? employee.name;
    employee.role = role ?? employee.role;
    employee.email = email ?? employee.email;
    if (password) {
      const hashedPassword = await hash(password, 8);
      employee.password = hashedPassword;
    }
    const employee_id = await this.employeesRepository.update({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      password: employee.password,
      role: employee.role,
    });
    return employee_id;
  }
  async delete(id, admin_id) {
    const employee = await this.employeesRepository.findById(id, admin_id);
    if (!employee) {
      throw new AppError("Funcionário não encontrado", 404);
    }
    const employee_id = await this.employeesRepository.delete(id);
    return employee_id;
  }
  async index({ admin_id, email, name, filter }) {
    let employees;
    if (filter) {
      employees = await this.employeesRepository.findByNameEmailAndFilter({
        admin_id,
        name,
        email,
        filter,
      });
    } else {
      employees = await this.employeesRepository.findByNameAndEmail({
        admin_id,
        email,
        name,
      });
    }
    return employees;
  }
  async show(id, admin_id) {
    const employee = await this.employeesRepository.findById(id, admin_id);
    if (!employee) {
      throw new AppError("Funcionário não encontrado!", 404);
    }
    delete employee.password;
    return employee;
  }
}
module.exports = EmployeesService;
