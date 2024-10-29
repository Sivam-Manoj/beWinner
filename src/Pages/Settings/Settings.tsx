import { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../Context/ThemeContext";
import { toast } from "react-toastify";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const [font, setFont] = useState<string>("sans-serif");
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    // Get stored font and apply it
    const storedFont = localStorage.getItem("font") || "sans-serif";
    setFont(storedFont);
    document.body.style.fontFamily = storedFont;

    // Get stored language and apply it
    const storedLanguage = localStorage.getItem("language") || "en";
    setLanguage(storedLanguage);
    i18n.changeLanguage(storedLanguage);
  }, [i18n]);

  const handleFontChange = (event: SelectChangeEvent<string>) => {
    const newFont = event.target.value;
    setFont(newFont);
    document.body.style.fontFamily = newFont;
    localStorage.setItem("font", newFont);
  };

  const handleLanguageChange = async (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage); // Store language in local storage
  };

  const handleRestoreDefaults = () => {
    setFont("sans-serif");
    setTheme("light");
    setLanguage("en");
    document.body.style.fontFamily = "sans-serif";
    localStorage.setItem("font", "sans-serif");
    localStorage.setItem("theme", "light");
    localStorage.setItem("language", "en"); // Restore default language
    i18n.changeLanguage("en");
    toast.success("Settings restored to defaults!");
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center p-6 rounded-lg shadow-lg ${
        theme === "dark" ? "bg-[#303030]" : "bg-gray-100"
      }`}
    >
      <Typography
        variant="h4"
        className={`mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}
      >
        {t("Settings")}
      </Typography>

      <Grid container spacing={2} className="w-full max-w-md">
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              id="theme-label"
              className={theme === "dark" ? "text-white" : "text-black"}
            >
              {t("Select Theme")}
            </InputLabel>
            <Select
              labelId="theme-label"
              value={theme}
              onChange={(e) => {
                const newTheme = e.target.value as "light" | "dark";
                setTheme(newTheme);
                localStorage.setItem("theme", newTheme); // Store theme in local storage
              }}
              label={t("Select Theme")}
              sx={{
                backgroundColor: theme === "dark" ? "#424242" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
            >
              <MenuItem value="light">{t("Light")}</MenuItem>
              <MenuItem value="dark">{t("Dark")}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              id="font-label"
              className={theme === "dark" ? "text-white" : "text-black"}
            >
              {t("Select Font")}
            </InputLabel>
            <Select
              labelId="font-label"
              value={font}
              onChange={handleFontChange}
              label={t("Select Font")}
              sx={{
                backgroundColor: theme === "dark" ? "#424242" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
            >
              <MenuItem value="sans-serif">{t("Sans Serif")}</MenuItem>
              <MenuItem value="serif">{t("Serif")}</MenuItem>
              <MenuItem value="monospace">{t("Monospace")}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              id="language-label"
              className={theme === "dark" ? "text-white" : "text-black"}
            >
              {t("Select Language")}
            </InputLabel>
            <Select
              labelId="language-label"
              value={language}
              onChange={handleLanguageChange}
              label={t("Select Language")}
              sx={{
                backgroundColor: theme === "dark" ? "#424242" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
            >
              <MenuItem value="en">{t("English")}</MenuItem>
              <MenuItem value="fr">{t("French")}</MenuItem>
              <MenuItem value="es">{t("Spanish")}</MenuItem>
              <MenuItem value="ro">{t("Romanian")}</MenuItem>
              <MenuItem value="hu">{t("Hungarian")}</MenuItem>{" "}
              {/* Added Hungarian */}
              <MenuItem value="bg">{t("Bulgarian")}</MenuItem>{" "}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => toast.success("Settings Saved")}
            className="mt-4 w-full"
          >
            {t("Save Settings")}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleRestoreDefaults}
            className="mt-2 w-full"
          >
            {t("Restore Default Settings")}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
