import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckService, HttpHealthIndicator, MongooseHealthIndicator } from '@nestjs/terminus';
import { catchError, map, of } from 'rxjs';
import { EnvConfig } from './lib/zod';

@Injectable()
export class AppService {
  secret: '318d3f2d561273c';
  apiKey: '8ff28f9ad49f075';

  localSecret: '332cd2547e2ce3a';
  localApiKey: 'ba7a5736df46b1e';

  constructor(
    private httpService: HttpService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private mongooseHealth: MongooseHealthIndicator,
    private config: ConfigService<EnvConfig>,
  ) {}

  async getHealthStatus(): Promise<any> {
    // check the health of the server
    const healthCheckResult = await this.health.check([
      async () => this.http.pingCheck('server', `http://localhost:3000/api-docs`),
      async () => this.mongooseHealth.pingCheck('mongodb'),
    ]);

    return healthCheckResult;
  }

  getRemoteErpNextApiUrl() {
    return `https://mark-erp.arcapps.org`;
  }

  getLocalErpNextApiUrl() {
    return `http://excel_erpnext.localhost:8000`;
  }

  async createTestArc() {
    const url = `${this.getRemoteErpNextApiUrl()}/api/resource/Test%20Arc`;
    const response = await this.httpService.axiosRef.post(
      url,
      {
        name: 'Test Arc',
        email: 'test@test.com',
        phone: '1234567890',
      },
      {
        headers: {
          Authorization: `token bf093064c5d0365:72b0eb742a265df`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  }

  getAuthToken() {
    const token = Buffer.from(`${this.localApiKey}:${this.localSecret}`).toString('base64');
    return `Basic ${token}`;
  }

  getLocalAuthToken() {
    return `token ${this.localApiKey}:${this.localSecret}`;
  }

  getRemoteAuthToken() {
    return `token ${this.apiKey}:${this.secret}`;
  }

  // * Running on http://127.0.0.1:8000
  // * Running on http://172.20.0.5:8000

  async checkCallingFrappeErpNextApi() {
    try {
      const url = `http://host.docker.internal:8000/api/resource/User`;
      const response = await this.httpService.axiosRef.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: this.getLocalAuthToken(),
          'X-Frappe-Site-Name': 'excel_erpnext.localhost',
        },
      });
      return response.data; // Ensure you're returning the correct data
    } catch (error) {
      console.error('Error making API call:', error);
      throw new HttpException('Failed to fetch data from the API', HttpStatus.BAD_REQUEST);
    }
  }

  // call frappe erp next api
  async callFrappeErpNextApi() {
    console.log(this.getLocalAuthToken());

    try {
      const url = `${this.getLocalErpNextApiUrl()}/api/resource/User`;
      this.httpService
        .get(url, {
          headers: {
            Authorization: this.getLocalAuthToken(),
            'Content-Type': 'application/json',
            'X-Frappe-Site-Name': 'frappe',
            Accept: 'application/json',
          },
        })
        .pipe(
          map((res) => res.data),
          catchError((err) => of(err)),
        )
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error);
          },
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getFrappeUsers() {
    const url = `${this.getRemoteErpNextApiUrl()}/api/resource/User`;
    const response = await this.httpService.axiosRef.get(url, {
      headers: {
        Authorization: this.getRemoteAuthToken(),
      },
    });
    return response.data;
  }

  async getFrappeUser(id: string) {
    const url = `${this.getRemoteErpNextApiUrl()}/api/resource/User/${id}`;
    const response = await this.httpService.axiosRef.get(url, {
      headers: {
        Authorization: this.getRemoteAuthToken(),
      },
    });
    return response.data;
  }
}
