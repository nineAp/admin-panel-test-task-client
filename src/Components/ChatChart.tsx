import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { IDialog } from "../services/getDialogs";
import "./chat-chart.css"; // Импортируем CSS

interface ChatChartProps {
  dialogs: IDialog[];
}

const ChatChart: React.FC<ChatChartProps> = ({ dialogs }) => {
  const [chartData, setChartData] = useState<{ date: string; count: number }[]>(
    []
  );
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [uniqueCompanies, setUniqueCompanies] = useState<string[]>([]);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const countByDate: { [date: string]: number } = {};
    dialogs.forEach((dialog) => {
      if (!selectedCompany || dialog.company === selectedCompany) {
        const date = new Date(dialog.startTime).toLocaleDateString();
        countByDate[date] = (countByDate[date] || 0) + 1;
      }
    });
    const data = Object.entries(countByDate).map(([date, count]) => ({
      date,
      count,
    }));
    setChartData(data);
  }, [dialogs, selectedCompany]);

  useEffect(() => {
    // Extract unique company names
    const uniqueCompaniesSet = new Set<string>(
      dialogs.map((dialog) => dialog.company)
    );
    const uniqueCompaniesArray = Array.from(uniqueCompaniesSet);
    setUniqueCompanies(uniqueCompaniesArray);
  }, [dialogs]);

  useEffect(() => {
    if (chartData.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = chartData.map((data) => data.date);
    const counts = chartData.map((data) => data.count);

    const ctx = document.getElementById("chatChart") as HTMLCanvasElement;
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Количество чатов",
            data: counts,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(event.target.value);
  };

  return (
    <div className="chart-container">
      <h2>График количества чатов по дням</h2>
      <div>
        <label>
          Фильтр по компаниям:
          <select value={selectedCompany} onChange={handleCompanyChange}>
            <option value="">Все компании</option>
            {uniqueCompanies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </label>
      </div>
      <canvas id="chatChart"></canvas>
    </div>
  );
};

export default ChatChart;
