import { faker } from '@faker-js/faker'
import { Employee } from './models/employee.model'

export class EmployeeFactory {
  static createEmployee(deletedChangePerc: number = 20): Employee {
    const updatedAt = faker.date.past()
    const deleted = Math.random() < deletedChangePerc / 100
    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dob: faker.date.birthdate(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: `${faker.location.street()} ${faker.location.buildingNumber()}`,
      city: faker.location.city(),
      postalCode: faker.location.zipCode(),
      country: faker.location.country(),
      updatedAt,
      createdAt: faker.date.past({ refDate: updatedAt }),
      deletedAt: deleted ? faker.date.between({ from: updatedAt, to: new Date() }) : null, // 20% change of being deleted, date set between updatedat and now
    }
  }

  static createEmployees(count: number): Employee[] {
    const employees = []
    for (let i = 0; i < count; i++) {
      employees.push(this.createEmployee())
    }
    return employees
  }
}
