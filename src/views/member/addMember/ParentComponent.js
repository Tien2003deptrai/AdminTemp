import React from 'react';
import AddMember from './AddMember';

const ParentComponent = () => {
    const roleId = 'MANAGER';

    return (
        <div>
            <AddMember roleId={roleId} />
        </div>
    );
};

export default ParentComponent;
