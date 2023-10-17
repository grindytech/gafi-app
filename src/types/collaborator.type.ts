export type TypeCollaboratorRoles = 'Admin' | 'Freezer' | 'Issuer';

export type TypeCollaboratorState = {
  role: TypeCollaboratorRoles;
  account: {
    address: string;
    name: string;
  };
}[];
