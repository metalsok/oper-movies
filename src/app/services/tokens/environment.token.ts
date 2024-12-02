import { InjectionToken } from '@angular/core';
import { Environment } from '../../models/environment.interface';

export const ENVIRONMENT = new InjectionToken<Environment>('Environment');
