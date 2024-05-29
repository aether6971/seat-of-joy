"use client";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Header } from "../../components/header";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { graphql } from "../../gql";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ForgotPasswordEmailMutationVariables } from "../../gql/graphql";
import { GQLClient } from "../../lib/query";
import { forgotPasswordESchema } from "../../lib/validation/forgotPassword";
import { useToast } from "../../components/ui/use-toast";

const registerMutation = graphql(`
  mutation ForgotPasswordEmail($email: String!) {
    sendForgotPasswordEmail(email: $email) {
      response {
        success
        errors {
          code
          path
          message
        }
      }
    }
  }
`);

type FormData = z.infer<typeof forgotPasswordESchema>;

export const ForgotPasswordForm = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordESchema),
  });
  const [userData, setUserData] =
    useState<ForgotPasswordEmailMutationVariables>();
  const [refetch, setRefetch] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: ["forgotPassword", userData],
    queryFn: async () => GQLClient.request(registerMutation, userData!),
    refetchOnWindowFocus: false,
    enabled: refetch,
  });

  const onSubmit = async (formdata: FormData, e: SubmitEvent) => {
    e.preventDefault();
    setUserData(formdata);
    setRefetch(true);
    if (data?.sendForgotPasswordEmail.response.success) {
      toast({
        title: "Successful",
        description:
          "Follow the instructions sent to your mail to change your password.",
      });
    } else {
      data?.sendForgotPasswordEmail.response.errors?.forEach((er) => {
        if (!["Email", "Password"].includes(er.path)) {
          toast({
            title: `${er.path} error`,
            description: er.message,
          });
        }
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit as any)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
              {!data?.sendForgotPasswordEmail.response.success &&
                data?.sendForgotPasswordEmail.response.errors?.map(
                  (err, i) =>
                    err.path == "Email" && (
                      <p className="px-1 text-xs text-red-600" key={i}>
                        {err.message}
                      </p>
                    )
                )}
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col w-full h-screen justify-start items-center">
      <Header invisible={false} sticky={false} />
      <div className="mt-16 w-2/5">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
