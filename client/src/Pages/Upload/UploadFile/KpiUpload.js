import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const KpiUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSubmit = () => {
        // Handle KPI file upload
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
                type="file"
                label="KPI File"
                onChange={handleFileChange}
                variant="outlined"
                size="small"
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button
                type="submit"
                variant="outlined"
                style={{ marginTop: "10px" }}
                fullWidth
            >
                UPLOAD
            </Button>
        </form>
    );
};

export default KpiUpload;
