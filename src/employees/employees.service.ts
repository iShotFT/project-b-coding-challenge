import { Injectable } from '@nestjs/common'
import { EmployeeFactory } from './employees.factory'
import { faker } from '@faker-js/faker'
import { Employee } from './models/employee.model'
import { NewEmployeeInput } from './input/new-employee.args'
import { UpdateEmployeeInput } from './input/update-employee.args'
import { EmailsService } from 'src/emails/emails.service'

@Injectable()
export class EmployeesService {
  private readonly employees: Array<Employee> = []

  constructor(private readonly emailsService: EmailsService) {
    this.employees = EmployeeFactory.createEmployees(10) // Create some dummy data
  }

  async create(data: NewEmployeeInput): Promise<Employee> {
    if (!data.id) data.id = faker.string.uuid(); // We allow manually setting the ID on creation, don't expect this to be used in production but can be a useful feature for testing or reconnecting removed users to their data
    const employee = Employee.create(data);

    if (this.employees.find(employee => employee.id === data.id)) throw new Error('Employee already exists'); // Because we all the ID to be set manually we need to check if it already exists
    this.employees.push(employee)

    await this.emailsService.sendEmail({ to: employee.email, fullName: `${employee.firstName} ${employee.lastName}`, type: 'newEmployee'})

    return employee;
  }

  async update(data: UpdateEmployeeInput): Promise<Employee> {
    const employee = this.employees.find(employee => employee.id === data.id);
    if (!employee) throw new Error('Employee not found');

    Object.assign(employee, data);
    employee.updatedAt = new Date();
    return employee;
  }

  // Chose to go for soft delete, this way we can still keep the data for future reference, heavily depends on the use case
  async delete(id: string): Promise<Employee> {
    const employee = this.employees.find(employee => employee.id === id);
    if (!employee) throw new Error('Employee not found');
    if (employee.deletedAt) return employee; // Already deleted

    employee.deletedAt = new Date();
    return employee;
  }

  async findAll(): Promise<Employee[]> {
    return this.employees.filter(employee => !employee.deletedAt);
  }

  async findOneById(id: string): Promise<Employee> {
    const employee = this.employees.find(employee => employee.id === id);
    if (!employee) throw new Error('Employee not found');
    return employee;
  }
}
