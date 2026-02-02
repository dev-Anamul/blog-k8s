import { Controller, Get, Param } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @HealthCheck()
  async getHealthStatus() {
    return this.appService.getHealthStatus();
  }

  @Get('create')
  async createTestArc() {
    return this.appService.createTestArc();
  }

  @Get('check')
  async checkCallingFrappeErpNextApi() {
    return this.appService.checkCallingFrappeErpNextApi();
  }

  @Get('frappe')
  async getFrappe() {
    return this.appService.callFrappeErpNextApi();
  }

  @Get('frappe/users')
  async getFrappeUsers() {
    return this.appService.getFrappeUsers();
  }

  @Get('frappe/users/:id')
  async getFrappeUser(@Param('id') id: string) {
    return this.appService.getFrappeUser(id);
  }
}
