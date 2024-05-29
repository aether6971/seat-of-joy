"use client";
import Link from "next/link";

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
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../lib/validation/login";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { graphql } from "../../gql";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoginMutationVariables } from "../../gql/graphql";
import { GQLClient } from "../../lib/query";
import { useToast } from "../../components/ui/use-toast";

const loginMutation = graphql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

type FormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const [userData, setUserData] = useState<LoginMutationVariables>();
  const [refetch, setRefetch] = useState<boolean>(false);
  const { data } = useQuery({
    queryKey: ["login", userData],
    queryFn: async () => GQLClient.request(loginMutation, userData!),
    refetchOnWindowFocus: false,
    enabled: refetch,
  });

  const onSubmit = async (formdata: FormData, e: SubmitEvent) => {
    e.preventDefault();
    setUserData(formdata);
    setRefetch(true);
    if (data?.login.response.success) {
      toast({
        title: "Login Successful",
        description:
          "You are now logged in and can proceed with your shopping.",
      });
    } else {
      data?.login.response.errors?.forEach((er) => {
        if (!["Email", "Password", "Username"].includes(er.path)) {
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
        <CardTitle className="text-2xl">Login</CardTitle>
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
              {!data?.login.response.success &&
                data?.login.response.errors?.map(
                  (err, i) =>
                    err.path == "Email" && (
                      <p className="px-1 text-xs text-red-600" key={i}>
                        {err.message}
                      </p>
                    )
                )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot_password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
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
              {!data?.login.response.success &&
                data?.login.response.errors?.map(
                  (err, i) =>
                    err.path == "Password" && (
                      <p className="px-1 text-xs text-red-600" key={i}>
                        {err.message}
                      </p>
                    )
                )}
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/google`);
              }}
            >
              Login with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full h-screen justify-start items-center">
      <Header invisible={false} sticky={false} />
      <div className="mt-16 w-2/5">
        <LoginForm />
      </div>
    </div>
  );
}
