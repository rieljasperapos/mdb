import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from "@components/ui/card";
import { Header } from "@components/auth/header";
import { Socials } from "@components/auth/show-social";
import { MorphButton } from "@components/auth/morph-button";
import React from "react";

type RegisterProps = {
  register: string;
  registerHref: string;
};

type LoginProps = {
  login: string;
  loginHref: string;
};

type CardWrapperProps = {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  showSocial?: boolean;
} & (RegisterProps | LoginProps);

// interface CardWrapperProps {
//   children: React.ReactNode;
//   headerTitle: string;
//   headerLabel: string;
//   showSocial?: boolean;
//   register: string;
//   registerHref: string;
//   login: string;
//   loginHref: string;
// }

export const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  showSocial,
  ...buttonProps
}: CardWrapperProps) => {
  // const { children, headerTitle, headerLabel, showSocial} = props;
  const { register, registerHref, login, loginHref } = buttonProps as RegisterProps & LoginProps;
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header
          headerTitle={headerTitle}
          headerLabel={headerLabel}
        />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
      <CardFooter className="flex justify-center">
        {'register' in buttonProps ? 
          <MorphButton 
            label={register} 
            href={registerHref} 
          /> 
          : 
            <MorphButton 
            label={login} 
            href={loginHref} 
            />
        }
        </CardFooter>
    </Card>
  )

}