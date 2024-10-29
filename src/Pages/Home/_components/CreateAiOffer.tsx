import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Backdrop,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent, // Import SelectChangeEvent from MUI
} from "@mui/material";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { createPrompt } from "../prompt/prompt";


interface CreateAiOfferProps {
  open: boolean;
  onClose: () => void;
  data1: string[]; // Product Type Data
  data2: string; // Description Data
}

const CreateAiOffer: React.FC<CreateAiOfferProps> = ({
  open,
  onClose,
  data1,
  data2,
}) => {
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedLanguage, setSelectedLanguage] = useState("none"); // Default language
  const count = Number(sessionStorage.getItem("count"));

  const languages = [
    "none",
    "English",
    "Romanian",
    "French",
    "Spanish",
    "German",
    "Hungarian",
    "Bulgarian",
  ];

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const language = event.target.value as string;
    setSelectedLanguage(language);
    sessionStorage.setItem("InputLanguage", language); // Store directly from the selected value
  };

  const createOfferRequest = async () => {
    //const API_KEY = null;

    const inputText = createPrompt(data1, data2);

    try {
      const response = await axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are an expert data parser and JSON generator for automobile parts data. Your primary task is to generate a JSON array named 'automobile_parts' by matching product types with their respective HTML descriptions accurately. You strictly follow the formatting rules provided, without adding any extraneous explanations, characters, or formatting outside the specified JSON structure. Ensure that each JSON entry includes only 'productType' and 'description' fields, matching each description with the correct product type in sequence and avoiding duplicates(very very imporant).",
            },
            {
              role: "user",
              content: inputText,
            },
          ],
          temperature: 0.4,
          top_p: 0.95,
          max_tokens: 16000,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      return await response?.data;
    } catch (error) {
      toast.error('Please Check your Internet Connection.')
    }
  };

  const handleCreateOffer = async () => {
    setLoading(true);
    onClose();
    toast.success(`Create for ${count} Descriptions`);
    try {
      const response = await createOfferRequest();
      const outputJsonString = response?.choices?.[0]?.message?.content;
      if (!outputJsonString) {
        throw new Error(
          "Output JSON string is undefined. Check the API response structure."
        );
      }

      const cleanedJsonString = outputJsonString
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const jsonData = JSON.parse(cleanedJsonString);

      if (!Array.isArray(jsonData.automobile_parts)) {
        throw new Error(
          "Expected JSON data to have an 'automobile_parts' array."
        );
      }

      const worksheet = XLSX.utils.json_to_sheet(jsonData.automobile_parts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Offers");
      XLSX.writeFile(workbook, "Offers.xlsx");
      toast.success("Excel file created successfully!");
      sessionStorage.removeItem('InputLanguage')
    } catch (error: any) {
      toast.error("Error creating offer: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Create AI Offer</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography variant="h6" className="mb-4">
                Product Type Data:
              </Typography>
              <Grid container spacing={2}>
                {data1.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper className="p-4 shadow-md bg-gray-100 rounded-lg">
                      <Typography variant="body1">{item}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6" className="mb-4">
                Description Data:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper className="p-4 shadow-md bg-gray-100 rounded-lg">
                    <Typography variant="body1">{data2}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <FormControl
            variant="outlined"
            size="small"
            style={{ minWidth: 120 }}
          >
            <InputLabel>Language</InputLabel>
            <Select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              label="Language"
            >
              {languages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={onClose} color="error">
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateOffer}
            color="primary"
            disabled={loading}
          >
            Create Offer
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop open={loading} style={{ zIndex: 1300, color: "#fff" }}>
        <CircularProgress color="inherit" />
        <Typography variant="h6" style={{ marginLeft: "1rem" }}>
          Creating offers...
        </Typography>
      </Backdrop>
    </>
  );
};

export default CreateAiOffer;
