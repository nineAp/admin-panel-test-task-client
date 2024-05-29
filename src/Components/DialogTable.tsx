import React, { useState, useEffect } from "react";
import { IDialog } from "../services/getDialogs";
import DialogModal from "./DialogModal";
import "./dialog-table.css";

interface DialogTableProps {
  dialogs: IDialog[];
}

const DialogTable: React.FC<DialogTableProps> = ({ dialogs }) => {
  const [filteredDialogs, setFilteredDialogs] = useState<IDialog[]>(dialogs);
  const [selectedDialog, setSelectedDialog] = useState<IDialog | null>(null);
  const [filter, setFilter] = useState({
    company: "",
    employee: "",
    startDate: "",
    endDate: "",
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof IDialog;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    let filtered = dialogs;

    if (filter.company) {
      filtered = filtered.filter((dialog) =>
        dialog.company.includes(filter.company)
      );
    }

    if (filter.employee) {
      filtered = filtered.filter((dialog) =>
        dialog.employee.includes(filter.employee)
      );
    }

    if (filter.startDate) {
      filtered = filtered.filter(
        (dialog) =>
          new Date(dialog.startTime).toLocaleDateString() ===
          new Date(filter.startDate).toLocaleDateString()
      );
    }

    if (filter.endDate) {
      filtered = filtered.filter(
        (dialog) =>
          new Date(dialog.startTime).toLocaleDateString() ===
          new Date(filter.endDate).toLocaleDateString()
      );
    }

    setFilteredDialogs(filtered);
  }, [filter, dialogs]);

  const handleSort = (key: keyof IDialog) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedDialogs = [...filteredDialogs].sort((a, b) => {
      if (key === "startTime" || key === "lastMessageTime") {
        return direction === "asc"
          ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
          : new Date(b[key]).getTime() - new Date(a[key]).getTime();
      }
      return direction === "asc"
        ? a[key] > b[key]
          ? 1
          : -1
        : a[key] < b[key]
        ? 1
        : -1;
    });
    setFilteredDialogs(sortedDialogs);
  };

  return (
    <div className="table-container">
      <div className="filters">
        <label>
          Компания:
          <select
            value={filter.company}
            onChange={(e) => setFilter({ ...filter, company: e.target.value })}
          >
            <option value="">Все компании</option>
            {Array.from(new Set(dialogs.map((dialog) => dialog.company))).map(
              (company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              )
            )}
          </select>
        </label>
        <label>
          Сотрудник:
          <select
            value={filter.employee}
            onChange={(e) => setFilter({ ...filter, employee: e.target.value })}
          >
            <option value="">Все сотрудники</option>
            {Array.from(new Set(dialogs.map((dialog) => dialog.employee))).map(
              (employee) => (
                <option key={employee} value={employee}>
                  {employee}
                </option>
              )
            )}
          </select>
        </label>
        <label>
          Дата начала:
          <input
            type="date"
            value={filter.startDate}
            onChange={(e) =>
              setFilter({ ...filter, startDate: e.target.value })
            }
          />
        </label>
        <label>
          Дата конца:
          <input
            type="date"
            value={filter.endDate}
            onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
          />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th
              onClick={() => handleSort("id")}
              className={sortConfig?.key === "id" ? sortConfig.direction : ""}
            >
              ID
            </th>
            <th
              onClick={() => handleSort("startTime")}
              className={
                sortConfig?.key === "startTime" ? sortConfig.direction : ""
              }
            >
              Начальное время
            </th>
            <th
              onClick={() => handleSort("lastMessageTime")}
              className={
                sortConfig?.key === "lastMessageTime"
                  ? sortConfig.direction
                  : ""
              }
            >
              Время последнего сообщения
            </th>
            <th
              onClick={() => handleSort("company")}
              className={
                sortConfig?.key === "company" ? sortConfig.direction : ""
              }
            >
              Компания
            </th>
            <th
              onClick={() => handleSort("employee")}
              className={
                sortConfig?.key === "employee" ? sortConfig.direction : ""
              }
            >
              Сотрудник
            </th>
            <th>Комментарии</th>
          </tr>
        </thead>
        <tbody>
          {filteredDialogs.map((dialog, index) => (
            <tr
              key={dialog.id}
              onClick={() => setSelectedDialog(dialog)}
              className={index % 2 === 0 ? "even" : "odd"}
            >
              <td>{dialog.id}</td>
              <td>{new Date(dialog.startTime).toLocaleString()}</td>
              <td>{new Date(dialog.lastMessageTime).toLocaleString()}</td>
              <td>{dialog.company}</td>
              <td>{dialog.employee}</td>
              <td>{dialog.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDialog && (
        <DialogModal
          dialog={selectedDialog}
          onClose={() => setSelectedDialog(null)}
        />
      )}
    </div>
  );
};

export default DialogTable;
