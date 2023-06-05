"use client";

import { FC, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  GetOrganizationBySlugQuery,
  InviteToOrganizationInput,
  OrganizationMembershipsRolesEnum,
} from "@/../../@tacotacIO/codegen/dist";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
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
  const router = useRouter();
  const isSubmitting = isTransitionning || isLoading;
  const [error, setError] = useState<Error | null>(null);
  const [isInviting, setIsInviting] = useState(false);
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
      setIsInviting(false);
      toast({
        title: "Invitation envoyée",
        description: "L'utilisateur a été invité à rejoindre l'organisation",
      });
    });
  });

  return (
    <>
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
                {/*   <Badge>
                  {membership.role === OrganizationMembershipsRolesEnum.Admin
                    ? "admin"
                    : membership.role === OrganizationMembershipsRolesEnum.Owner
                    ? "boss"
                    : membership.role === OrganizationMembershipsRolesEnum.Host
                    ? "hôte"
                    : "autre"}
                </Badge> */}
                <Select
                  onValueChange={(value) => {
                    sdk()
                      .ChangeMembershipRole({
                        input: {
                          membershipId: membership.id,
                          role: value as OrganizationMembershipsRolesEnum,
                        },
                      })
                      .then(() => {
                        toast({
                          title: "Membre mis à jour",
                          description: "Le rôle du membre a été mis à jour",
                        });
                        router.refresh();
                      });
                  }}
                  value={membership.role}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={OrganizationMembershipsRolesEnum.Admin}>Admin</SelectItem>
                    <SelectItem value={OrganizationMembershipsRolesEnum.Owner}>Boss</SelectItem>
                    <SelectItem value={OrganizationMembershipsRolesEnum.Host}>Hôte</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => {
                    sdk()
                      .RemoveUserFromOrganization({
                        input: {
                          organizationId: organization.id,
                          userId: membership.user.id,
                        },
                      })
                      .then(() => {
                        toast({
                          title: "Membre retiré",
                          description: "L'utilisateur a été retiré de l'organisation",
                        });
                        router.refresh();
                      });
                  }}
                >
                  Retirer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className="admin-h2 mt-8">Invitations en attente</h2>
      <Dialog
        open={isInviting}
        onOpenChange={(open) => {
          setIsInviting(open);
        }}
      >
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
      <Table className="max-w-xl">
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Lien d&apos;invitation</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organization.organizationInvitations.nodes.map((invitation) => (
            <TableRow key={invitation.id}>
              <TableCell>{invitation.email}</TableCell>
              <TableCell>
                <Badge>
                  {invitation.role === OrganizationMembershipsRolesEnum.Admin
                    ? "admin"
                    : invitation.role === OrganizationMembershipsRolesEnum.Owner
                    ? "boss"
                    : invitation.role === OrganizationMembershipsRolesEnum.Host
                    ? "hôte"
                    : "autre"}
                </Badge>
              </TableCell>

              <TableCell>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      process.env.NEXT_PUBLIC_SITE_ENDPOINT +
                        "/invitation?id=" +
                        invitation.id +
                        "&code=" +
                        invitation.code
                    );
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="line-clamp-2">
                    {process.env.NEXT_PUBLIC_SITE_ENDPOINT +
                      "/invitation?id=" +
                      invitation.id +
                      "&code=" +
                      invitation.code}
                  </span>
                  <Copy className="h-4 w-4 flex-none" />
                </button>
              </TableCell>

              <TableCell>
                <Button
                  variant="outline"
                  onClick={async () => {
                    await sdk()
                      .CancelInvitation({
                        input: {
                          invitationId: invitation.id,
                        },
                      })
                      .then(() => {
                        toast({
                          title: "Invitation supprimée",
                          description: "L'invitation a été supprimée",
                        });
                        router.refresh();
                      });
                  }}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
