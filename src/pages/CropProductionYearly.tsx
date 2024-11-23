import { TableData } from "@mantine/core";
import { useEffect, useState } from "react";
import Tables from "../components/Tables";
import { CropData } from "../types/types";

interface ModifiedCropsData {
  year: number;
  maxCropProduction: number;
  minCropProduction: number;
}

const CropProductionYearly = ({ cropData }: { cropData: CropData[] }) => {
  // State to hold the modified crop data with max and min production per year
  const [modifiedCropsData, setModifiedCropsData] = useState<
    ModifiedCropsData[]
  >([]);

  useEffect(() => {
    const calculateCropProduction = () => {
      // Grouping crop data by year
      const groupByYear = cropData.reduce((acc, crop) => {
        if (!acc[crop.year]) {
          acc[crop.year] = [];
        }
        acc[crop.year].push(crop);
        return acc;
      }, {} as Record<number, CropData[]>);

      // Calculating max and min crop production for each year
      const result = Object.entries(groupByYear).map(([year, crops]) => {
        let maxCropProduction = -Infinity;
        let minCropProduction = Infinity;

        // Iterating over crops to find max and min production
        crops.forEach(({ cropProduction }) => {
          if (cropProduction > maxCropProduction)
            maxCropProduction = cropProduction;
          if (cropProduction < minCropProduction)
            minCropProduction = cropProduction;
        });

        return {
          year: parseInt(year, 10),
          maxCropProduction,
          minCropProduction,
        };
      });

      setModifiedCropsData(result);
    };

    if (cropData.length > 0) {
      calculateCropProduction();
    }
  }, [cropData]);

  const tableData: TableData = {
    caption: "Crop Production Data",
    head: [
      "Year",
      "Crop with Maximum Production in that Year",
      "Crop with Minimum Production in that Year",
    ],
    body: modifiedCropsData.map((row) => [
      row.year,
      row.maxCropProduction,
      row.minCropProduction,
    ]),
  };

  return (
    <div>
      <Tables data={tableData} />
    </div>
  );
};

export default CropProductionYearly;
