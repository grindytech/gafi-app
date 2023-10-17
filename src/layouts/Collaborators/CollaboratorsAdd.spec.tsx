import { render, renderHook } from '@testing-library/react';
import CollaboratorsAdd from './CollaboratorsAdd';
import { useState } from 'react';
import { TypeCollaboratorState } from 'types/collaborator.type';

describe('<CollaboratorsAdd />', () => {
  it('should render correctly text', () => {
    const account = {
      address: '5HC2BvrZTXc3DCxDVm6en2tn7iE8bzZnHA4gPEeM3sDL1TkW',
      name: 'bob',
    };

    const { result } = renderHook(() =>
      useState<TypeCollaboratorState>([{ account, role: 'Admin' }])
    );

    const [collaborators, setCollaborators] = result.current;

    const container = render(
      <CollaboratorsAdd
        account={account}
        collaborators={collaborators}
        setCollaborators={setCollaborators}
        options={['Admin']}
      />
    );

    expect(container.getByText(/Add collaborators/i)).toBeInTheDocument();
  });
});
