import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from "@components/ui/card";
import { Header } from "./header";
import { Socials } from "./show-social";
import { MorphButton } from "./morph-button";
import React from "react";
import { 
  RegisterProps,
  LoginProps,
  CardWrapperProps
} from "@/types/auth-type";

export const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  showSocial,
  ...buttonProps
}: CardWrapperProps) => {
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