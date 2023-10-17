import { render, screen } from '@testing-library/react';
import CollaboratorsRoleSwitch from './CollaboratorsRoleSwitch';
import { TypeCollaboratorRoles } from 'types/collaborator.type';

describe('<CollaboratorsRoleSwitch />', () => {
  it('should render 3 roles ("Admin" | "Freezer" | "Issuer")', () => {
    const collaborators: TypeCollaboratorRoles[] = [
      'Admin',
      'Freezer',
      'Issuer',
    ];

    render(
      <CollaboratorsRoleSwitch
        options={collaborators}
        index={0}
        roleOf="Admin"
        setCollaborators={() => {}}
      />
    );

    collaborators.forEach(role =>
      expect(screen.getByText(role)).toBeInTheDocument()
    );
  });

  it('should render 1 roles ("Admin"', () => {
    render(
      <CollaboratorsRoleSwitch
        options={['Admin']}
        index={0}
        roleOf="Admin"
        setCollaborators={() => {}}
      />
    );

    expect(screen.getByText('Admin')).toBeInTheDocument();
  });
});
