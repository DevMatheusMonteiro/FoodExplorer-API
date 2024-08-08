const knex = require("../database/knex");
class EmployeesRepository {
  async findByEmail(email) {
    const employee = await knex("users").where({ email }).first();
    return employee;
  }
  async findByNameAndEmail({ admin_id, email, name }) {
    const employees = await knex("users")
      .select("id", "email", "name", "role")
      .whereNot({ id: admin_id })
      .whereNot({ role: "customer" })
      .whereLike("email", `%${email}%`)
      .whereLike("name", `%${name}%`)
      .orderBy("name");

    return employees;
  }
  async findByNameEmailAndFilter({ admin_id, name, email, filter }) {
    const employees = await knex("users")
      .select("id", "email", "name", "role")
      .whereNot({ id: admin_id })
      .where({ role: filter })
      .whereLike("email", `%${email}%`)
      .whereLike("name", `%${name}%`)
      .orderBy("name");
    return employees;
  }
  async findById(id, admin_id) {
    const employee = await knex("users")
      .where({ id })
      .whereNot({ id: admin_id })
      .whereNot({ role: "customer" })
      .first();
    return employee;
  }
  async create({ name, email, password }) {
    const [employee_id] = await knex("users").insert({
      name,
      email,
      password,
      role: "employee",
    });

    return { id: employee_id };
  }
  async update({ id, name, email, password, role }) {
    const [employee_id] = await knex("users")
      .update(
        {
          name,
          email,
          password,
          role,
          updated_at: knex.fn.now(),
        },
        ["id"]
      )
      .where({ id });
    return employee_id;
  }
  async delete(id) {
    await knex("users").where({ id }).delete();
    return id;
  }
}
module.exports = EmployeesRepository;
