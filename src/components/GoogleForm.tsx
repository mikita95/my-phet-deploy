import React from 'react';

const GoogleForm: React.FC<{ src: string }> = ({ src }) => (
    <div className="form-panel">
        <iframe src={src} title="Google Form" />
    </div>
);

export default GoogleForm;
