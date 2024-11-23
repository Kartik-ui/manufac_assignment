import { Table, TableData } from "@mantine/core";

const Tables = ({ data }: { data: TableData }) => {
  return (
    <Table
      striped
      highlightOnHover
      withColumnBorders
      withTableBorder
      data={data}
      captionSide="top"
      layout="fixed"
      style={{
        width: "80%",
        margin: "0 auto",
        overflowY: "auto",
      }}
      styles={{
        th: { textAlign: "center" },
        td: { textAlign: "center" },
      }}
    />
  );
};

export default Tables;
