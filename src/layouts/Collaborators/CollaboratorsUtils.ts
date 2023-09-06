export type TypeCollaboratorsRole = 'Admin' | 'Freezer' | 'Issuer';

export type TypeCollaboratorsState = {
  role: TypeCollaboratorsRole;
  account: { address: string; name: string };
}[];
