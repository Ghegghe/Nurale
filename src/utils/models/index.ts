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

  export type Actions = 'Add' | 'Edit' | 'Delete';