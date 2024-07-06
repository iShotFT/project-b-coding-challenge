import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { EmployeesService } from './employees.service'
import { Employee } from './models/employee.model'
import { NewEmployeeInput } from './input/new-employee.args'
import { UpdateEmployeeInput } from './input/update-employee.args'

@Resolver(of => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Query(returns => [Employee])
  async employees(): Promise<Employee[]> {
    return this.employeesService.findAll()
  }

  @Query(returns => Employee)
  async employee(
    @Args('id', ParseUUIDPipe) // ParseUUIDPipe is used because it has an explicition validation error message
    id: string,
  ): Promise<Employee | null> {
    return this.employeesService.findOneById(id)
  }

  @Mutation(returns => Employee)
  async createEmployee(@Args('data', new ValidationPipe()) data: NewEmployeeInput): Promise<Employee> {
    const createdEmployee = await this.employeesService.create(data);
    return createdEmployee;
  }

  @Mutation(returns => Employee)
  async updateEmployee(@Args('data', new ValidationPipe()) data: UpdateEmployeeInput): Promise<Employee> {
    const createdEmployee = await this.employeesService.update(data);
    return createdEmployee;
  }

  @Mutation(returns => Employee)
  async deleteEmployee(@Args('id', ParseUUIDPipe) id: string): Promise<Employee> {
    const deletedEmployee = await this.employeesService.delete(id);
    return deletedEmployee;
  }
}
