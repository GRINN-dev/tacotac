"use client";

import { FC, useState, useTransition } from "react";
import {
  GetOrganizationBySlugQuery,
  InviteToOrganizationInput,
  OrganizationMembershipsRolesEnum,
} from "@/../../@tacotacIO/codegen/dist";
import { toast } from "@/hooks/use-toast";
import { Controller, useForm } from "react-hook-form";

import { sdk } from "@/lib/sdk";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Members: FC<{ organization: GetOrganizationBySlugQuery["organizationBySlug"] }> = ({ organization }) => {
  const { register, handleSubmit, formState, control } = useForm<InviteToOrganizationInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitionning, startTransition] = useTransition();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await sdk()
      .InviteUserToOrganization({
        input: {
          organizationId: organization.id,
          email: data.email,
          role: data.role,
        },
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
        throw error;
      });
    setIsLoading(false);
    startTransition(() => {
      toast({
        title: "Invitation envoyée",
        description: "L'utilisateur a été invité à rejoindre l'organisation",
      });
    });
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Inviter un membre</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Inviter un membre</DialogHeader>
          <form onSubmit={onSubmit} className={cn("mt-4 ", isSubmitting && "animate-pulse")}>
            <div className="mt-4 grid  items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="
                Email"
                {...register("email", {
                  required: "Un email est requis",
                })}
              />
              {formState.errors?.email && (
                <span className="text-destructive-foreground text-sm">{formState.errors?.email.message}</span>
              )}
            </div>
            <div className="mt-4 grid  items-center gap-1.5">
              <Label htmlFor="role">Role</Label>
              <Controller
                control={control}
                name="role"
                render={({ field: { onChange, onBlur, value, ref, name } }) => (
                  <Select value={value} onValueChange={(e) => onChange(e)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={OrganizationMembershipsRolesEnum.Admin}>Admin</SelectItem>
                      <SelectItem value={OrganizationMembershipsRolesEnum.Host}>Hôte</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {formState.errors?.role && (
                <span className="text-destructive-foreground text-sm">{formState.errors?.role.message}</span>
              )}
            </div>
            <div className="mt-4 grid  items-center gap-1.5">
              <Button type="submit">Envoyer</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Table className="mt-8 max-w-xl">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organization.organizationMemberships.nodes.map((membership) => (
            <TableRow key={membership.id}>
              <TableCell className="font-medium">
                {membership.user.firstname} {membership.user.lastname}
              </TableCell>
              <TableCell>{membership.user.email}</TableCell>
              <TableCell>
                <Badge>
                  {membership.role === OrganizationMembershipsRolesEnum.Admin
                    ? "admin"
                    : membership.role === OrganizationMembershipsRolesEnum.Owner
                    ? "boss"
                    : membership.role === OrganizationMembershipsRolesEnum.Host
                    ? "hôte"
                    : "autre"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
