<script>
  import { onMount, afterUpdate } from "svelte";
  import { Chart as ChartJS } from "chart.js";
  import {
    Tooltip,
    Title,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController, // Import the BarController
  } from "chart.js";

// Register necessary chart.js components, including the BarController
ChartJS.register(Tooltip, Title, CategoryScale, LinearScale, BarElement, BarController);

export let expenses = [];
export let xLabel = "Date";
export let yLabel = "Amount";
export let title = "Chart Title";

let chart;

const updateChart = () => {
  if (!chart) return; // Avoid errors if chart is not initialized

  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB; // Sort by date in ascending order
  });

  // Map sorted data for chart
  const labels = sortedExpenses.map((data) => data.date);
  const data = sortedExpenses.map((data) => data.amount);
  const descriptions = sortedExpenses.map((data) => data.description);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: yLabel,
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            return `${descriptions[index]}: ${data[index]}`;
          },
        },
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: xLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
        },
      },
    },
  };

  // Update chart data and redraw the chart
  chart.data = chartData;
  chart.options = chartOptions;
  chart.update(); // Refresh the chart
};

onMount(() => {
  const ctx = document.getElementById("myChart");
  chart = new ChartJS(ctx, {
    type: "bar",
    data: {},
    options: {},
  });
});

afterUpdate(() => {
  updateChart(); // Update chart every time the component data changes
});
</script>

<canvas id="myChart" width="400" height="200"></canvas>
