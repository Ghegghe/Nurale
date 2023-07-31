export interface LoginInterface {
  email: string
  password: string
}
export interface JwtTokenDecoded {
  role: ROLE;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: {
    identities: {
      email: string[];
    };
    sign_in_provider: string;
  };
}

export type ROLE = 'ADMIN' | 'USER';

export interface SwitchElement {
  offColor: string;
  onColor: string;
  offBGColor: string;
  onBGColor: string;
  innerSize: number;
  strokeSize: number;
  width: number;
  state?: boolean;
  rtl?: boolean;
}

export interface User {
  id?: number
  email?: string
  password?: string
  passwordConfirm?: string
  lastName: string
  firstName: string
  phone?: string
  requiredActions?: string[]
  realmRoles?: string[]
  resourceIs?: number
  hasDarkTheme?: boolean
}

export interface Skill {
  id?: number
  name: string
  skillType: SkillTypes
  note: string
}

export interface TypeOfPayment {
  id?: number
  name: string
  daysToFirstPayment: number | null
  daysBetweenPayments: number | null
  numberOfPayments: number | null
  movePaymentsToTheEndOfMonth: boolean | null
  daysOffsetPayments: number | null
  note: string
}

export interface Customer {
  id?: number
  name: string
  typeOfPaymentId: number
  note: string
}

export interface Supplier {
  id?: number
  name: string
  typeOfPaymentId: number
  note: string
}

export interface Resource {
  id?: number
  firstName: string
  lastName: string
  hourCost: number
  hourRevenue: number
  curriculumVitae: string
  supplierId: number
  note: string
}

export interface ResourceSkill {
  id?: number
  resourceId: number
  resource?: {
    name: string
  }
  skillId: number
  skill?: {
    name: string
  }
  level: number
  note: string
}

export interface PurchaseInvoice {
  id?: number
  supplierId: number
  operationDate: Date
  code: string
  netValue: number
  vatValue: number
  grossValue: number
  scheduledValueId: number
  valueCategory: string
  typeOfPaymentId: number
  state: string
  note: string
  quantity: number
  value: number
}

export interface PurchaseInvoiceActivity {
  id?: number
  purchasesInvoiceId: number
  activityId: number
  orderId: number
  jobId: number
  resourceId: number
  quantity: number
  value: number
}

export interface SaleInvoice {
  id?: number
  customerId: number,
  typeOfPaymentId: number,
  date: Date,
  code: string,
  netValue: number,
  vatValue: number,
  grossValue: number,
  state: string,
  scheduledValueId: number,
  note: string
}

export interface Job {
  id?: number
  code: string,
  description: string,
  customerId: number,
  startDate: Date,
  endDate: Date,
  jobType: string,
  estimatedCost: number,
  estimatedRevenue: number,
  state: string,
  note: string
}

export interface KeyValue {
  id: number | string,
  description: string | number
}

export type SkillTypes = 'Frontend' | 'Backend' | 'Desgner' | 'Administrator' | 'Other' | null
export type Actions = 'Add' | 'Edit' | 'Delete' | 'Paginate' | 'Filter';
export const SelectSkillOptions: KeyValue[] = [
  {id: 'Frontend', description: 'Frontend'},
  {id: 'Backend', description: 'Backend'},
  {id: 'Designer', description: 'Designer'},
  {id: 'Administrator', description: 'Andimistrator'},
  {id: 'Other', description: 'Other'}
]