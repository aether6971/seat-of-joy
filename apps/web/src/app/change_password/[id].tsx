"use client";
import { useRouter } from "next/router";
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
import { GQLClient } from "../../lib/query";
import { changePasswordSchema } from "../../lib/validation/changePassword";
import { ForgotPasswordChangeMutationVariables } from "../../gql/graphql";
import { useToast } from "../../components/ui/use-toast";

const passwordChangeMutation = graphql(`
  mutation ForgotPasswordChange($newPassword: String!, $key: String!) {
    forgotPasswordChange(newPassword: $newPassword, key: $key) {
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

type FormData = z.infer<typeof changePasswordSchema>;

export const ChangePasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(changePasswordSchema),
  });
  const [userData, setUserData] =
    useState<ForgotPasswordChangeMutationVariables>();
  const [refetch, setRefetch] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: ["register", userData],
    queryFn: async () => GQLClient.request(passwordChangeMutation, userData!),
    refetchOnWindowFocus: false,
    enabled: refetch,
  });

  const onSubmit = async (formdata: FormData, e: SubmitEvent) => {
    e.preventDefault();
    setUserData({
      newPassword: formdata.password,
      key: router.query.slug as string,
    });
    setRefetch(true);
    if (data?.forgotPasswordChange.response.success) {
      toast({
        title: "Password Changed Successfully",
        description: "You password has been changed successfully.",
      });
    } else {
      data?.forgotPasswordChange.response.errors?.forEach((er) => {
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
        <CardTitle className="text-2xl">Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit as any)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />
              {errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
              {!data?.forgotPasswordChange.response.success &&
                data?.forgotPasswordChange.response.errors?.map(
                  (err, i) =>
                    err.path == "Password" && (
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

export default function ChangePasswordPage() {
  return (
    <div className="flex flex-col w-full h-screen justify-start items-center">
      <Header invisible={false} sticky={false} />
      <div className="mt-16 w-2/5">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
