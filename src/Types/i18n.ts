import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Ai Excel Parser": "AI Excel Parser",
        "Excel Reader": "Excel Reader",
        Settings: "Settings",
        "Select Theme": "Select Theme",
        "Select Font": "Select Font",
        "Select Language": "Select Language",
        Light: "Light",
        Dark: "Dark",
        "Sans Serif": "Sans Serif",
        Serif: "Serif",
        Monospace: "Monospace",
        English: "English",
        French: "French",
        Spanish: "Spanish",
        Hungarian: "Hungarian", // Added Hungarian
        Bulgarian: "Bulgarian", // Added Bulgarian
        "Settings saved!": "Settings saved!",
        "Answers List": "Answers List",
        "Import File": "Import File",
        "Import Files": "Import Files",
        "Clear Data": "Clear Data",
        "Create Offer": "Create Offer",
        "Product Type": "Product Type",
        Description: "Description",
        "No data available. Please import a file.":
          "No data available. Please import a file.",
      },
    },
    fr: {
      translation: {
        "Ai Excel Parser": "Analyseur Excel IA",
        "Excel Reader": "Lecteur Excel",
        Settings: "Paramètres",
        "Select Theme": "Sélectionner le thème",
        "Select Font": "Sélectionner la police",
        "Select Language": "Sélectionner la langue",
        Light: "Lumière",
        Dark: "Sombre",
        "Sans Serif": "Sans Serif",
        Serif: "Serif",
        Monospace: "Monospace",
        English: "Anglais",
        French: "Français",
        Spanish: "Espagnol",
        Hungarian: "Hongrois", // Added Hungarian
        Bulgarian: "Български", // Added Bulgarian
        "Settings saved!": "Paramètres enregistrés!",
        "Answers List": "Liste des réponses",
        "Import File": "Importer un fichier",
        "Import Files": "Importer des fichiers",
        "Clear Data": "Effacer les données",
        "Create Offer": "Créer une offre",
        "Product Type": "Type de produit",
        Description: "Description",
        "No data available. Please import a file.":
          "Aucune donnée disponible. Veuillez importer un fichier.",
      },
    },
    es: {
      translation: {
        "Ai Excel Parser": "Parser de Excel IA",
        "Excel Reader": "Lector de Excel",
        Settings: "Configuraciones",
        "Select Theme": "Seleccionar tema",
        "Select Font": "Seleccionar fuente",
        "Select Language": "Seleccionar idioma",
        Light: "Claro",
        Dark: "Oscuro",
        "Sans Serif": "Sin Serif",
        Serif: "Serif",
        Monospace: "Monoespaciada",
        English: "Inglés",
        French: "Francés",
        Spanish: "Español",
        Hungarian: "Húngaro", // Added Hungarian
        Bulgarian: "Български", // Added Bulgarian
        "Settings saved!": "¡Configuraciones guardadas!",
        "Answers List": "Lista de respuestas",
        "Import File": "Importar archivo",
        "Import Files": "Importar archivos",
        "Clear Data": "Borrar datos",
        "Create Offer": "Crear oferta",
        "Product Type": "Tipo de producto",
        Description: "Descripción",
        "No data available. Please import a file.":
          "No hay datos disponibles. Por favor, importa un archivo.",
      },
    },
    ro: {
      translation: {
        "Ai Excel Parser": "Parser Excel IA",
        "Excel Reader": "Cititor Excel",
        Settings: "Setări",
        "Select Theme": "Selectați Tema",
        "Select Font": "Selectați Fontul",
        "Select Language": "Selectați Limba",
        Light: "Lumină",
        Dark: "Întuneric",
        "Sans Serif": "Fără Serif",
        Serif: "Serif",
        Monospace: "Monospațiu",
        English: "Engleză",
        French: "Franceză",
        Spanish: "Spanishă",
        Hungarian: "Maghiară", // Added Hungarian
        Bulgarian: "Български", // Added Bulgarian
        "Settings saved!": "Setările au fost salvate!",
        "Answers List": "Lista de răspunsuri",
        "Import File": "Importați fișier",
        "Import Files": "Importați fișiere",
        "Clear Data": "Ștergeți datele",
        "Create Offer": "Creează o ofertă",
        "Product Type": "Tip de produs",
        Description: "Descriere",
        "No data available. Please import a file.":
          "Nu sunt disponibile date. Vă rugăm să importați un fișier.",
      },
    },
    hu: {
      translation: {
        "Ai Excel Parser": "AI Excel Parser",
        "Excel Reader": "Excel Olvasó",
        Settings: "Beállítások",
        "Select Theme": "Téma kiválasztása",
        "Select Font": "Betűtípus kiválasztása",
        "Select Language": "Nyelv kiválasztása",
        Light: "Világos",
        Dark: "Sötét",
        "Sans Serif": "Sans Serif",
        Serif: "Serif",
        Monospace: "Monospace",
        English: "Angol",
        French: "Francia",
        Spanish: "Spanyol",
        Hungarian: "Magyar", // Added Hungarian
        Bulgarian: "Bolgár", // Added Bulgarian
        "Settings saved!": "Beállítások mentve!",
        "Answers List": "Válaszok listája",
        "Import File": "Fájl importálása",
        "Import Files": "Fájlok importálása",
        "Clear Data": "Adatok törlése",
        "Create Offer": "Ajánlat létrehozása",
        "Product Type": "Termék típusa",
        Description: "Leírás",
        "No data available. Please import a file.":
          "Nincs elérhető adat. Kérjük, importáljon egy fájlt.",
      },
    },
    bg: {
      translation: {
        "Ai Excel Parser": "AI Excel Парсер",
        "Excel Reader": "Excel Читател",
        Settings: "Настройки",
        "Select Theme": "Изберете Тема",
        "Select Font": "Изберете Шрифт",
        "Select Language": "Изберете Език",
        Light: "Светъл",
        Dark: "Тъмен",
        "Sans Serif": "Без Сериф",
        Serif: "Сериф",
        Monospace: "Моноширинен",
        English: "Английски",
        French: "Френски",
        Spanish: "Испански",
        Hungarian: "Унгарски", // Added Hungarian
        Bulgarian: "Български", // Added Bulgarian
        "Settings saved!": "Настройките са запазени!",
        "Answers List": "Списък с отговори",
        "Import File": "Импорт на файл",
        "Import Files": "Импорт на файлове",
        "Clear Data": "Изтриване на данни",
        "Create Offer": "Създаване на оферта",
        "Product Type": "Тип продукт",
        Description: "Описание",
        "No data available. Please import a file.":
          "Няма налични данни. Моля, импортируйте файл.",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
