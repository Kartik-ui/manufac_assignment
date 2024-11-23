import { TableData } from "@mantine/core";
import { useEffect, useState } from "react";
import Tables from "../components/Tables";
import { CropData } from "../types/types";

interface ModifiedCropsData {
  cropName: string;
  averageCropYield: number;
  averageCultivateArea: number;
}

const AverageCropYield = ({ cropData }: { cropData: CropData[] }) => {
  // State to hold the modified crop data with average yield and cultivation area
  const [modifiedCropsData, setModifiedCropsData] = useState<
    ModifiedCropsData[]
  >([]);

  useEffect(() => {
    const calculateAverage = () => {
      // Grouping crop data by crop name
      const groupByCrop = cropData.reduce((acc, crop) => {
        if (!acc[crop.cropName]) {
          acc[crop.cropName] = [];
        }
        acc[crop.cropName].push(crop);
        return acc;
      }, {} as Record<string, CropData[]>);

      // Calculating average yield and cultivation area for each crop
      const result = Object.entries(groupByCrop).map(([cropName, crop]) => {
        const totalYield = crop.reduce(
          (sum, { yieldOfCrops }) => sum + yieldOfCrops,
          0
        );
        const totalArea = crop.reduce(
          (sum, { areaUnderCultivation }) => sum + areaUnderCultivation,
          0
        );
        const count = crop.length;

        return {
          cropName,
          averageCropYield: parseFloat((totalYield / count).toFixed(3)),
          averageCultivateArea: parseFloat((totalArea / count).toFixed(3)),
        };
      });

      setModifiedCropsData(result);
    };

    if (cropData.length > 0) {
      calculateAverage();
    }
  }, [cropData]);

  const tableData: TableData = {
    caption: "Crop Yield and Cultivation Data",
    head: [
      "Crop",
      "Average Yield of the Crop between 1950-2020",
      "Average Cultivation Area of the Crop between 1950-2020",
    ],
    body: modifiedCropsData.map((row) => [
      row.cropName,
      row.averageCropYield,
      row.averageCultivateArea,
    ]),
  };

  return (
    <div>
      <Tables data={tableData} />
    </div>
  );
};

export default AverageCropYield;
