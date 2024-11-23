import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { useEffect, useState } from "react";
import AverageCropYield from "./pages/AverageCropYield";
import CropProductionYearly from "./pages/CropProductionYearly";
import { theme } from "./theme";
import { CropData } from "./types/types";

/**
 * The main application component that fetches crop data and renders
 * the CropProductionYearly and AverageCropYield components.
 *
 * @returns {JSX.Element} The rendered application component.
 */
export default function App() {
  const [cropData, setCropData] = useState<CropData[]>([]);

  // Function to fetch crop data from the server
  const fetchData = async () => {
    try {
      const response = await fetch("/data.json");
      const data: CropData[] = await response.json();
      setCropData(
        // Mapping through the data to ensure it fits the expected structure
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.map((item: any) => ({
          country: item.Country,
          year: item.Year.split(", ").pop(),
          cropName: item["Crop Name"],
          cropProduction: item["Crop Production (UOM:t(Tonnes))"] || 0,
          yieldOfCrops:
            item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0,
          areaUnderCultivation:
            item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MantineProvider theme={theme}>
      <h1
        style={{
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        Crop Data Analysis
      </h1>
      <CropProductionYearly cropData={cropData} />
      <br /> <br />
      <AverageCropYield cropData={cropData} />
    </MantineProvider>
  );
}
