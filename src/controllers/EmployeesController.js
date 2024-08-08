const EmployeesRepository = require("../repository/EmployeesRepository");
const EmployeesService = require("../service/EmployeesService");
const employeesRepository = new EmployeesRepository();
const employeesService = new EmployeesService(employeesRepository);
class EmployeesController {
  async create(req, res) {
    const { name, email, password } = req.body;
    await employeesService.create({ name, email, password });
    return res.status(201).json();
  }
  async update(req, res) {
    const { name, email, password, role } = req.body;
    const { id } = req.params;
    const admin_id = req.user.id;
    await employeesService.update({
      id,
      admin_id,
      name,
      email,
      password,
      role,
    });
    return res.status(200).json();
  }
  async delete(req, res) {
    const { id } = req.params;
    const admin_id = req.user.id;
    const employee = await employeesService.delete(id, admin_id);

    console.log(employee);

    return res.status(204).json();
  }
  async index(req, res) {
    const { email, name, filter } = req.query;
    const admin_id = req.user.id;
    const employees = await employeesService.index({
      admin_id,
      email,
      name,
      filter,
    });
    return res.status(200).json(employees);
  }
  async show(req, res) {
    const { id } = req.params;
    const admin_id = req.user.id;
    const employee = await employeesService.show(id, admin_id);
    return res.status(200).json(employee);
  }
}

module.exports = EmployeesController;
