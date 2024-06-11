export interface SearchFormData {
  search: string;
  page: number;
  category: string;
  language: string;
  tag: string;
}

export interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  images: FileList | null;
}

export interface CheckoutFormData {
  full_name: string;
  email: string;
  street: string;
  house_no: string;
  postcode: string;
  city: string;
  country: string;
  privacy: boolean;
  sale: boolean;
}
