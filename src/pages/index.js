import React from "react";

const sortOptions = ["sort by created at", "sort by a - z", "sort by z - a"];

const sortOperations = {
  "sort by created at": (arr) =>
    arr.sort((a, b) => (a.created_at > b.created_at ? 1 : -1)),
  "sort by a - z": (arr) =>
    arr.sort((a, b) =>
      a.filename.localeCompare(b.filename, "en", { numeric: true })
    ),
  "sort by z - a": (arr) =>
    arr.sort((a, b) =>
      b.filename.localeCompare(a.filename, "en", { numeric: true })
    ),
};

export default function Home() {
  const [sortSelected, setSortSelected] = React.useState("");
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/fetchData");
      const data = await response.json();
      setData(data);
    };

    fetchUsers();
  }, []);

  const sorted = sortOperations[sortSelected]
    ? sortOperations[sortSelected](data)
    : data;

  return (
    <div>
      <div className="flex my-4 justify-center">
        Sort options:
        <select
          className="ml-2 text-black"
          value={sortSelected}
          onChange={(e) => setSortSelected(e.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 flex justify-center">
        {sorted.map((item, i) => (
          <div key={i} className="text-white p-5 border-2 border-white">
            <p>{item.created_at}</p>
            <p>{item.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Output: ["file1.txt", "file2.txt", "file10.txt", "filea.txt", "fileb.txt", "filez.txt"]
