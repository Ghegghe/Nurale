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
    skillType: string
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
    name: string,
    typeOfPaymentId: number,
    note: string
  }

  export interface Supplier {
    id?: number
    name: string,
    typeOfPaymentId: number,
    note: string
  }
  export interface Resource {
    id?: number
    firstName: string,
    lastName: string,
    hourCost: number,
    hourRevenue: number,
    curriculumVitae: string,
    supplierId: number,
    note: string
  }

  export interface ResourceSkill {
    id?: number
    resourceId: number,
    resource?: {
      name: string
    }
    skillId: number,
    skill?: {
      name: string
    }
    level: number,
    note: string
  }

export interface PurchaseInvoiceActivity {
  purchasesInvoiceId: number,
  activityId: number,
  orderId: number,
  jobId: number,
  resourceId: number,
  quantity: number,
  value: number
}

  export interface Job {
    id?: number
    code: string
    description: string
    customerId: number
    startDate: Date
    endDate: Date
    jobType: string
    estimatedCost: number
    estimatedRevenue: number
    state: string
    note: string
  }

  export type Actions = 'Add' | 'Edit' | 'Delete' | 'Paginate' | 'Filter';