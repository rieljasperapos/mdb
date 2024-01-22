export type RegisterProps = {
  register: string;
  registerHref: string;
};

export type LoginProps = {
  login: string;
  loginHref: string;
};

export type CardWrapperProps = {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  showSocial?: boolean;
} & (RegisterProps | LoginProps);

export interface CardHeaderProps {
  headerTitle: string;
  headerLabel: string;
}

export interface MorphButtonProps {
  label: string;
  href: string;
}

export interface FormStatusProps {
  message: string;
}