import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from "@components/ui/card";
import { Header } from "@components/auth/header";
import { Socials } from "@components/auth/show-social";
import { MorphButton } from "@components/auth/register-button";
import React from "react";

type CardWrapperProps = {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  showSocial?: boolean;
} & (
  | { register: string; registerHref: string }
  | { login: string; loginHref: string }
);

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

export const CardWrapper: React.FC<CardWrapperProps> = (props) => {
  const { children, headerTitle, headerLabel, showSocial} = props;
  
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
        {'register' in props ? 
          <MorphButton 
            label={props.register} 
            href={props.registerHref} 
          /> 
          : 
            <MorphButton 
            label={props.login} 
            href={props.loginHref} 
            />
        }
        </CardFooter>
    </Card>
  )

}