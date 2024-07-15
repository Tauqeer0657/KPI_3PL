import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import dayjs from 'dayjs';

const DnUpload = ({ customerID, selectDate }) => {
    const [file, setFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setUploadMessage("Please select a file.");
            return;
        }


        if (!customerID || !selectDate) {
            setUploadMessage("Customer ID or date is missing.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        formData.append("customerID", customerID);
    
        const yearMonth = dayjs(selectDate).format('MM-YYYY');
        formData.append("yearMonth", yearMonth);

        formData.append("createdBy", "admin@admin");

        try {
            const response = await axios.post(
                "/api/dnSummary/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setUploadMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                setUploadMessage(error.response.data.error);
            } else {
                setUploadMessage("An unexpected error occurred.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
                type="file"
                label="DN Summary File"
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
            {uploadMessage && <p>{uploadMessage}</p>}
        </form>
    );
};

export default DnUpload;

